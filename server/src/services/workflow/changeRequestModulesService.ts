import db from '../../db/knex';
import {
  isAdministrativeRole,
  isDeptChairpersonRole,
  isDeptHdRepRole,
  isFacultyHdRepRole,
  isLegacyAdminRole,
  isSystemAdminRole,
} from '../../auth/roleService';
import type { Role } from '../../auth/tokenService';
import { getCaseById, updateForm } from '../titleRegistrationWorkflowService';
import type {
  AddCoSupervisorFormData,
  ChangeSupervisorFormData,
  ChangeTitleFormData,
  FormData,
  ModuleFormRecord,
} from '../contracts/titleRegistration';
import { isTransientDatabaseError, retryWithBackoff, settleAll } from '../../utils/resilience';
import {
  getOrCreateModuleRecord,
  printModulePdf,
  reviewModuleRecord,
  submitModuleRecord,
  updateModuleRecord,
} from './moduleLifecycleEngine';
import type {
  ModuleLifecycleConfig,
  ModuleReviewDecision,
  ReviewTransition,
} from './moduleLifecycleEngine';

interface AuthUserLike {
  id: number;
  role: Role;
  sasiId: string;
  firstName: string;
  lastName: string;
}

type ChangeModuleTable = 'change_title_forms' | 'change_supervisor_forms' | 'add_co_supervisor_forms';
type ChangeModuleName = 'change_title' | 'change_supervisor' | 'add_co_supervisor';
type RoleAction = 'read' | 'edit' | 'submit' | 'review_supervisor' | 'review_dept' | 'review_chairperson' | 'review_faculty' | 'print';
type ReviewRoleAction = Exclude<RoleAction, 'read' | 'edit' | 'submit' | 'print'>;

interface ChangeRequestModuleDataMap {
  change_title: ChangeTitleFormData;
  change_supervisor: ChangeSupervisorFormData;
  add_co_supervisor: AddCoSupervisorFormData;
}

interface ChangeRequestModuleConfig<TData extends object> extends ModuleLifecycleConfig<TData, ChangeModuleTable, ChangeModuleName> {
  buildPrefill: (formData: FormData) => TData;
  validateBeforeSubmit: (formData: TData) => void;
}

function sanitiseText(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

function normalizeName(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, ' ');
}

function trimText(value: string): string {
  return value.trim().replace(/\s+/g, ' ');
}

function stripTrailingStops(value: string): string {
  return value.trim().replace(/\.+$/, '');
}

function normalizeSupervisorRoleChange(value: string): 'primary' | 'admin' | 'co1' | 'co2' | '' {
  const normalized = value.trim().toLowerCase();
  if (normalized === 'primary supervisor' || normalized === 'primary supervisor') return 'primary';
  if (normalized === 'administrative supervisor') return 'admin';
  if (normalized === 'co-supervisor 1') return 'co1';
  if (normalized === 'co-supervisor 2') return 'co2';
  return '';
}

function requiredCompletionPercent<T extends object>(formData: T, requiredKeys: Array<keyof T>): number {
  let completed = 0;
  for (const key of requiredKeys) {
    const value = formData[key];
    if (typeof value === 'string' && value.trim()) {
      completed += 1;
    }
  }
  return Math.round((completed / requiredKeys.length) * 100);
}

function parsePersonName(fullName: string): { firstName: string; surname: string } {
  const cleaned = trimText(fullName);
  if (!cleaned) {
    return { firstName: '', surname: '' };
  }
  const parts = cleaned.split(' ');
  if (parts.length === 1) {
    return { firstName: parts[0], surname: '' };
  }
  return {
    firstName: parts.slice(0, -1).join(' '),
    surname: parts[parts.length - 1],
  };
}

