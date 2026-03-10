import type { Request, Response } from 'express';
import db from '../db/knex';
import { logAuthAuditEvent } from '../auth/auditLogService';
import { hashPassword, verifyPassword } from '../auth/passwordService';
import {
  parseTrustedHeaderIdentity,
  resolveAuthProvider,
  verifyProviderSourceIp,
  verifyProviderSharedSecret,
} from '../auth/providerAuthService';
import {
  issueSessionTokens,
  revokeAllUserRefreshTokens,
  revokeRefreshTokenForUser,
  rotateRefreshToken,
  toTokenUser,
} from '../auth/sessionService';
import type { Role } from '../auth/tokenService';

interface UserRow {
  id: number;
  sasi_id: string;
  staff_number?: string | null;
  first_name: string;
  last_name: string;
  email: string;
  role: Role;
  password_hash?: string | null;
  active?: number | boolean | null;
}

function isActiveUser(value: UserRow['active']): boolean {
  return value === undefined || value === null || value === true || Number(value) === 1;
}

function normalizeIdentifier(value: string): string {
  return value.trim().toLowerCase();
}

async function resolveLoginUser(identifier: string): Promise<{ user: UserRow | null; reason: 'not_found' | 'ambiguous' | null }> {
  const normalized = normalizeIdentifier(identifier);
  const users = await db<UserRow>('users')
    .where({ sasi_id: identifier })
    .orWhere({ staff_number: identifier })
    .orWhereRaw('LOWER(email) = ?', [normalized])
    .select('id', 'sasi_id', 'first_name', 'last_name', 'email', 'role', 'password_hash', 'active');
  if (users.length === 0) {
    return { user: null, reason: 'not_found' };
  }
  const uniqueIds = new Set(users.map((entry) => entry.id));
  if (uniqueIds.size > 1) {
    return { user: null, reason: 'ambiguous' };
  }
  return { user: users[0], reason: null };
}

async function resolveProviderUser(identity: { email: string; sasiId: string; staffNumber: string }): Promise<{ user: UserRow | null; reason: 'not_found' | 'ambiguous' | 'conflict' | null }> {
  const candidates: UserRow[] = [];

  if (identity.email) {
    const rows = await db<UserRow>('users')
      .whereRaw('LOWER(email) = ?', [identity.email])
      .select('id', 'sasi_id', 'first_name', 'last_name', 'email', 'role', 'active');
    if (rows.length > 1) {
      return { user: null, reason: 'ambiguous' };
    }
    if (rows.length === 1) candidates.push(rows[0]);
  }

  if (identity.sasiId) {
    const rows = await db<UserRow>('users')
      .where({ sasi_id: identity.sasiId })
      .select('id', 'sasi_id', 'first_name', 'last_name', 'email', 'role', 'active');
    if (rows.length > 1) {
      return { user: null, reason: 'ambiguous' };
    }
    if (rows.length === 1) candidates.push(rows[0]);
  }

  if (identity.staffNumber) {
    const rows = await db<UserRow>('users')
      .where({ staff_number: identity.staffNumber })
      .select('id', 'sasi_id', 'first_name', 'last_name', 'email', 'role', 'active');
    if (rows.length > 1) {
      return { user: null, reason: 'ambiguous' };
    }
    if (rows.length === 1) candidates.push(rows[0]);
  }

  if (candidates.length === 0) {
    return { user: null, reason: 'not_found' };
  }

  const uniqueIds = new Set(candidates.map((entry) => entry.id));
  if (uniqueIds.size > 1) {
    return { user: null, reason: 'conflict' };
  }
  return { user: candidates[0], reason: null };
}

function devAuthEnabled(): boolean {
  if (resolveAuthProvider() !== 'local_password') {
    return false;
  }
  const env = (process.env.ENABLE_DEV_AUTH ?? ((process.env.NODE_ENV ?? 'development') === 'production' ? 'false' : 'true'))
    .trim()
    .toLowerCase();
  return env === 'true';
}

