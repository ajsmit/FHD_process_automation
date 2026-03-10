export interface AppErrorOptions {
  details?: Record<string, unknown>;
  cause?: unknown;
  exposeMessage?: boolean;
}

export class AppError extends Error {
  readonly statusCode: number;
  readonly code: string;
  readonly details: Record<string, unknown>;
  readonly exposeMessage: boolean;
  readonly cause: unknown;

  constructor(statusCode: number, code: string, message: string, options: AppErrorOptions = {}) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.code = code;
    this.details = options.details ?? {};
    this.exposeMessage = options.exposeMessage ?? statusCode < 500;
    this.cause = options.cause;
  }
}

export class ValidationError extends AppError {
  constructor(message: string, options: AppErrorOptions = {}) {
    super(400, 'validation_error', message, options);
  }
}

export class AuthenticationError extends AppError {
  constructor(message = 'Authentication required.', options: AppErrorOptions = {}) {
    super(401, 'authentication_error', message, options);
  }
}

export class AuthorizationError extends AppError {
  constructor(message = 'Forbidden.', options: AppErrorOptions = {}) {
    super(403, 'authorization_error', message, options);
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Not found.', options: AppErrorOptions = {}) {
    super(404, 'not_found', message, options);
  }
}

export class ConflictError extends AppError {
  constructor(message: string, options: AppErrorOptions = {}) {
    super(409, 'conflict', message, options);
  }
}

export class InternalServerError extends AppError {
  constructor(message = 'Internal server error.', options: AppErrorOptions = {}) {
    super(500, 'internal_error', message, { ...options, exposeMessage: false });
  }
}

export function toAppError(
  error: unknown,
  fallback: { statusCode: number; code: string; message: string },
): AppError {
  if (error instanceof AppError) {
    return error;
  }
  const message = error instanceof Error && error.message ? error.message : fallback.message;
  return new AppError(fallback.statusCode, fallback.code, message, {
    cause: error,
    exposeMessage: fallback.statusCode < 500,
  });
}
