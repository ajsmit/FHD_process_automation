import type { Request, Response } from 'express';
import db from '../db/knex';
import { logAuthAuditEvent } from '../auth/auditLogService';
import { hashPassword, verifyPassword } from '../auth/passwordService';
import {
  issueSessionTokens,
  revokeAllUserRefreshTokens,
  revokeRefreshToken,
  rotateRefreshToken,
  toTokenUser,
} from '../auth/sessionService';
import type { Role } from '../auth/tokenService';

interface UserRow {
  id: number;
  sasi_id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: Role;
  password_hash?: string | null;
  active?: number | boolean | null;
}

function devAuthEnabled(): boolean {
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
  try {
    const identifier = typeof req.body?.identifier === 'string' ? req.body.identifier.trim() : '';
    const password = typeof req.body?.password === 'string' ? req.body.password : '';
    if (!identifier || !password) {
      res.status(400).json({ message: 'identifier and password are required.' });
      return;
    }

    const user = await db<UserRow>('users')
      .where({ sasi_id: identifier })
      .orWhere({ email: identifier })
      .first('id', 'sasi_id', 'first_name', 'last_name', 'email', 'role', 'password_hash', 'active');

    if (!user || !user.password_hash) {
      await logAuthAuditEvent({
        eventType: 'login_failed_user_not_found',
        actorSasiId: identifier,
        route: req.originalUrl,
        method: req.method,
        ipAddress: req.ip,
        userAgent: req.get('user-agent') ?? '',
      });
      res.status(401).json({ message: 'Invalid credentials.' });
      return;
    }

    const active = user.active === undefined || user.active === null || user.active === true || Number(user.active) === 1;
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
  try {
    const refreshToken = typeof req.body?.refreshToken === 'string' ? req.body.refreshToken.trim() : '';
    if (!refreshToken) {
      res.status(400).json({ message: 'refreshToken is required.' });
      return;
    }
    await revokeRefreshToken(refreshToken, 'logout');
    await logAuthAuditEvent({
      eventType: 'logout_success',
      userId: req.authUser?.id,
      actorSasiId: req.authUser?.sasiId,
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