export async function postDevLogin(req: Request, res: Response): Promise<void> {
  if (!devAuthEnabled()) {
    await logAuthAuditEvent({
      eventType: 'dev_login_disabled_attempt',
      route: req.originalUrl,
      method: req.method,
      ipAddress: req.ip,
      userAgent: req.get('user-agent') ?? '',
    });
    res.status(404).json({ message: 'Not found.' });
    return;
  }

  try {
    const sasiId = typeof req.body?.sasiId === 'string' ? req.body.sasiId.trim() : '';
    if (!sasiId) {
      res.status(400).json({ message: 'sasiId is required.' });
      return;
    }
    const user = await db<UserRow>('users')
      .where({ sasi_id: sasiId })
      .select('id', 'sasi_id', 'first_name', 'last_name', 'role')
      .first();
    if (!user) {
      await logAuthAuditEvent({
        eventType: 'dev_login_user_not_found',
        actorSasiId: sasiId,
        route: req.originalUrl,
        method: req.method,
        ipAddress: req.ip,
        userAgent: req.get('user-agent') ?? '',
      });
      res.status(404).json({ message: 'User not found for supplied sasiId.' });
      return;
    }
    const tokens = await issueSessionTokens(toTokenUser(user), {
      ipAddress: req.ip,
      userAgent: req.get('user-agent') ?? '',
    });
    res.status(200).json({
      token: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      refreshTokenExpiresAt: tokens.refreshTokenExpiresAt,
      user: {
        id: user.id,
        sasiId: user.sasi_id,
        role: user.role,
        firstName: user.first_name,
        lastName: user.last_name,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error instanceof Error ? error.message : 'Dev login failed' });
  }
}

export async function postLogin(req: Request, res: Response): Promise<void> {
  if (resolveAuthProvider() !== 'local_password') {
    res.status(404).json({ message: 'Not found.' });
    return;
  }
  try {
    const identifier = typeof req.body?.identifier === 'string' ? req.body.identifier.trim() : '';
    const password = typeof req.body?.password === 'string' ? req.body.password : '';
    if (!identifier || !password) {
      res.status(400).json({ message: 'identifier and password are required.' });
      return;
    }

    const resolved = await resolveLoginUser(identifier);
    const user = resolved.user;

    if (!user || !user.password_hash) {
      const eventType = resolved.reason === 'ambiguous'
        ? 'login_failed_identifier_conflict'
        : 'login_failed_user_not_found';
      await logAuthAuditEvent({
        eventType,
        actorSasiId: identifier,
        route: req.originalUrl,
        method: req.method,
        ipAddress: req.ip,
        userAgent: req.get('user-agent') ?? '',
      });
      res.status(401).json({ message: 'Invalid credentials.' });
      return;
    }

    const active = isActiveUser(user.active);
    if (!active) {
      await logAuthAuditEvent({
        eventType: 'login_failed_inactive_user',
        userId: user.id,
        actorSasiId: user.sasi_id,
        route: req.originalUrl,
        method: req.method,
        ipAddress: req.ip,
        userAgent: req.get('user-agent') ?? '',
      });
      res.status(401).json({ message: 'Invalid credentials.' });
      return;
    }

    const validPassword = await verifyPassword(password, user.password_hash);
    if (!validPassword) {
      await logAuthAuditEvent({
        eventType: 'login_failed_bad_password',
        userId: user.id,
        actorSasiId: user.sasi_id,
        route: req.originalUrl,
        method: req.method,
        ipAddress: req.ip,
        userAgent: req.get('user-agent') ?? '',
      });
      res.status(401).json({ message: 'Invalid credentials.' });
      return;
    }

    // Backfill missing password hash format if legacy plain value sneaks in.
    if (!user.password_hash.startsWith('scrypt$')) {
      const upgraded = await hashPassword(password);
      await db('users').where({ id: user.id }).update({ password_hash: upgraded, updated_at: db.fn.now() });
      user.password_hash = upgraded;
    }

    const tokens = await issueSessionTokens(toTokenUser(user), {
      ipAddress: req.ip,
      userAgent: req.get('user-agent') ?? '',
    });

    await logAuthAuditEvent({
      eventType: 'login_success',
      userId: user.id,
      actorSasiId: user.sasi_id,
      route: req.originalUrl,
      method: req.method,
      ipAddress: req.ip,
      userAgent: req.get('user-agent') ?? '',
    });

    res.status(200).json({
      token: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      refreshTokenExpiresAt: tokens.refreshTokenExpiresAt,
      user: {
        id: user.id,
        sasiId: user.sasi_id,
        role: user.role,
        firstName: user.first_name,
        lastName: user.last_name,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error instanceof Error ? error.message : 'Login failed' });
  }
}

export async function postProviderLogin(req: Request, res: Response): Promise<void> {
  if (resolveAuthProvider() !== 'trusted_header') {
    res.status(404).json({ message: 'Not found.' });
    return;
  }

  const sourceCheck = verifyProviderSourceIp(req);
  if (!sourceCheck.allowed) {
    await logAuthAuditEvent({
      eventType: 'provider_login_failed_untrusted_source',
      route: req.originalUrl,
      method: req.method,
      ipAddress: req.ip,
      userAgent: req.get('user-agent') ?? '',
      details: { reason: sourceCheck.reason },
    });
    res.status(401).json({ message: 'Provider authentication failed.' });
    return;
  }

  if (!verifyProviderSharedSecret(req)) {
    await logAuthAuditEvent({
      eventType: 'provider_login_failed_bad_secret',
      route: req.originalUrl,
      method: req.method,
      ipAddress: req.ip,
      userAgent: req.get('user-agent') ?? '',
    });
    res.status(401).json({ message: 'Provider authentication failed.' });
    return;
  }

  try {
    const identity = parseTrustedHeaderIdentity(req);
    if (!identity.email && !identity.sasiId && !identity.staffNumber) {
      res.status(400).json({ message: 'Trusted identity headers are required.' });
      return;
    }

    const resolved = await resolveProviderUser(identity);
    const user = resolved.user;

    if (!user) {
      const eventType = resolved.reason === 'not_found'
        ? 'provider_login_failed_user_not_found'
        : 'provider_login_failed_identity_conflict';
      await logAuthAuditEvent({
        eventType,
        actorSasiId: identity.sasiId || identity.staffNumber || identity.email,
        route: req.originalUrl,
        method: req.method,
        ipAddress: req.ip,
        userAgent: req.get('user-agent') ?? '',
        details: resolved.reason && resolved.reason !== 'not_found' ? { reason: resolved.reason } : {},
      });
      res.status(401).json({ message: 'Provider identity does not map to an active user.' });
      return;
    }

    const active = isActiveUser(user.active);
    if (!active) {
      await logAuthAuditEvent({
        eventType: 'provider_login_failed_inactive_user',
        userId: user.id,
        actorSasiId: user.sasi_id,
        route: req.originalUrl,
        method: req.method,
        ipAddress: req.ip,
        userAgent: req.get('user-agent') ?? '',
      });
      res.status(401).json({ message: 'Provider identity does not map to an active user.' });
      return;
    }

    const tokens = await issueSessionTokens(toTokenUser(user), {
      ipAddress: req.ip,
      userAgent: req.get('user-agent') ?? '',
    });

    await logAuthAuditEvent({
      eventType: 'provider_login_success',
      userId: user.id,
      actorSasiId: user.sasi_id,
      route: req.originalUrl,
      method: req.method,
      ipAddress: req.ip,
      userAgent: req.get('user-agent') ?? '',
    });

    res.status(200).json({
      token: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      refreshTokenExpiresAt: tokens.refreshTokenExpiresAt,
      user: {
        id: user.id,
        sasiId: user.sasi_id,
        role: user.role,
        firstName: user.first_name,
        lastName: user.last_name,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error instanceof Error ? error.message : 'Provider login failed' });
  }
}

export async function postRefresh(req: Request, res: Response): Promise<void> {
  try {
    const refreshToken = typeof req.body?.refreshToken === 'string' ? req.body.refreshToken.trim() : '';
    if (!refreshToken) {
      res.status(400).json({ message: 'refreshToken is required.' });
      return;
    }
    const rotated = await rotateRefreshToken(refreshToken, {
      ipAddress: req.ip,
      userAgent: req.get('user-agent') ?? '',
    });
    await logAuthAuditEvent({
      eventType: 'refresh_success',
      userId: rotated.user.id,
      actorSasiId: rotated.user.sasiId,
      route: req.originalUrl,
      method: req.method,
      ipAddress: req.ip,
      userAgent: req.get('user-agent') ?? '',
    });
    res.status(200).json({
      token: rotated.tokens.accessToken,
      refreshToken: rotated.tokens.refreshToken,
      refreshTokenExpiresAt: rotated.tokens.refreshTokenExpiresAt,
      user: rotated.user,
    });
  } catch (error) {
    await logAuthAuditEvent({
      eventType: 'refresh_failed',
      route: req.originalUrl,
      method: req.method,
      ipAddress: req.ip,
      userAgent: req.get('user-agent') ?? '',
      details: { reason: error instanceof Error ? error.message : 'unknown' },
    });
    res.status(401).json({ message: 'Invalid or expired refresh token.' });
  }
}

export async function postLogout(req: Request, res: Response): Promise<void> {
  if (!req.authUser) {
    res.status(401).json({ message: 'Authentication required.' });
    return;
  }
  try {
    const refreshToken = typeof req.body?.refreshToken === 'string' ? req.body.refreshToken.trim() : '';
    if (!refreshToken) {
      res.status(400).json({ message: 'refreshToken is required.' });
      return;
    }
    const revoked = await revokeRefreshTokenForUser(refreshToken, req.authUser.id, 'logout');
    if (!revoked) {
      await logAuthAuditEvent({
        eventType: 'logout_failed_token_not_owned_or_invalid',
        userId: req.authUser.id,
        actorSasiId: req.authUser.sasiId,
        route: req.originalUrl,
        method: req.method,
        ipAddress: req.ip,
        userAgent: req.get('user-agent') ?? '',
      });
      res.status(401).json({ message: 'Invalid refresh token.' });
      return;
    }
    await logAuthAuditEvent({
      eventType: 'logout_success',
      userId: req.authUser.id,
      actorSasiId: req.authUser.sasiId,
      route: req.originalUrl,
      method: req.method,
      ipAddress: req.ip,
      userAgent: req.get('user-agent') ?? '',
    });
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ message: error instanceof Error ? error.message : 'Logout failed' });
  }
}

export async function postLogoutAll(req: Request, res: Response): Promise<void> {
  if (!req.authUser) {
    res.status(401).json({ message: 'Authentication required.' });
    return;
  }
  try {
    await revokeAllUserRefreshTokens(req.authUser.id, 'logout_all');
    await logAuthAuditEvent({
      eventType: 'logout_all_success',
      userId: req.authUser.id,
      actorSasiId: req.authUser.sasiId,
      route: req.originalUrl,
      method: req.method,
      ipAddress: req.ip,
      userAgent: req.get('user-agent') ?? '',
    });
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ message: error instanceof Error ? error.message : 'Logout all failed' });
  }
}

export async function getMe(req: Request, res: Response): Promise<void> {
  if (!req.authUser) {
    res.status(401).json({ message: 'Authentication required.' });
    return;
  }
  res.status(200).json({ user: req.authUser });
}