function isAssignedSupervisor(actor: AuthUserLike, formData: FormData): boolean {
  const actorName = normalizeName(`${actor.firstName} ${actor.lastName}`);
  const candidates = [
    formData.Supervisor,
    formData['Administrative Supervisor (Nominal Role)'],
    formData['Co-supervisor'],
    formData['Second Co-supervisor'],
  ]
    .map((value) => normalizeName(value))
    .filter((value) => value && value !== 'na');
  return candidates.includes(actorName);
}

async function hasSasiStaffRole(sasiId: string, role: string, department?: string): Promise<boolean> {
  return retryWithBackoff(async () => {
    let query = db('sasi_staff').where({ staff_number: sasiId, role });
    if (department) {
      query = query.andWhere('department', department);
    }
    const row = await query.first();
    return Boolean(row);
  }, {
    shouldRetry: isTransientDatabaseError,
  });
}

async function assertAuthorization(actor: AuthUserLike, caseId: number, action: RoleAction): Promise<FormData> {
  const { formData, student } = await getCaseById(caseId);
  const studentNumber = sanitiseText(formData['Student Number']);
  const department = sanitiseText(student.department);

  if (action === 'read' || action === 'print') {
    if (actor.role === 'student' && actor.sasiId === studentNumber) return formData;
    if (actor.role === 'supervisor' && isAssignedSupervisor(actor, formData)) return formData;
    if (isAdministrativeRole(actor.role)) {
      if (isSystemAdminRole(actor.role)) return formData;
      if (isDeptHdRepRole(actor.role) || isDeptChairpersonRole(actor.role) || isFacultyHdRepRole(actor.role)) {
        return formData;
      }
      if (!isLegacyAdminRole(actor.role)) {
        throw new Error('Actor is not authorised for this module operation.');
      }
      const [deptResult, chairResult, facultyResult] = await settleAll([
        hasSasiStaffRole(actor.sasiId, 'dept_fhd_rep', department),
        hasSasiStaffRole(actor.sasiId, 'hod', department),
        hasSasiStaffRole(actor.sasiId, 'faculty_fhd_rep'),
      ]);
      const dept = deptResult.ok ? deptResult.value : false;
      const chair = chairResult.ok ? chairResult.value : false;
      const faculty = facultyResult.ok ? facultyResult.value : false;
      if (dept || chair || faculty) return formData;
    }
    throw new Error('Actor is not authorised for this module operation.');
  }

  if (action === 'edit' || action === 'submit') {
    if (actor.role === 'student' && actor.sasiId === studentNumber) return formData;
    throw new Error('Only the student may edit or submit this change-request module.');
  }

  if (action === 'review_supervisor' && actor.role === 'supervisor' && isAssignedSupervisor(actor, formData)) return formData;
  if (isAdministrativeRole(actor.role)) {
    if (isSystemAdminRole(actor.role)) return formData;

    if (action === 'review_dept') {
      if (isDeptHdRepRole(actor.role)) return formData;
      if (isLegacyAdminRole(actor.role) && (await hasSasiStaffRole(actor.sasiId, 'dept_fhd_rep', department))) return formData;
    }
    if (action === 'review_chairperson') {
      if (isDeptChairpersonRole(actor.role)) return formData;
      if (isLegacyAdminRole(actor.role) && (await hasSasiStaffRole(actor.sasiId, 'hod', department))) return formData;
    }
    if (action === 'review_faculty') {
      if (isFacultyHdRepRole(actor.role)) return formData;
      if (isLegacyAdminRole(actor.role) && (await hasSasiStaffRole(actor.sasiId, 'faculty_fhd_rep'))) return formData;
    }
  }

  throw new Error('Actor is not authorised for this review transition.');
}

