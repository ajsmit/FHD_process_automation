import type { NextFunction, Request, RequestHandler, Response } from 'express';
import { logAuthAuditEvent } from '../auth/auditLogService';
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
    void logAuthAuditEvent({
      eventType: 'auth_missing_bearer_token',
      route: req.originalUrl,
      method: req.method,
      ipAddress: req.ip,
      userAgent: req.get('user-agent') ?? '',
    });
    res.status(401).json({ message: 'Authentication required. Provide Bearer token.' });
    return;
  }
  try {
    req.authUser = verifyAuthToken(token);
    next();
  } catch (error) {
    void logAuthAuditEvent({
      eventType: 'auth_invalid_token',
      route: req.originalUrl,
      method: req.method,
      ipAddress: req.ip,
      userAgent: req.get('user-agent') ?? '',
      details: { reason: error instanceof Error ? error.message : 'invalid token' },
    });
    res.status(401).json({ message: error instanceof Error ? error.message : 'Invalid token' });
  }
};
