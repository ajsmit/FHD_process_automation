import { NextFunction, Request, Response } from 'express';
import { searchStudents } from '../services/sasiService';
import { toAppError, ValidationError } from '../errors/httpErrors';

function handleFallbackError(
  res: Response,
  error: unknown,
  fallback: { statusCode: number; code: string; message: string },
): void {
  const appError = toAppError(error, fallback);
  const message = appError.exposeMessage ? appError.message : fallback.message;
  res.status(appError.statusCode).json({ message, code: appError.code, details: appError.details });
}

export async function searchSasiStudents(req: Request, res: Response, next?: NextFunction): Promise<void> {
  try {
    const studentNumber = typeof req.query.studentNumber === 'string' ? req.query.studentNumber : undefined;
    const firstName = typeof req.query.firstName === 'string' ? req.query.firstName : undefined;
    const lastName = typeof req.query.lastName === 'string' ? req.query.lastName : undefined;

    if (!studentNumber && !firstName && !lastName) {
      throw new ValidationError('Provide studentNumber or firstName/lastName query parameters.');
    }

    const students = await searchStudents({ studentNumber, firstName, lastName });
    res.status(200).json({ data: students });
  } catch (error) {
    if (next) {
      next(toAppError(error, { statusCode: 500, code: 'sasi_search_failed', message: 'Failed to search SASI students.' }));
      return;
    }
    handleFallbackError(res, error, { statusCode: 500, code: 'sasi_search_failed', message: 'Failed to search SASI students.' });
  }
}
