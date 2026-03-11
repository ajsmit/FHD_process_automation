import type { NextFunction, Request, RequestHandler, Response } from 'express';
import type { Role } from '../auth/tokenService';
import { logAuthAuditEvent } from '../auth/auditLogService';

interface RequireRoleOptions {
  denyEventType?: string;
}

export function requireRoles(allowedRoles: readonly Role[], options?: RequireRoleOptions): RequestHandler {
  const allowSet = new Set<Role>(allowedRoles);
  const denyEventType = options?.denyEventType ?? 'authorization_role_denied';

  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const authUser = req.authUser;
    if (!authUser) {
      await logAuthAuditEvent({
        eventType: 'authorization_role_denied_unauthenticated',
        route: req.originalUrl,
        method: req.method,
        ipAddress: req.ip,
        userAgent: req.get('user-agent') ?? '',
      });
      res.status(401).json({ message: 'Authentication required.' });
      return;
    }

    if (!allowSet.has(authUser.role)) {
      await logAuthAuditEvent({
        eventType: denyEventType,
        userId: authUser.id,
        actorSasiId: authUser.sasiId,
        route: req.originalUrl,
        method: req.method,
        ipAddress: req.ip,
        userAgent: req.get('user-agent') ?? '',
        details: {
          role: authUser.role,
          allowedRoles: [...allowSet],
        },
      });
      res.status(403).json({ message: 'Authenticated actor is not authorized for this route.' });
      return;
    }

    next();
  };
}