function validateBeforeSubmit(moduleName: ChangeModuleName, formData: Record<string, unknown>): void {
  if (moduleName === 'change_title') {
    const currentTitle = sanitiseText(formData['Current Thesis Title']);
    const proposedTitle = stripTrailingStops(sanitiseText(formData['Proposed Thesis Title']));
    const rationale = sanitiseText(formData['Change Rationale']);
    if (!proposedTitle) {
      throw new Error('Proposed thesis title is required.');
    }
    if (normalizeName(proposedTitle) === normalizeName(currentTitle)) {
      throw new Error('Proposed thesis title must differ from current thesis title.');
    }
    if (rationale.trim().length < 20) {
      throw new Error('Change rationale must be at least 20 characters.');
    }
    return;
  }

  if (moduleName === 'change_supervisor') {
    const roleToChange = normalizeSupervisorRoleChange(sanitiseText(formData['Role To Change']));
    const outgoingAcademic = sanitiseText(formData['Outgoing Academic']);
    const incomingAcademic = sanitiseText(formData['Incoming Academic']);
    const continuityPlan = sanitiseText(formData['Continuity Plan']);
    if (roleToChange === '') {
      throw new Error('Role to change must be selected.');
    }
    if (!incomingAcademic || !outgoingAcademic) {
      throw new Error('Outgoing and incoming academics are required.');
    }
    if (normalizeName(incomingAcademic) === normalizeName(outgoingAcademic)) {
      throw new Error('Incoming academic must differ from outgoing academic.');
    }
    if (continuityPlan.trim().length < 20) {
      throw new Error('Continuity plan must be at least 20 characters.');
    }
    return;
  }

  const proposedCoSupervisor = sanitiseText(formData['Proposed Co-supervisor']);
  const currentCoSupervisors = sanitiseText(formData['Current Co-supervisors']);
  if (!proposedCoSupervisor) {
    throw new Error('Proposed co-supervisor is required.');
  }
  const existingNames = currentCoSupervisors
    .split(';')
    .map((name) => normalizeName(name))
    .filter(Boolean);
  if (existingNames.includes(normalizeName(proposedCoSupervisor))) {
    throw new Error('Proposed co-supervisor already exists in current co-supervisors.');
  }
}

