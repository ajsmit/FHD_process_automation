import jwt from 'jsonwebtoken';
import config from '../config';

export type Role = 'student' | 'supervisor' | 'admin';

export interface TokenUser {
  id: number;
  sasiId: string;
  role: Role;
  firstName: string;
  lastName: string;
}

interface TokenPayload {
  sub: string;
  sasi_id: string;
  role: Role;
  first_name: string;
  last_name: string;
}

function jwtSecret(): string {
  const configured = config.jwt.secret?.trim();
  if (configured) {
    return configured;
  }
  if ((process.env.NODE_ENV ?? 'development') !== 'production') {
    return 'dev-insecure-jwt-secret-change-me';
  }
  throw new Error('JWT_SECRET must be configured in production.');
}

function jwtExpiresIn(): jwt.SignOptions['expiresIn'] {
  const value = config.jwt.expiresIn?.trim() || '8h';
  return value as jwt.SignOptions['expiresIn'];
}

export function signAuthToken(user: TokenUser): string {
  const payload: TokenPayload = {
    sub: String(user.id),
    sasi_id: user.sasiId,
    role: user.role,
    first_name: user.firstName,
    last_name: user.lastName,
  };
  return jwt.sign(payload, jwtSecret() as jwt.Secret, { expiresIn: jwtExpiresIn() });
}

export function verifyAuthToken(token: string): TokenUser {
  const decoded = jwt.verify(token, jwtSecret()) as TokenPayload;
  const id = Number.parseInt(decoded.sub, 10);
  if (!Number.isFinite(id) || id < 1) {
    throw new Error('Invalid token subject');
  }
  if (decoded.role !== 'student' && decoded.role !== 'supervisor' && decoded.role !== 'admin') {
    throw new Error('Invalid token role');
  }
  return {
    id,
    sasiId: decoded.sasi_id,
    role: decoded.role,
    firstName: decoded.first_name,
    lastName: decoded.last_name,
  };
}
