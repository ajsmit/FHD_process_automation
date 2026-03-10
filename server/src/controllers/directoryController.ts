import { NextFunction, Request, Response } from 'express';
import { listDepartments, listExternalAcademics, listStaff } from '../services/directoryService';
import {
  completeExternalAcademicInvite,
  createExternalAcademicInvite,
  getExternalAcademicInvite,
} from '../services/externalAcademicOnboardingService';
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

export async function getDepartments(req: Request, res: Response, next?: NextFunction): Promise<void> {
  try {
    const faculty = typeof req.query.faculty === 'string' ? req.query.faculty : undefined;
    const data = await listDepartments(faculty);
    res.status(200).json({ data });
  } catch (error) {
    if (next) {
      next(toAppError(error, { statusCode: 500, code: 'directory_departments_failed', message: 'Failed to load departments.' }));
      return;
    }
    handleFallbackError(res, error, { statusCode: 500, code: 'directory_departments_failed', message: 'Failed to load departments.' });
  }
}

export async function getStaff(req: Request, res: Response, next?: NextFunction): Promise<void> {
  try {
    const department = typeof req.query.department === 'string' ? req.query.department : undefined;
    const q = typeof req.query.q === 'string' ? req.query.q : undefined;
    const internalOnly = req.query.internalOnly === 'true';
    const data = await listStaff({ department, q, internalOnly });
    res.status(200).json({ data });
  } catch (error) {
    if (next) {
      next(toAppError(error, { statusCode: 500, code: 'directory_staff_failed', message: 'Failed to load staff directory.' }));
      return;
    }
    handleFallbackError(res, error, { statusCode: 500, code: 'directory_staff_failed', message: 'Failed to load staff directory.' });
  }
}

export async function getExternalAcademics(req: Request, res: Response, next?: NextFunction): Promise<void> {
  try {
    const q = typeof req.query.q === 'string' ? req.query.q : undefined;
    const data = await listExternalAcademics(q);
    res.status(200).json({ data });
  } catch (error) {
    if (next) {
      next(toAppError(error, { statusCode: 500, code: 'directory_external_failed', message: 'Failed to load external academics registry.' }));
      return;
    }
    handleFallbackError(res, error, { statusCode: 500, code: 'directory_external_failed', message: 'Failed to load external academics registry.' });
  }
}

export async function postExternalAcademicInvite(req: Request, res: Response, next?: NextFunction): Promise<void> {
  try {
    const caseId = Number.parseInt(String(req.body?.caseId ?? ''), 10);
    const role = typeof req.body?.role === 'string' ? req.body.role : '';
    const email = typeof req.body?.email === 'string' ? req.body.email : '';
    if (!Number.isFinite(caseId) || caseId < 1) {
      throw new ValidationError('Valid caseId is required.');
    }
    const result = await createExternalAcademicInvite(caseId, role, email);
    res.status(200).json(result);
  } catch (error) {
    if (next) {
      next(toAppError(error, { statusCode: 400, code: 'external_invite_create_failed', message: 'Failed to create external academic invite.' }));
      return;
    }
    handleFallbackError(res, error, { statusCode: 400, code: 'external_invite_create_failed', message: 'Failed to create external academic invite.' });
  }
}

export async function getExternalAcademicInviteByToken(req: Request, res: Response, next?: NextFunction): Promise<void> {
  try {
    const token = typeof req.params.token === 'string' ? req.params.token : '';
    const result = await getExternalAcademicInvite(token);
    res.status(200).json(result);
  } catch (error) {
    if (next) {
      next(toAppError(error, { statusCode: 400, code: 'external_invite_fetch_failed', message: 'Failed to load invite.' }));
      return;
    }
    handleFallbackError(res, error, { statusCode: 400, code: 'external_invite_fetch_failed', message: 'Failed to load invite.' });
  }
}

export async function postCompleteExternalAcademicInvite(req: Request, res: Response, next?: NextFunction): Promise<void> {
  try {
    const token = typeof req.params.token === 'string' ? req.params.token : '';
    const result = await completeExternalAcademicInvite(token, req.body ?? {});
    res.status(200).json(result);
  } catch (error) {
    if (next) {
      next(toAppError(error, { statusCode: 400, code: 'external_invite_complete_failed', message: 'Failed to complete external academic profile.' }));
      return;
    }
    handleFallbackError(res, error, { statusCode: 400, code: 'external_invite_complete_failed', message: 'Failed to complete external academic profile.' });
  }
}