async function applyFinalApprovalSideEffects(caseId: number, moduleName: ChangeModuleName, formData: Record<string, unknown>): Promise<void> {
  const rott = await getCaseById(caseId);
  const rottForm = rott.formData;
  const patch: Partial<FormData> = {};

  if (moduleName === 'change_title') {
    const proposedTitle = stripTrailingStops(sanitiseText(formData['Proposed Thesis Title']));
    patch['Thesis title'] = proposedTitle;
    await updateForm(caseId, patch);
    return;
  }

  if (moduleName === 'change_supervisor') {
    const roleToChange = normalizeSupervisorRoleChange(sanitiseText(formData['Role To Change']));
    const incomingAcademic = trimText(sanitiseText(formData['Incoming Academic']));
    const incomingQualification = trimText(sanitiseText(formData['Incoming Academic Qualification']));
    const incomingIsInternal = sanitiseText(formData['Incoming Academic Is UWC Internal']) === 'Yes' ? 'Yes' : 'No';
    const parsedName = parsePersonName(incomingAcademic);

    if (roleToChange === 'primary') {
      patch.Supervisor = incomingAcademic;
      patch['Supervisor Qualifications'] = incomingQualification;
      patch['Supervisor is UWC-internal'] = incomingIsInternal;
      if (incomingIsInternal === 'Yes') {
        patch['Supervisor External Lookup Id'] = '';
        patch['Supervisor External First Name'] = '';
        patch['Supervisor External Surname'] = '';
        patch['Supervisor External Address'] = '';
      } else {
        patch['Supervisor External First Name'] = parsedName.firstName || rottForm['Supervisor External First Name'];
        patch['Supervisor External Surname'] = parsedName.surname || rottForm['Supervisor External Surname'];
      }
    } else if (roleToChange === 'admin') {
      patch['Administrative Supervisor (Nominal Role)'] = incomingAcademic;
      patch['Administrative Supervisor Qualifications (Nominal Role)'] = incomingQualification;
      patch['Administrative Supervisor is UWC-internal'] = incomingIsInternal;
      patch['Administrative Supervisor same as Supervisor'] = 'No';
      if (incomingIsInternal === 'Yes') {
        patch['Administrative Supervisor External Lookup Id'] = '';
        patch['Administrative Supervisor External Title'] = '';
        patch['Administrative Supervisor External First Name'] = '';
        patch['Administrative Supervisor External Surname'] = '';
        patch['Administrative Supervisor External Address'] = '';
      } else {
        patch['Administrative Supervisor External First Name'] = parsedName.firstName || rottForm['Administrative Supervisor External First Name'];
        patch['Administrative Supervisor External Surname'] = parsedName.surname || rottForm['Administrative Supervisor External Surname'];
      }
    } else if (roleToChange === 'co1') {
      patch['Has Co-supervisor?'] = 'Yes';
      patch['Co-supervisor'] = incomingAcademic;
      patch['Co-supervisor Qualifications'] = incomingQualification;
      patch['Co-supervisor is UWC-internal'] = incomingIsInternal;
      if (incomingIsInternal === 'Yes') {
        patch['Co-supervisor External Lookup Id'] = '';
        patch['Co-supervisor External First Name'] = '';
        patch['Co-supervisor External Surname'] = '';
        patch['Co-supervisor External Address'] = '';
      } else {
        patch['Co-supervisor External First Name'] = parsedName.firstName || rottForm['Co-supervisor External First Name'];
        patch['Co-supervisor External Surname'] = parsedName.surname || rottForm['Co-supervisor External Surname'];
      }
    } else if (roleToChange === 'co2') {
      patch['Has Co-supervisor?'] = 'Yes';
      patch['Second Co-supervisor'] = incomingAcademic;
      patch['Second Co-supervisor Qualifications'] = incomingQualification;
      patch['Second Co-supervisor is UWC-internal'] = incomingIsInternal;
      if (incomingIsInternal === 'Yes') {
        patch['Second Co-supervisor External Lookup Id'] = '';
        patch['Second Co-supervisor External First Name'] = '';
        patch['Second Co-supervisor External Surname'] = '';
        patch['Second Co-supervisor External Address'] = '';
      } else {
        patch['Second Co-supervisor External First Name'] = parsedName.firstName || rottForm['Second Co-supervisor External First Name'];
        patch['Second Co-supervisor External Surname'] = parsedName.surname || rottForm['Second Co-supervisor External Surname'];
      }
    }

    await updateForm(caseId, patch);
    return;
  }

  const proposedName = trimText(sanitiseText(formData['Proposed Co-supervisor']));
  const proposedQualification = trimText(sanitiseText(formData['Proposed Co-supervisor Qualification']));
  const proposedIsInternal = sanitiseText(formData['Proposed Co-supervisor Is UWC Internal']) === 'Yes' ? 'Yes' : 'No';
  const parsedName = parsePersonName(proposedName);
  patch['Has Co-supervisor?'] = 'Yes';

  const co1Available = !rottForm['Co-supervisor'].trim() || rottForm['Co-supervisor'].trim().toUpperCase() === 'NA';
  const co2Available = !rottForm['Second Co-supervisor'].trim() || rottForm['Second Co-supervisor'].trim().toUpperCase() === 'NA';

  if (co1Available) {
    patch['Co-supervisor'] = proposedName;
    patch['Co-supervisor Qualifications'] = proposedQualification;
    patch['Co-supervisor is UWC-internal'] = proposedIsInternal;
    if (proposedIsInternal === 'Yes') {
      patch['Co-supervisor External Lookup Id'] = '';
      patch['Co-supervisor External First Name'] = '';
      patch['Co-supervisor External Surname'] = '';
      patch['Co-supervisor External Address'] = '';
    } else {
      patch['Co-supervisor External First Name'] = parsedName.firstName || rottForm['Co-supervisor External First Name'];
      patch['Co-supervisor External Surname'] = parsedName.surname || rottForm['Co-supervisor External Surname'];
    }
  } else if (co2Available) {
    patch['Second Co-supervisor'] = proposedName;
    patch['Second Co-supervisor Qualifications'] = proposedQualification;
    patch['Second Co-supervisor is UWC-internal'] = proposedIsInternal;
    if (proposedIsInternal === 'Yes') {
      patch['Second Co-supervisor External Lookup Id'] = '';
      patch['Second Co-supervisor External First Name'] = '';
      patch['Second Co-supervisor External Surname'] = '';
      patch['Second Co-supervisor External Address'] = '';
    } else {
      patch['Second Co-supervisor External First Name'] = parsedName.firstName || rottForm['Second Co-supervisor External First Name'];
      patch['Second Co-supervisor External Surname'] = parsedName.surname || rottForm['Second Co-supervisor External Surname'];
    }
  } else {
    patch['Second Co-supervisor'] = proposedName;
    patch['Second Co-supervisor Qualifications'] = proposedQualification;
    patch['Second Co-supervisor is UWC-internal'] = proposedIsInternal;
  }

  await updateForm(caseId, patch);
}

