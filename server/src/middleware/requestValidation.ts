import type { RequestHandler } from 'express';
import type { ZodType } from 'zod';

type UnknownSchema = ZodType<unknown>;

function issuesFromError(error: { issues?: Array<{ path?: Array<PropertyKey>; message?: string }> }): Array<{ path: string; message: string }> {
  return (error.issues ?? []).map((issue) => ({
    path: Array.isArray(issue.path) ? issue.path.map((part) => String(part)).join('.') : '',
    message: issue.message ?? 'Invalid value.',
  }));
}

export function validateBody(schema: UnknownSchema): RequestHandler {
  return (req, res, next) => {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({
        message: 'Invalid request body.',
        issues: issuesFromError(parsed.error),
      });
      return;
    }
    req.body = parsed.data;
    next();
  };
}

export function validateParams(schema: UnknownSchema): RequestHandler {
  return (req, res, next) => {
    const parsed = schema.safeParse(req.params);
    if (!parsed.success) {
      res.status(400).json({
        message: 'Invalid route parameters.',
        issues: issuesFromError(parsed.error),
      });
      return;
    }
    req.params = parsed.data as unknown as typeof req.params;
    next();
  };
}
