import type { NextFunction, Request, RequestHandler, Response } from 'express';
import { logAuthAuditEvent } from '../auth/auditLogService';
import {
  isAdministrativeRole,
  isDeptChairpersonRole,
  isDeptHdRepRole,
  isFacultyHdRepRole,
  isLegacyAdminRole,
  isSystemAdminRole,
} from '../auth/roleService';
import db from '../db/knex';
import { logger } from '../logging/logger';
import type { FormData } from '../services/contracts/titleRegistration';
import { isTransientDatabaseError, retryWithBackoff, settleAll } from '../utils/resilience';

type CaseOperationAction =
  | 'case_read'
  | 'form_edit'
  | 'print'
  | 'module_student_edit_submit'
  | 'module_supervisor_edit_submit'
  | 'module_review_supervisor'
  | 'module_review_dept'
  | 'module_review_chairperson'
  | 'module_review_faculty'
  | 'module_print'
  | 'external_invites_read'
  | 'supervisor_profiles_read'
  | 'supervisor_profiles_request'
  | 'supervisor_profiles_reminder'
  | 'mou_read'
  | 'mou_edit'
  | 'mou_complete'
  | 'mou_print';

type ProfileOperationAction =
  | 'profile_edit'
  | 'profile_submit'
  | 'profile_upload_cv';

interface CaseContext {
  caseId: number;
  formData: FormData;
  studentNumber: string;
  studentDepartment: string;
}

function normalizeName(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, ' ');
}

function parseCaseId(req: Request): number {
  const raw = req.params.caseId;
  const id = Number.parseInt(raw, 10);
  if (!Number.isFinite(id) || id < 1) {
    throw new Error('Invalid case id');
  }
  return id;
}

function parseProfileId(req: Request): number {
  const raw = req.params.profileId;
  const id = Number.parseInt(raw, 10);
  if (!Number.isFinite(id) || id < 1) {
    throw new Error('Invalid profile id');
  }
  return id;
}

async function hasSasiStaffRole(sasiId: string, role: string, department?: string): Promise<boolean> {
  return retryWithBackoff(async () => {
    let query = db('sasi_staff').where({
      staff_number: sasiId,
      role,
    });
    if (department) {
      query = query.andWhere('department', department);
    }
    const row = await query.first();
    return Boolean(row);
  }, {
    shouldRetry: isTransientDatabaseError,
    onRetry: (error, attempt, delayMs) => {
      logger.warn('Retrying sasi_staff role lookup after transient database failure.', {
        scope: 'workflow_authorization',
        sasiId,
        role,
        department,
        attempt,
        delayMs,
        error: error instanceof Error ? error.message : String(error),
      });
    },
  });
}

function isAssignedSupervisor(userFirst: string, userLast: string, formData: FormData): boolean {
  const actor = normalizeName(`${userFirst} ${userLast}`);
  const candidates = [
    formData.Supervisor,
    formData['Administrative Supervisor (Nominal Role)'],
    formData['Co-supervisor'],
    formData['Second Co-supervisor'],
  ]
    .map((value) => normalizeName(String(value ?? '')))
    .filter((value) => value && value !== 'na');
  return candidates.includes(actor);
}

async function loadCaseContext(caseId: number): Promise<CaseContext> {
  const row = await db('title_registration_cases')
    .join('sasi_students', 'sasi_students.id', 'title_registration_cases.sasi_student_id')
    .where('title_registration_cases.id', caseId)
    .select('title_registration_cases.id', 'title_registration_cases.form_data_json', 'sasi_students.student_number', 'sasi_students.department')
    .first();

  if (!row) {
    throw new Error('Case not found');
  }

  return {
    caseId: Number(row.id),
    formData: JSON.parse(String(row.form_data_json)) as FormData,
    studentNumber: String(row.student_number),
    studentDepartment: String(row.department ?? ''),
  };
}

async function adminScopeFlags(sasiId: string, department: string): Promise<{ dept: boolean; chair: boolean; faculty: boolean }> {
  const results = await settleAll([
    hasSasiStaffRole(sasiId, 'dept_fhd_rep', department),
    hasSasiStaffRole(sasiId, 'hod', department),
    hasSasiStaffRole(sasiId, 'faculty_fhd_rep'),
  ]);
  const [deptResult, chairResult, facultyResult] = results;

  if (!deptResult.ok || !chairResult.ok || !facultyResult.ok) {
    logger.warn('Partial failure while resolving legacy admin scope flags; applying degraded authorization fallback.', {
      scope: 'workflow_authorization',
      sasiId,
      department,
      deptError: deptResult.ok ? null : String(deptResult.reason),
      chairError: chairResult.ok ? null : String(chairResult.reason),
      facultyError: facultyResult.ok ? null : String(facultyResult.reason),
    });
  }

  return {
    dept: deptResult.ok ? deptResult.value : false,
    chair: chairResult.ok ? chairResult.value : false,
    faculty: facultyResult.ok ? facultyResult.value : false,
  };
}