function currentSupervisionRoster(formData: FormData): string {
  const co = [formData['Co-supervisor'], formData['Second Co-supervisor']].filter((v) => v && v.trim() && v.toUpperCase() !== 'NA').join('; ');
  return [
    `Primary: ${formData.Supervisor}`,
    `Administrative: ${formData['Administrative Supervisor (Nominal Role)']}`,
    `Co-supervisors: ${co || 'None'}`,
  ].join(' | ');
}

function defaultChangeTitle(formData: FormData): ChangeTitleFormData {
  return {
    'Student Full Name': `${formData['Student Title']} ${formData['Student First-Name']} ${formData['Student Surname']}`.replace(/\s+/g, ' ').trim(),
    'Student Number': formData['Student Number'],
    Department: formData.Department,
    Degree: formData.Degree,
    'Current Thesis Title': formData['Thesis title'],
    'Proposed Thesis Title': '',
    'Change Rationale': '',
    'Ethics Impact': '',
    'Supervisor Comments': '',
  };
}

function changeTitleCompletion(data: ChangeTitleFormData): number {
  return requiredCompletionPercent(data, [
    'Student Full Name',
    'Student Number',
    'Current Thesis Title',
    'Proposed Thesis Title',
    'Change Rationale',
    'Ethics Impact',
  ]);
}

function defaultChangeSupervisor(formData: FormData): ChangeSupervisorFormData {
  return {
    'Student Full Name': `${formData['Student Title']} ${formData['Student First-Name']} ${formData['Student Surname']}`.replace(/\s+/g, ' ').trim(),
    'Student Number': formData['Student Number'],
    Department: formData.Department,
    Degree: formData.Degree,
    'Current Supervision Roster': currentSupervisionRoster(formData),
    'Role To Change': '',
    'Outgoing Academic': '',
    'Incoming Academic': '',
    'Incoming Academic Qualification': '',
    'Incoming Academic Is UWC Internal': 'Yes',
    'Change Rationale': '',
    'Continuity Plan': '',
  };
}

function changeSupervisorCompletion(data: ChangeSupervisorFormData): number {
  return requiredCompletionPercent(data, [
    'Student Full Name',
    'Student Number',
    'Current Supervision Roster',
    'Role To Change',
    'Outgoing Academic',
    'Incoming Academic',
    'Incoming Academic Qualification',
    'Change Rationale',
    'Continuity Plan',
  ]);
}

