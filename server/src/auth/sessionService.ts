import crypto from 'crypto';
import db from '../db/knex';
import { signAuthToken, type TokenUser } from './tokenService';

interface AuthUserRow {
  id: number;
  sasi_id: string;
  first_name: string;
  last_name: string;
  role: TokenUser['role'];
  active?: number | boolean | null;
}

interface RefreshTokenRow {
  id: number;
  user_id: number;
  token_hash: string;
  expires_at: string | Date;
  revoked_at: string | Date | null;
}

interface SessionMeta {
  ipAddress?: string | null;
  userAgent?: string | null;
}

export interface SessionTokens {
  accessToken: string;
  refreshToken: string;
  refreshTokenExpiresAt: string;
}

function refreshTokenTtlDays(): number {
  const parsed = Number.parseInt(process.env.REFRESH_TOKEN_TTL_DAYS ?? '14', 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 14;
}

function refreshTokenExpiresAt(now: Date): Date {
  const expiry = new Date(now);
  expiry.setDate(expiry.getDate() + refreshTokenTtlDays());
  return expiry;
}

function generateRefreshToken(): string {
  return crypto.randomBytes(48).toString('base64url');
}

function hashRefreshToken(value: string): string {
  return crypto.createHash('sha256').update(value).digest('hex');
}

function isActiveUser(value: AuthUserRow['active']): boolean {
  if (value === null || value === undefined) {
    return true;
  }
  if (typeof value === 'boolean') {
    return value;
  }
  return Number(value) === 1;
}

export function toTokenUser(row: AuthUserRow): TokenUser {
  return {
    id: row.id,
    sasiId: row.sasi_id,
    role: row.role,
    firstName: row.first_name,
    lastName: row.last_name,
  };
}

async function persistRefreshToken(userId: number, refreshToken: string, meta: SessionMeta, now: Date): Promise<{ id: number; expiresAt: Date }> {
  const expiresAt = refreshTokenExpiresAt(now);
  const tokenHash = hashRefreshToken(refreshToken);

  const inserted = await db('auth_refresh_tokens')
    .insert({
      user_id: userId,
      token_hash: tokenHash,
      created_at: now.toISOString(),
      expires_at: expiresAt.toISOString(),
      revoked_at: null,
      replaced_by_token_id: null,
      last_used_at: null,
      created_by_ip: meta.ipAddress ?? '',
      created_by_user_agent: meta.userAgent ?? '',
      revoked_reason: '',
    })
    .returning('id');

  const insertedId = Array.isArray(inserted) && inserted.length > 0
    ? (typeof inserted[0] === 'number' ? inserted[0] : Number((inserted[0] as { id: number }).id))
    : NaN;
  if (!Number.isFinite(insertedId) || insertedId < 1) {
    throw new Error('Failed to persist refresh token.');
  }
  return { id: insertedId, expiresAt };
}

export async function issueSessionTokens(user: TokenUser, meta: SessionMeta = {}): Promise<SessionTokens> {
  const now = new Date();
  const accessToken = signAuthToken(user);
  const refreshToken = generateRefreshToken();
  const { expiresAt } = await persistRefreshToken(user.id, refreshToken, meta, now);
  return {
    accessToken,
    refreshToken,
    refreshTokenExpiresAt: expiresAt.toISOString(),
  };
}

export async function rotateRefreshToken(
  rawRefreshToken: string,
  meta: SessionMeta = {},
): Promise<{ user: TokenUser; tokens: SessionTokens }> {
  const tokenHash = hashRefreshToken(rawRefreshToken.trim());
  const now = new Date();
  const existing = await db<RefreshTokenRow>('auth_refresh_tokens')
    .where({ token_hash: tokenHash })
    .first();

  if (!existing) {
    throw new Error('Invalid refresh token.');
  }
  if (existing.revoked_at) {
    throw new Error('Refresh token has been revoked.');
  }
  const expiresAt = new Date(existing.expires_at);
  if (Number.isNaN(expiresAt.getTime()) || expiresAt.getTime() <= now.getTime()) {
    throw new Error('Refresh token has expired.');
  }

  const userRow = await db<AuthUserRow>('users')
    .where({ id: existing.user_id })
    .first('id', 'sasi_id', 'first_name', 'last_name', 'role', 'active');
  if (!userRow || !isActiveUser(userRow.active)) {
    throw new Error('User is not available for refresh.');
  }

  const user = toTokenUser(userRow);
  const accessToken = signAuthToken(user);
  const nextRefreshToken = generateRefreshToken();

  await db.transaction(async (trx) => {
    const inserted = await trx('auth_refresh_tokens')
      .insert({
        user_id: user.id,
        token_hash: hashRefreshToken(nextRefreshToken),
        created_at: now.toISOString(),
        expires_at: refreshTokenExpiresAt(now).toISOString(),
        revoked_at: null,
        replaced_by_token_id: null,
        last_used_at: null,
        created_by_ip: meta.ipAddress ?? '',
        created_by_user_agent: meta.userAgent ?? '',
        revoked_reason: '',
      })
      .returning('id');

    const newId = Array.isArray(inserted) && inserted.length > 0
      ? (typeof inserted[0] === 'number' ? inserted[0] : Number((inserted[0] as { id: number }).id))
      : NaN;
    if (!Number.isFinite(newId) || newId < 1) {
      throw new Error('Failed to rotate refresh token.');
    }

    await trx('auth_refresh_tokens')
      .where({ id: existing.id, revoked_at: null })
      .update({
        revoked_at: now.toISOString(),
        revoked_reason: 'rotated',
        replaced_by_token_id: newId,
        last_used_at: now.toISOString(),
      });
  });

  const nextExpiry = refreshTokenExpiresAt(now);
  return {
    user,
    tokens: {
      accessToken,
      refreshToken: nextRefreshToken,
      refreshTokenExpiresAt: nextExpiry.toISOString(),
    },
  };
}

export async function revokeRefreshToken(rawRefreshToken: string, reason: string): Promise<void> {
  const tokenHash = hashRefreshToken(rawRefreshToken.trim());
  const now = new Date().toISOString();
  await db('auth_refresh_tokens')
    .where({ token_hash: tokenHash, revoked_at: null })
    .update({
      revoked_at: now,
      revoked_reason: reason,
      last_used_at: now,
    });
}

export async function revokeAllUserRefreshTokens(userId: number, reason: string): Promise<void> {
  const now = new Date().toISOString();
  await db('auth_refresh_tokens')
    .where({ user_id: userId, revoked_at: null })
    .update({
      revoked_at: now,
      revoked_reason: reason,
      last_used_at: now,
    });
}
