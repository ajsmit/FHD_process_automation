import type { NextFunction, Request, RequestHandler, Response } from 'express';
import { verifyAuthToken } from '../auth/tokenService';

function extractBearerToken(req: Request): string | null {
  const authHeader = req.header('authorization');
  if (!authHeader) return null;
  const [scheme, token] = authHeader.split(/\s+/, 2);
  if (!scheme || !token || scheme.toLowerCase() !== 'bearer') return null;
  return token.trim();
}

export const requireAuth: RequestHandler = (req: Request, res: Response, next: NextFunction): void => {
  const token = extractBearerToken(req);
  if (!token) {
    res.status(401).json({ message: 'Authentication required. Provide Bearer token.' });
    return;
  }
  try {
    req.authUser = verifyAuthToken(token);
    next();
  } catch (error) {
    res.status(401).json({ message: error instanceof Error ? error.message : 'Invalid token' });
  }
};