function defaultAddCoSupervisor(formData: FormData): AddCoSupervisorFormData {
  const co = [formData['Co-supervisor'], formData['Second Co-supervisor']].filter((v) => v && v.trim() && v.toUpperCase() !== 'NA').join('; ');
  return {
    'Student Full Name': `${formData['Student Title']} ${formData['Student First-Name']} ${formData['Student Surname']}`.replace(/\s+/g, ' ').trim(),
    'Student Number': formData['Student Number'],
    Department: formData.Department,
    Degree: formData.Degree,
    'Thesis Title': formData['Thesis title'],
    Supervisor: formData.Supervisor,
    'Current Co-supervisors': co || 'None',
    'Proposed Co-supervisor': '',
    'Proposed Co-supervisor Qualification': '',
    'Proposed Co-supervisor Is UWC Internal': 'Yes',
    'Motivation For Addition': '',
  };
}

function addCoSupervisorCompletion(data: AddCoSupervisorFormData): number {
  return requiredCompletionPercent(data, [
    'Student Full Name',
    'Student Number',
    'Thesis Title',
    'Supervisor',
    'Proposed Co-supervisor',
    'Proposed Co-supervisor Qualification',
    'Motivation For Addition',
  ]);
}

const CHANGE_REQUEST_REVIEW_TRANSITIONS: Record<ReviewRoleAction, ReviewTransition> = {
  review_supervisor: {
    fromStatus: 'awaiting_supervisor_review',
    approvedStatus: 'awaiting_dept_review',
    returnedStatus: 'returned_by_supervisor',
  },
  review_dept: {
    fromStatus: 'awaiting_dept_review',
    approvedStatus: 'awaiting_chairperson_review',
    returnedStatus: 'returned_by_dept',
  },
  review_chairperson: {
    fromStatus: 'awaiting_chairperson_review',
    approvedStatus: 'awaiting_faculty_review',
    returnedStatus: 'returned_by_chairperson',
  },
  review_faculty: {
    fromStatus: 'awaiting_faculty_review',
    approvedStatus: 'approved',
    returnedStatus: 'returned_by_faculty',
  },
};

const CHANGE_REQUEST_MODULE_REGISTRY: { [K in ChangeModuleName]: ChangeRequestModuleConfig<ChangeRequestModuleDataMap[K]> } = {
  change_title: {
    table: 'change_title_forms',
    moduleName: 'change_title',
    title: 'Request for Change of Thesis Title',
    completionCalculator: changeTitleCompletion,
    buildPrefill: defaultChangeTitle,
    validateBeforeSubmit: (data) => validateBeforeSubmit('change_title', data as unknown as Record<string, unknown>),
  },
  change_supervisor: {
    table: 'change_supervisor_forms',
    moduleName: 'change_supervisor',
    title: 'Request for Change of Supervisor / Co-supervisor',
    completionCalculator: changeSupervisorCompletion,
    buildPrefill: defaultChangeSupervisor,
    validateBeforeSubmit: (data) => validateBeforeSubmit('change_supervisor', data as unknown as Record<string, unknown>),
  },
  add_co_supervisor: {
    table: 'add_co_supervisor_forms',
    moduleName: 'add_co_supervisor',
    title: 'Addition of Co-supervisor Request',
    completionCalculator: addCoSupervisorCompletion,
    buildPrefill: defaultAddCoSupervisor,
    validateBeforeSubmit: (data) => validateBeforeSubmit('add_co_supervisor', data as unknown as Record<string, unknown>),
  },
};

function getModuleConfig<K extends ChangeModuleName>(moduleName: K): ChangeRequestModuleConfig<ChangeRequestModuleDataMap[K]> {
  return CHANGE_REQUEST_MODULE_REGISTRY[moduleName];
}

async function getOrCreateModule<K extends ChangeModuleName>(
  moduleName: K,
  actor: AuthUserLike,
  caseId: number,
): Promise<{ record: ModuleFormRecord; formData: ChangeRequestModuleDataMap[K] }> {
  const rott = await assertAuthorization(actor, caseId, 'read');
  const config = getModuleConfig(moduleName);
  const baseline = config.buildPrefill(rott);
  return getOrCreateModuleRecord(caseId, config, baseline);
}