async function authorizeCaseOperation(req: Request, action: CaseOperationAction): Promise<boolean> {
  const user = req.authUser;
  if (!user) {
    return false;
  }
  const context = await loadCaseContext(parseCaseId(req));

  if (user.role === 'student') {
    if (user.sasiId !== context.studentNumber) return false;
    return action !== 'supervisor_profiles_reminder'
      && action !== 'module_supervisor_edit_submit'
      && action !== 'module_review_supervisor'
      && action !== 'module_review_dept'
      && action !== 'module_review_chairperson'
      && action !== 'module_review_faculty';
  }

  if (user.role === 'supervisor') {
    const assigned = isAssignedSupervisor(user.firstName, user.lastName, context.formData);
    if (!assigned) return false;
    if (
      action === 'form_edit'
      || action === 'mou_complete'
      || action === 'supervisor_profiles_request'
      || action === 'supervisor_profiles_reminder'
      || action === 'module_student_edit_submit'
      || action === 'module_review_dept'
      || action === 'module_review_chairperson'
      || action === 'module_review_faculty'
    ) {
      return false;
    }
    return true;
  }

  if (!isAdministrativeRole(user.role)) {
    return false;
  }

  let legacyFlags = { dept: false, chair: false, faculty: false };
  if (isLegacyAdminRole(user.role)) {
    legacyFlags = await adminScopeFlags(user.sasiId, context.studentDepartment);
  }
  const flags = {
    dept: isSystemAdminRole(user.role) || isDeptHdRepRole(user.role) || legacyFlags.dept,
    chair: isSystemAdminRole(user.role) || isDeptChairpersonRole(user.role) || legacyFlags.chair,
    faculty: isSystemAdminRole(user.role) || isFacultyHdRepRole(user.role) || legacyFlags.faculty,
  };
  switch (action) {
    case 'case_read':
    case 'print':
    case 'module_print':
    case 'external_invites_read':
    case 'supervisor_profiles_read':
    case 'mou_read':
    case 'mou_print':
      return flags.dept || flags.chair || flags.faculty;
    case 'form_edit':
    case 'module_student_edit_submit':
    case 'module_supervisor_edit_submit':
    case 'module_review_supervisor':
      return false;
    case 'module_review_dept':
      return flags.dept;
    case 'module_review_chairperson':
      return flags.chair;
    case 'module_review_faculty':
      return flags.faculty;
    case 'supervisor_profiles_request':
      return flags.dept;
    case 'supervisor_profiles_reminder':
      return flags.dept || flags.faculty;
    case 'mou_edit':
      return flags.dept || flags.chair;
    case 'mou_complete':
      return false;
    default:
      return false;
  }
}

async function authorizeProfileOperation(req: Request, action: ProfileOperationAction): Promise<boolean> {
  const user = req.authUser;
  if (!user || user.role !== 'supervisor') {
    return false;
  }

  const profileId = parseProfileId(req);
  const profile = await db('supervisor_profile_forms').where({ id: profileId }).first('case_id', 'person_name', 'status');
  if (!profile || String(profile.status ?? '') === 'inactive') {
    return false;
  }

  const context = await loadCaseContext(Number(profile.case_id));
  const assigned = isAssignedSupervisor(user.firstName, user.lastName, context.formData);
  if (!assigned) {
    return false;
  }

  const profileOwner = normalizeName(String(profile.person_name ?? ''));
  const actor = normalizeName(`${user.firstName} ${user.lastName}`);
  if (!profileOwner || profileOwner !== actor) {
    return false;
  }

  if (action === 'profile_edit' || action === 'profile_submit' || action === 'profile_upload_cv') {
    return true;
  }

  return false;
}

export function requireCaseOperationAuthorization(action: CaseOperationAction): RequestHandler {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const authorized = await authorizeCaseOperation(req, action);
      if (!authorized) {
        await logAuthAuditEvent({
          eventType: 'authorization_case_operation_denied',
          userId: req.authUser?.id,
          actorSasiId: req.authUser?.sasiId,
          route: req.originalUrl,
          method: req.method,
          ipAddress: req.ip,
          userAgent: req.get('user-agent') ?? '',
          details: {
            action,
            caseId: req.params.caseId ?? '',
          },
        });
        res.status(403).json({ message: 'Authenticated actor is not authorized for this case operation.' });
        return;
      }
      next();
    } catch (error) {
      await logAuthAuditEvent({
        eventType: 'authorization_case_operation_check_failed',
        userId: req.authUser?.id,
        actorSasiId: req.authUser?.sasiId,
        route: req.originalUrl,
        method: req.method,
        ipAddress: req.ip,
        userAgent: req.get('user-agent') ?? '',
        details: {
          action,
          reason: error instanceof Error ? error.message : 'unknown',
        },
      });
      res.status(400).json({ message: error instanceof Error ? error.message : 'Authorization check failed' });
    }
  };
}

export function requireProfileOperationAuthorization(action: ProfileOperationAction): RequestHandler {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const authorized = await authorizeProfileOperation(req, action);
      if (!authorized) {
        await logAuthAuditEvent({
          eventType: 'authorization_profile_operation_denied',
          userId: req.authUser?.id,
          actorSasiId: req.authUser?.sasiId,
          route: req.originalUrl,
          method: req.method,
          ipAddress: req.ip,
          userAgent: req.get('user-agent') ?? '',
          details: {
            action,
            profileId: req.params.profileId ?? '',
          },
        });
        res.status(403).json({ message: 'Authenticated actor is not authorized for this profile operation.' });
        return;
      }
      next();
    } catch (error) {
      await logAuthAuditEvent({
        eventType: 'authorization_profile_operation_check_failed',
        userId: req.authUser?.id,
        actorSasiId: req.authUser?.sasiId,
        route: req.originalUrl,
        method: req.method,
        ipAddress: req.ip,
        userAgent: req.get('user-agent') ?? '',
        details: {
          action,
          reason: error instanceof Error ? error.message : 'unknown',
        },
      });
      res.status(400).json({ message: error instanceof Error ? error.message : 'Authorization check failed' });
    }
  };
}

export function requireCollectionOperationAuthorization(): RequestHandler {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (!req.authUser) {
      await logAuthAuditEvent({
        eventType: 'authorization_collection_denied_unauthenticated',
        route: req.originalUrl,
        method: req.method,
        ipAddress: req.ip,
        userAgent: req.get('user-agent') ?? '',
      });
      res.status(401).json({ message: 'Authentication required.' });
      return;
    }
    next();
  };
}
