import type { NextFunction, Request, RequestHandler, Response } from 'express';
import db from '../db/knex';
import type { FormData } from '../services/contracts/titleRegistration';

type TransitionAction =
  | 'student_vet'
  | 'supervisor_review'
  | 'dept_review'
  | 'chairperson_sign'
  | 'dept_send_faculty'
  | 'faculty_review'
  | 'reminder';

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

async function loadCaseContext(caseId: number): Promise<{
  formData: FormData;
  studentNumber: string;
  studentDepartment: string;
}> {
  const row = await db('title_registration_cases')
    .join('sasi_students', 'sasi_students.id', 'title_registration_cases.sasi_student_id')
    .where('title_registration_cases.id', caseId)
    .select(
      'title_registration_cases.form_data_json',
      'sasi_students.student_number',
      'sasi_students.department',
    )
    .first();
  if (!row) {
    throw new Error('Case not found');
  }
  const formData = JSON.parse(String(row.form_data_json)) as FormData;
  return {
    formData,
    studentNumber: String(row.student_number),
    studentDepartment: String(row.department ?? ''),
  };
}

async function hasSasiStaffRole(sasiId: string, role: string, department?: string): Promise<boolean> {
  let query = db('sasi_staff').where({
    staff_number: sasiId,
    role,
  });
  if (department) {
    query = query.andWhere('department', department);
  }
  const row = await query.first();
  return Boolean(row);
}

function isAssignedSupervisor(userFirst: string, userLast: string, formData: FormData): boolean {
  const actor = normalizeName(`${userFirst} ${userLast}`);
  const candidates = [
    formData.Supervisor,
    formData['Administrative Supervisor (Nominal Role)'],
    formData['Co-supervisor'],
    formData['Second Co-supervisor'],
  ]
    .map((v) => normalizeName(String(v ?? '')))
    .filter((v) => v && v !== 'na');
  return candidates.includes(actor);
}

async function isAuthorizedForAction(req: Request, action: TransitionAction): Promise<boolean> {
  const user = req.authUser;
  if (!user) return false;
  const caseId = parseCaseId(req);
  const { formData, studentNumber, studentDepartment } = await loadCaseContext(caseId);

  if (action === 'student_vet') {
    return user.role === 'student' && user.sasiId === studentNumber;
  }

  if (action === 'supervisor_review') {
    if (user.role !== 'supervisor') return false;
    return isAssignedSupervisor(user.firstName, user.lastName, formData);
  }

  if (user.role !== 'admin') {
    return false;
  }

  if (action === 'dept_review' || action === 'dept_send_faculty') {
    return hasSasiStaffRole(user.sasiId, 'dept_fhd_rep', studentDepartment);
  }
  if (action === 'chairperson_sign') {
    return hasSasiStaffRole(user.sasiId, 'hod', studentDepartment);
  }
  if (action === 'faculty_review') {
    return hasSasiStaffRole(user.sasiId, 'faculty_fhd_rep');
  }
  if (action === 'reminder') {
    const dept = await hasSasiStaffRole(user.sasiId, 'dept_fhd_rep', studentDepartment);
    if (dept) return true;
    return hasSasiStaffRole(user.sasiId, 'faculty_fhd_rep');
  }
  return false;
}

export function requireTransitionAuthorization(action: TransitionAction): RequestHandler {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const authorized = await isAuthorizedForAction(req, action);
      if (!authorized) {
        res.status(403).json({ message: 'Authenticated actor is not authorized for this case transition.' });
        return;
      }
      next();
    } catch (error) {
      res.status(400).json({ message: error instanceof Error ? error.message : 'Authorization check failed' });
    }
  };
}