async function updateModule<K extends ChangeModuleName>(
  moduleName: K,
  actor: AuthUserLike,
  caseId: number,
  patch: Partial<ChangeRequestModuleDataMap[K]>,
): Promise<{ record: ModuleFormRecord; formData: ChangeRequestModuleDataMap[K] }> {
  await assertAuthorization(actor, caseId, 'edit');
  const config = getModuleConfig(moduleName);
  return updateModuleRecord(caseId, config, patch, (id) => getOrCreateModule(moduleName, actor, id));
}

async function submitModule<K extends ChangeModuleName>(
  moduleName: K,
  actor: AuthUserLike,
  caseId: number,
): Promise<ModuleFormRecord> {
  await assertAuthorization(actor, caseId, 'submit');
  const config = getModuleConfig(moduleName);
  return submitModuleRecord(
    caseId,
    config,
    (id) => getOrCreateModule(moduleName, actor, id),
    'awaiting_supervisor_review',
    (data) => config.validateBeforeSubmit(data),
  );
}

async function reviewModule(
  moduleName: ChangeModuleName,
  actor: AuthUserLike,
  caseId: number,
  decision: ModuleReviewDecision,
  roleAction: ReviewRoleAction,
): Promise<ModuleFormRecord> {
  await assertAuthorization(actor, caseId, roleAction);
  return reviewModuleRecord(caseId, getModuleConfig(moduleName), decision, CHANGE_REQUEST_REVIEW_TRANSITIONS[roleAction], (data) =>
    applyFinalApprovalSideEffects(caseId, moduleName, data as unknown as Record<string, unknown>),
  );
}

async function printModule(
  moduleName: ChangeModuleName,
  actor: AuthUserLike,
  caseId: number,
): Promise<{ pdfPath: string }> {
  const rott = await assertAuthorization(actor, caseId, 'print');
  return printModulePdf(caseId, getModuleConfig(moduleName), sanitiseText(rott['Student Number']));
}

export async function getOrCreateChangeTitle(actor: AuthUserLike, caseId: number): Promise<{ record: ModuleFormRecord; formData: ChangeTitleFormData }> {
  return getOrCreateModule('change_title', actor, caseId);
}

export async function updateChangeTitle(actor: AuthUserLike, caseId: number, patch: Partial<ChangeTitleFormData>): Promise<{ record: ModuleFormRecord; formData: ChangeTitleFormData }> {
  return updateModule('change_title', actor, caseId, patch);
}

export async function submitChangeTitle(actor: AuthUserLike, caseId: number): Promise<ModuleFormRecord> {
  return submitModule('change_title', actor, caseId);
}

export async function reviewChangeTitleBySupervisor(actor: AuthUserLike, caseId: number, decision: ModuleReviewDecision): Promise<ModuleFormRecord> {
  return reviewModule('change_title', actor, caseId, decision, 'review_supervisor');
}

export async function reviewChangeTitleByDept(actor: AuthUserLike, caseId: number, decision: ModuleReviewDecision): Promise<ModuleFormRecord> {
  return reviewModule('change_title', actor, caseId, decision, 'review_dept');
}

export async function reviewChangeTitleByChair(actor: AuthUserLike, caseId: number, decision: ModuleReviewDecision): Promise<ModuleFormRecord> {
  return reviewModule('change_title', actor, caseId, decision, 'review_chairperson');
}

export async function reviewChangeTitleByFaculty(actor: AuthUserLike, caseId: number, decision: ModuleReviewDecision): Promise<ModuleFormRecord> {
  return reviewModule('change_title', actor, caseId, decision, 'review_faculty');
}

export async function printChangeTitle(actor: AuthUserLike, caseId: number): Promise<{ pdfPath: string }> {
  return printModule('change_title', actor, caseId);
}

