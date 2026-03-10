import type { Request, Response } from 'express';
import db from '../db/knex';
import { signAuthToken, type Role } from '../auth/tokenService';

interface UserRow {
  id: number;
  sasi_id: string;
  first_name: string;
  last_name: string;
  role: Role;
}

function devAuthEnabled(): boolean {
  const env = (process.env.ENABLE_DEV_AUTH ?? ((process.env.NODE_ENV ?? 'development') === 'production' ? 'false' : 'true'))
    .trim()
    .toLowerCase();
  return env === 'true';
}

export async function postDevLogin(req: Request, res: Response): Promise<void> {
  if (!devAuthEnabled()) {
    res.status(403).json({ message: 'Dev auth is disabled.' });
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
      res.status(404).json({ message: 'User not found for supplied sasiId.' });
      return;
    }
    const token = signAuthToken({
      id: user.id,
      sasiId: user.sasi_id,
      role: user.role,
      firstName: user.first_name,
      lastName: user.last_name,
    });
    res.status(200).json({
      token,
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

export async function getMe(req: Request, res: Response): Promise<void> {
  if (!req.authUser) {
    res.status(401).json({ message: 'Authentication required.' });
    return;
  }
  res.status(200).json({ user: req.authUser });
}

