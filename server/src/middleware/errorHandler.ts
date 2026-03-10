import type { NextFunction, Request, Response } from 'express';
import { AppError, toAppError } from '../errors/httpErrors';
import { logger } from '../logging/logger';

export function notFoundHandler(req: Request, _res: Response, next: NextFunction): void {
  next(new AppError(404, 'route_not_found', `Route not found: ${req.method} ${req.originalUrl}`));
}

export function errorHandler(error: unknown, req: Request, res: Response, _next: NextFunction): void {
  const appError = toAppError(error, {
    statusCode: 500,
    code: 'internal_error',
    message: 'Internal server error.',
  });

  logger.error('request_failed', {
    route: req.originalUrl,
    method: req.method,
    statusCode: appError.statusCode,
    code: appError.code,
    error: appError,
    details: appError.details,
  });

  const message = appError.exposeMessage ? appError.message : 'Internal server error.';
  res.status(appError.statusCode).json({
    message,
    code: appError.code,
    details: appError.details,
  });
}