export async function getOrCreateChangeSupervisor(actor: AuthUserLike, caseId: number): Promise<{ record: ModuleFormRecord; formData: ChangeSupervisorFormData }> {
  return getOrCreateModule('change_supervisor', actor, caseId);
}

export async function updateChangeSupervisor(actor: AuthUserLike, caseId: number, patch: Partial<ChangeSupervisorFormData>): Promise<{ record: ModuleFormRecord; formData: ChangeSupervisorFormData }> {
  return updateModule('change_supervisor', actor, caseId, patch);
}

export async function submitChangeSupervisor(actor: AuthUserLike, caseId: number): Promise<ModuleFormRecord> {
  return submitModule('change_supervisor', actor, caseId);
}

export async function reviewChangeSupervisorBySupervisor(actor: AuthUserLike, caseId: number, decision: ModuleReviewDecision): Promise<ModuleFormRecord> {
  return reviewModule('change_supervisor', actor, caseId, decision, 'review_supervisor');
}

export async function reviewChangeSupervisorByDept(actor: AuthUserLike, caseId: number, decision: ModuleReviewDecision): Promise<ModuleFormRecord> {
  return reviewModule('change_supervisor', actor, caseId, decision, 'review_dept');
}

export async function reviewChangeSupervisorByChair(actor: AuthUserLike, caseId: number, decision: ModuleReviewDecision): Promise<ModuleFormRecord> {
  return reviewModule('change_supervisor', actor, caseId, decision, 'review_chairperson');
}

export async function reviewChangeSupervisorByFaculty(actor: AuthUserLike, caseId: number, decision: ModuleReviewDecision): Promise<ModuleFormRecord> {
  return reviewModule('change_supervisor', actor, caseId, decision, 'review_faculty');
}

export async function printChangeSupervisor(actor: AuthUserLike, caseId: number): Promise<{ pdfPath: string }> {
  return printModule('change_supervisor', actor, caseId);
}

export async function getOrCreateAddCoSupervisor(actor: AuthUserLike, caseId: number): Promise<{ record: ModuleFormRecord; formData: AddCoSupervisorFormData }> {
  return getOrCreateModule('add_co_supervisor', actor, caseId);
}

export async function updateAddCoSupervisor(actor: AuthUserLike, caseId: number, patch: Partial<AddCoSupervisorFormData>): Promise<{ record: ModuleFormRecord; formData: AddCoSupervisorFormData }> {
  return updateModule('add_co_supervisor', actor, caseId, patch);
}

export async function submitAddCoSupervisor(actor: AuthUserLike, caseId: number): Promise<ModuleFormRecord> {
  return submitModule('add_co_supervisor', actor, caseId);
}

export async function reviewAddCoSupervisorBySupervisor(actor: AuthUserLike, caseId: number, decision: ModuleReviewDecision): Promise<ModuleFormRecord> {
  return reviewModule('add_co_supervisor', actor, caseId, decision, 'review_supervisor');
}

export async function reviewAddCoSupervisorByDept(actor: AuthUserLike, caseId: number, decision: ModuleReviewDecision): Promise<ModuleFormRecord> {
  return reviewModule('add_co_supervisor', actor, caseId, decision, 'review_dept');
}

export async function reviewAddCoSupervisorByChair(actor: AuthUserLike, caseId: number, decision: ModuleReviewDecision): Promise<ModuleFormRecord> {
  return reviewModule('add_co_supervisor', actor, caseId, decision, 'review_chairperson');
}

export async function reviewAddCoSupervisorByFaculty(actor: AuthUserLike, caseId: number, decision: ModuleReviewDecision): Promise<ModuleFormRecord> {
  return reviewModule('add_co_supervisor', actor, caseId, decision, 'review_faculty');
}

export async function printAddCoSupervisor(actor: AuthUserLike, caseId: number): Promise<{ pdfPath: string }> {
  return printModule('add_co_supervisor', actor, caseId);
}
