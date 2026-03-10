import { Request, Response } from 'express';
import { listDepartments, listExternalAcademics, listStaff } from '../services/directoryService';
import {
  completeExternalAcademicInvite,
  createExternalAcademicInvite,
  getExternalAcademicInvite,
} from '../services/externalAcademicOnboardingService';

export async function getDepartments(req: Request, res: Response): Promise<void> {
  try {
    const faculty = typeof req.query.faculty === 'string' ? req.query.faculty : undefined;
    const data = await listDepartments(faculty);
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ message: 'Failed to load departments', error: error instanceof Error ? error.message : error });
  }
}

export async function getStaff(req: Request, res: Response): Promise<void> {
  try {
    const department = typeof req.query.department === 'string' ? req.query.department : undefined;
    const q = typeof req.query.q === 'string' ? req.query.q : undefined;
    const internalOnly = req.query.internalOnly === 'true';
    const data = await listStaff({ department, q, internalOnly });
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ message: 'Failed to load staff directory', error: error instanceof Error ? error.message : error });
  }
}

export async function getExternalAcademics(req: Request, res: Response): Promise<void> {
  try {
    const q = typeof req.query.q === 'string' ? req.query.q : undefined;
    const data = await listExternalAcademics(q);
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ message: 'Failed to load external academics registry', error: error instanceof Error ? error.message : error });
  }
}

export async function postExternalAcademicInvite(req: Request, res: Response): Promise<void> {
  try {
    const caseId = Number.parseInt(String(req.body?.caseId ?? ''), 10);
    const role = typeof req.body?.role === 'string' ? req.body.role : '';
    const email = typeof req.body?.email === 'string' ? req.body.email : '';
    if (!Number.isFinite(caseId) || caseId < 1) {
      throw new Error('Valid caseId is required.');
    }
    const result = await createExternalAcademicInvite(caseId, role, email);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : 'Failed to create external academic invite' });
  }
}

export async function getExternalAcademicInviteByToken(req: Request, res: Response): Promise<void> {
  try {
    const token = typeof req.params.token === 'string' ? req.params.token : '';
    const result = await getExternalAcademicInvite(token);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : 'Failed to load invite' });
  }
}

export async function postCompleteExternalAcademicInvite(req: Request, res: Response): Promise<void> {
  try {
    const token = typeof req.params.token === 'string' ? req.params.token : '';
    const result = await completeExternalAcademicInvite(token, req.body ?? {});
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : 'Failed to complete external academic profile' });
  }
}
