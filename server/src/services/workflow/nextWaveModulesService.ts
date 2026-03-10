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
import { getCaseById } from '../titleRegistrationWorkflowService';
import type {
  AppointArbiterFormData,
  AppointExaminersFormData,
  ChangeExaminersFormData,
  FormData,
  ExaminerSummaryCvFormData,
  IntentionToSubmitFormData,
  ModuleFormRecord,
} from '../contracts/titleRegistration';
import {
  assertModuleHasSubmittedState,
  getOrCreateModuleRecord,
  parseJsonObject,
  printModulePdf,
  readModuleRecord,
  reviewModuleRecord,
  submitModuleRecord,
  updateModuleRecord,
} from './moduleLifecycleEngine';
import type {
  ModuleLifecycleConfig,
  ModuleReviewDecision,
  ModuleStatus,
  ReviewTransition,
} from './moduleLifecycleEngine';

export type { ModuleReviewDecision };

interface AuthUserLike {
  id: number;
  role: Role;
  sasiId: string;
  firstName: string;
  lastName: string;
}

type FormTableName =
  | 'intention_to_submit_forms'
  | 'appoint_examiners_forms'
  | 'change_examiners_forms'
  | 'examiner_summary_cv_forms'
  | 'appoint_arbiter_forms';

type ModuleName =
  | 'intention_to_submit'
  | 'appoint_examiners'
  | 'change_examiners'
  | 'examiner_summary_cv'
  | 'appoint_arbiter';

type RoleAction = 'read' | 'edit' | 'submit' | 'review_supervisor' | 'review_dept' | 'review_chairperson' | 'review_faculty' | 'print';
type ReviewRoleAction = Exclude<RoleAction, 'read' | 'edit' | 'submit' | 'print'>;

interface NextWaveModuleDataMap {
  intention_to_submit: IntentionToSubmitFormData;
  appoint_examiners: AppointExaminersFormData;
  change_examiners: ChangeExaminersFormData;
  examiner_summary_cv: ExaminerSummaryCvFormData;
  appoint_arbiter: AppointArbiterFormData;
}

interface NextWaveModuleConfig<TData extends object> extends ModuleLifecycleConfig<TData, FormTableName, ModuleName> {
  ensurePrerequisite: (caseId: number) => Promise<void>;
  buildPrefill: (input: { actor: AuthUserLike; caseId: number; rottFormData: FormData }) => Promise<TData> | TData;
  editRole: 'student' | 'supervisor';
  submitRole: 'student' | 'supervisor';
  submitTargetStatus: ModuleStatus;
}

function sanitiseText(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

function boolFrom(value: unknown): boolean {
  return value === true;
}

function normalizeName(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, ' ');
}

function isNamed(value: string): boolean {
  const trimmed = value.trim();
  return Boolean(trimmed) && trimmed.toUpperCase() !== 'NA';
}

function resolveThesisType(formData: FormData): string {
  if (boolFrom(formData['PhD by traditional thesis format'])) return 'PhD by traditional thesis format';
  if (boolFrom(formData['PhD by publication'])) return 'PhD by publication';
  if (boolFrom(formData['Masters Full-thesis'])) return 'Masters Full-thesis';
  if (boolFrom(formData['Masters Mini thesis'])) return 'Masters Mini thesis';
  if (boolFrom(formData['Masters by publication'])) return 'Masters by publication';
  return sanitiseText(formData.Degree);
}

function resolveCoSupervisors(formData: FormData): string {
  if (sanitiseText(formData['Has Co-supervisor?']) !== 'Yes') {
    return 'Not applicable';
  }

  const co1 = sanitiseText(formData['Co-supervisor']);
  const co2 = sanitiseText(formData['Second Co-supervisor']);
  const names = [co1, co2].map((value) => value.trim()).filter((value) => isNamed(value));

  return names.length > 0 ? names.join('; ') : 'Not applicable';
}

function resolveStudentFullName(formData: FormData): string {
  return [
    sanitiseText(formData['Student Title']),
    sanitiseText(formData['Student First-Name']),
    sanitiseText(formData['Student Surname']),
  ]
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function requiredCompletionPercent<T extends object>(formData: T, requiredKeys: Array<keyof T>): number {
  let completed = 0;
  for (const key of requiredKeys) {
    const value = formData[key];
    if (typeof value === 'string') {
      if (value.trim()) completed += 1;
      continue;
    }
    if (typeof value === 'number') {
      completed += 1;
    }
  }
  return Math.round((completed / requiredKeys.length) * 100);
}

async function hasSasiStaffRole(sasiId: string, role: string, department?: string): Promise<boolean> {
  let query = db('sasi_staff').where({ staff_number: sasiId, role });
  if (department) {
    query = query.andWhere('department', department);
  }
  const row = await query.first();
  return Boolean(row);
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

async function assertModuleAuthorization(actor: AuthUserLike, caseId: number, action: RoleAction): Promise<{ formData: FormData; studentDepartment: string; studentNumber: string }> {
  const { formData, student } = await getCaseById(caseId);
  const studentNumber = sanitiseText(formData['Student Number']);
  const studentDepartment = sanitiseText(student.department);

  if (action === 'read' || action === 'print') {
    if (actor.role === 'student' && actor.sasiId === studentNumber) {
      return { formData, studentDepartment, studentNumber };
    }
    if (actor.role === 'supervisor' && isAssignedSupervisor(actor, formData)) {
      return { formData, studentDepartment, studentNumber };
    }
    if (isAdministrativeRole(actor.role)) {
      if (isSystemAdminRole(actor.role)) {
        return { formData, studentDepartment, studentNumber };
      }
      if (isDeptHdRepRole(actor.role) || isDeptChairpersonRole(actor.role) || isFacultyHdRepRole(actor.role)) {
        return { formData, studentDepartment, studentNumber };
      }
      if (!isLegacyAdminRole(actor.role)) {
        throw new Error('Actor is not authorised for module read/print on this case.');
      }
      const [dept, chair, faculty] = await Promise.all([
        hasSasiStaffRole(actor.sasiId, 'dept_fhd_rep', studentDepartment),
        hasSasiStaffRole(actor.sasiId, 'hod', studentDepartment),
        hasSasiStaffRole(actor.sasiId, 'faculty_fhd_rep'),
      ]);
      if (dept || chair || faculty) {
        return { formData, studentDepartment, studentNumber };
      }
    }
    throw new Error('Actor is not authorised for module read/print on this case.');
  }

  if (action === 'edit' || action === 'submit') {
    if (actor.role === 'student' && actor.sasiId === studentNumber) {
      return { formData, studentDepartment, studentNumber };
    }
    if (actor.role === 'supervisor' && isAssignedSupervisor(actor, formData)) {
      return { formData, studentDepartment, studentNumber };
    }
    throw new Error('Actor is not authorised for module draft edits/submission on this case.');
  }

  if (actor.role === 'supervisor' && action === 'review_supervisor' && isAssignedSupervisor(actor, formData)) {
    return { formData, studentDepartment, studentNumber };
  }

  if (isAdministrativeRole(actor.role)) {
    if (isSystemAdminRole(actor.role)) {
      return { formData, studentDepartment, studentNumber };
    }

    if (action === 'review_dept') {
      if (isDeptHdRepRole(actor.role)) return { formData, studentDepartment, studentNumber };
      if (isLegacyAdminRole(actor.role) && (await hasSasiStaffRole(actor.sasiId, 'dept_fhd_rep', studentDepartment))) {
        return { formData, studentDepartment, studentNumber };
      }
    }
    if (action === 'review_chairperson') {
      if (isDeptChairpersonRole(actor.role)) return { formData, studentDepartment, studentNumber };
      if (isLegacyAdminRole(actor.role) && (await hasSasiStaffRole(actor.sasiId, 'hod', studentDepartment))) {
        return { formData, studentDepartment, studentNumber };
      }
    }
    if (action === 'review_faculty') {
      if (isFacultyHdRepRole(actor.role)) return { formData, studentDepartment, studentNumber };
      if (isLegacyAdminRole(actor.role) && (await hasSasiStaffRole(actor.sasiId, 'faculty_fhd_rep'))) {
        return { formData, studentDepartment, studentNumber };
      }
    }
  }

  throw new Error('Actor is not authorised for this module transition.');
}

async function ensureItsPrerequisite(caseId: number): Promise<void> {
  const { formData } = await getCaseById(caseId);
  if (formData['Has the MOU been submitted?'] !== 'Yes') {
    throw new Error('INTENTION_TO_SUBMIT can start only after MOU is submitted.');
  }
}

async function ensureAppointExaminersPrerequisite(caseId: number): Promise<void> {
  await assertModuleHasSubmittedState('intention_to_submit_forms', caseId, 'INTENTION_TO_SUBMIT');
  const its = await readModuleRecord('intention_to_submit_forms', caseId);
  if (!its || its.status !== 'approved') {
    throw new Error('APPOINT_EXAMINERS can start only after INTENTION_TO_SUBMIT is approved.');
  }
}

async function ensureChangeExaminersPrerequisite(caseId: number): Promise<void> {
  await assertModuleHasSubmittedState('appoint_examiners_forms', caseId, 'APPOINT_EXAMINERS');
  const appoint = await readModuleRecord('appoint_examiners_forms', caseId);
  if (!appoint || appoint.status !== 'approved') {
    throw new Error('CHANGE_EXAMINERS can start only after APPOINT_EXAMINERS is approved.');
  }
}

async function ensureSummaryPrerequisite(caseId: number): Promise<void> {
  const appoint = await readModuleRecord('appoint_examiners_forms', caseId);
  const change = await readModuleRecord('change_examiners_forms', caseId);
  if ((appoint?.status ?? '') !== 'approved' && (change?.status ?? '') !== 'approved') {
    throw new Error('EXAMINER_SUMMARY_CV can start only after APPOINT_EXAMINERS or CHANGE_EXAMINERS is approved.');
  }
}

async function ensureArbiterPrerequisite(caseId: number): Promise<void> {
  const appoint = await readModuleRecord('appoint_examiners_forms', caseId);
  const change = await readModuleRecord('change_examiners_forms', caseId);
  if ((appoint?.status ?? '') !== 'approved' && (change?.status ?? '') !== 'approved') {
    throw new Error('APPOINT_ARBITER can start only after APPOINT_EXAMINERS or CHANGE_EXAMINERS is approved.');
  }
}

function defaultItsFromRott(formData: FormData): IntentionToSubmitFormData {
  const hasCo = sanitiseText(formData['Has Co-supervisor?']) === 'Yes';
  return {
    'Student Full Name': resolveStudentFullName(formData),
    'Student Number': sanitiseText(formData['Student Number']),
    Department: sanitiseText(formData.Department),
    Degree: resolveThesisType(formData),
    Supervisor: sanitiseText(formData.Supervisor),
    'Co-supervisor(s)': resolveCoSupervisors(formData),
    'Thesis title': sanitiseText(formData['Thesis title']),
    'Year of first enrolment': sanitiseText(formData['Year first registered']),
    'Submission type': '',
    'Intended submission date': '',
    'Student declaration': 'I confirm that this intention to submit is accurate and ready for supervisory review.',
    'Student signature date': '',
    'Supervisor approval status': 'Pending',
    'Co-supervisor approval status': hasCo ? 'Pending' : 'Not applicable',
    'Department PG coordinator approval status': 'Pending',
    'Non-approval motivation': '',
  };
}

function itsCompletion(formData: IntentionToSubmitFormData): number {
  return requiredCompletionPercent(formData, [
    'Student Full Name',
    'Student Number',
    'Department',
    'Degree',
    'Supervisor',
    'Thesis title',
    'Year of first enrolment',
    'Submission type',
    'Intended submission date',
    'Student declaration',
    'Student signature date',
  ]);
}

function defaultAppointExaminersFromRott(formData: FormData): AppointExaminersFormData {
  return {
    'Student Full Name': resolveStudentFullName(formData),
    'Student Number': sanitiseText(formData['Student Number']),
    'Faculty and Department': sanitiseText(formData.Department),
    Degree: resolveThesisType(formData),
    Supervisor: sanitiseText(formData.Supervisor),
    'Co-supervisor(s)': resolveCoSupervisors(formData),
    'Thesis title': sanitiseText(formData['Thesis title']),
    'Year of first enrolment': sanitiseText(formData['Year first registered']),
    'Title already registered': 'Yes',
    'Concurrent title-change declaration': '',
    'Examiner 1 Name': '',
    'Examiner 1 Type': '',
    'Examiner 1 Affiliation': '',
    'Examiner 1 Motivation': '',
    'Examiner 1 CV received': 'No',
    'Examiner 1 Conflict disclosure': '',
    'Examiner 2 Name': '',
    'Examiner 2 Type': '',
    'Examiner 2 Affiliation': '',
    'Examiner 2 Motivation': '',
    'Examiner 2 CV received': 'No',
    'Examiner 2 Conflict disclosure': '',
    'Examiner 3 Name': '',
    'Examiner 3 Type': '',
    'Examiner 3 Affiliation': '',
    'Examiner 3 Motivation': '',
    'Examiner 3 CV received': 'No',
    'Examiner 3 Conflict disclosure': '',
  };
}

function appointExaminersCompletion(formData: AppointExaminersFormData): number {
  return requiredCompletionPercent(formData, [
    'Student Full Name',
    'Student Number',
    'Faculty and Department',
    'Degree',
    'Supervisor',
    'Thesis title',
    'Year of first enrolment',
    'Title already registered',
    'Examiner 1 Name',
    'Examiner 1 Type',
    'Examiner 1 Affiliation',
    'Examiner 1 Motivation',
    'Examiner 1 CV received',
    'Examiner 1 Conflict disclosure',
    'Examiner 2 Name',
    'Examiner 2 Type',
    'Examiner 2 Affiliation',
    'Examiner 2 Motivation',
    'Examiner 2 CV received',
    'Examiner 2 Conflict disclosure',
  ]);
}

function examinersPanelSummary(formData: AppointExaminersFormData): string {
  const rows = [1, 2, 3]
    .map((idx) => {
      const name = sanitiseText(formData[`Examiner ${idx} Name` as keyof AppointExaminersFormData]);
      const type = sanitiseText(formData[`Examiner ${idx} Type` as keyof AppointExaminersFormData]);
      const affiliation = sanitiseText(formData[`Examiner ${idx} Affiliation` as keyof AppointExaminersFormData]);
      if (!name.trim()) return '';
      return `${name}${type ? ` (${type})` : ''}${affiliation ? ` - ${affiliation}` : ''}`;
    })
    .filter(Boolean);
  return rows.join('; ');
}

function defaultChangeExaminers(formData: FormData, appointData: AppointExaminersFormData): ChangeExaminersFormData {
  return {
    'Student Full Name': resolveStudentFullName(formData),
    'Student Number': sanitiseText(formData['Student Number']),
    'Thesis title': sanitiseText(formData['Thesis title']),
    'Current examiner panel summary': examinersPanelSummary(appointData),
    'Change motivation': '',
    'Replacement Examiner 1 Name': '',
    'Replacement Examiner 1 Type': '',
    'Replacement Examiner 1 Affiliation': '',
    'Replacement Examiner 1 Motivation': '',
    'Replacement Examiner 2 Name': '',
    'Replacement Examiner 2 Type': '',
    'Replacement Examiner 2 Affiliation': '',
    'Replacement Examiner 2 Motivation': '',
  };
}

function changeExaminersCompletion(formData: ChangeExaminersFormData): number {
  return requiredCompletionPercent(formData, [
    'Student Full Name',
    'Student Number',
    'Thesis title',
    'Current examiner panel summary',
    'Change motivation',
    'Replacement Examiner 1 Name',
    'Replacement Examiner 1 Type',
    'Replacement Examiner 1 Affiliation',
    'Replacement Examiner 1 Motivation',
  ]);
}

function defaultExaminerSummary(formData: FormData, panelSummary: string): ExaminerSummaryCvFormData {
  return {
    'Student Full Name': resolveStudentFullName(formData),
    'Student Number': sanitiseText(formData['Student Number']),
    'Thesis title': sanitiseText(formData['Thesis title']),
    'Examiner panel summary': panelSummary,
    'Summary CV packet status': 'Pending',
    'Compiled by': '',
    'Compilation date': '',
    Notes: '',
  };
}

function examinerSummaryCompletion(formData: ExaminerSummaryCvFormData): number {
  return requiredCompletionPercent(formData, [
    'Student Full Name',
    'Student Number',
    'Thesis title',
    'Examiner panel summary',
    'Summary CV packet status',
    'Compiled by',
    'Compilation date',
  ]);
}

function defaultArbiter(formData: FormData, panelSummary: string): AppointArbiterFormData {
  return {
    'Student Full Name': resolveStudentFullName(formData),
    'Student Number': sanitiseText(formData['Student Number']),
    'Thesis title': sanitiseText(formData['Thesis title']),
    'Examiner panel summary': panelSummary,
    'Arbiter Name': '',
    'Arbiter Type': '',
    'Arbiter Affiliation': '',
    'Arbiter Motivation': '',
    'Arbiter CV received': 'No',
    'Arbiter conflict disclosure': '',
  };
}

function arbiterCompletion(formData: AppointArbiterFormData): number {
  return requiredCompletionPercent(formData, [
    'Student Full Name',
    'Student Number',
    'Thesis title',
    'Examiner panel summary',
    'Arbiter Name',
    'Arbiter Type',
    'Arbiter Affiliation',
    'Arbiter Motivation',
    'Arbiter CV received',
    'Arbiter conflict disclosure',
  ]);
}

const NEXT_WAVE_REVIEW_TRANSITIONS: Record<ModuleName, Partial<Record<ReviewRoleAction, ReviewTransition>>> = {
  intention_to_submit: {
    review_supervisor: {
      fromStatus: 'awaiting_supervisor_review',
      approvedStatus: 'awaiting_dept_review',
      returnedStatus: 'returned_by_supervisor',
    },
    review_dept: {
      fromStatus: 'awaiting_dept_review',
      approvedStatus: 'approved',
      returnedStatus: 'returned_by_dept',
    },
  },
  appoint_examiners: {
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
  },
  change_examiners: {
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
  },
  examiner_summary_cv: {
    review_dept: {
      fromStatus: 'awaiting_dept_review',
      approvedStatus: 'awaiting_faculty_review',
      returnedStatus: 'returned_by_dept',
    },
    review_faculty: {
      fromStatus: 'awaiting_faculty_review',
      approvedStatus: 'approved',
      returnedStatus: 'returned_by_faculty',
    },
  },
  appoint_arbiter: {
    review_dept: {
      fromStatus: 'awaiting_dept_review',
      approvedStatus: 'awaiting_faculty_review',
      returnedStatus: 'returned_by_dept',
    },
    review_faculty: {
      fromStatus: 'awaiting_faculty_review',
      approvedStatus: 'approved',
      returnedStatus: 'returned_by_faculty',
    },
  },
};

const NEXT_WAVE_MODULE_REGISTRY: { [K in ModuleName]: NextWaveModuleConfig<NextWaveModuleDataMap[K]> } = {
  intention_to_submit: {
    table: 'intention_to_submit_forms',
    moduleName: 'intention_to_submit',
    title: 'Intention to Submit',
    completionCalculator: itsCompletion,
    ensurePrerequisite: ensureItsPrerequisite,
    buildPrefill: ({ rottFormData }) => defaultItsFromRott(rottFormData),
    editRole: 'student',
    submitRole: 'student',
    submitTargetStatus: 'awaiting_supervisor_review',
  },
  appoint_examiners: {
    table: 'appoint_examiners_forms',
    moduleName: 'appoint_examiners',
    title: 'Appointment of Examiners',
    completionCalculator: appointExaminersCompletion,
    ensurePrerequisite: ensureAppointExaminersPrerequisite,
    buildPrefill: ({ rottFormData }) => defaultAppointExaminersFromRott(rottFormData),
    editRole: 'supervisor',
    submitRole: 'supervisor',
    submitTargetStatus: 'awaiting_dept_review',
  },
  change_examiners: {
    table: 'change_examiners_forms',
    moduleName: 'change_examiners',
    title: 'Change of Examiners',
    completionCalculator: changeExaminersCompletion,
    ensurePrerequisite: ensureChangeExaminersPrerequisite,
    buildPrefill: async ({ actor, caseId, rottFormData }) => {
      const appoint = await getOrCreateModule('appoint_examiners', actor, caseId);
      return defaultChangeExaminers(rottFormData, appoint.formData);
    },
    editRole: 'supervisor',
    submitRole: 'supervisor',
    submitTargetStatus: 'awaiting_dept_review',
  },
  examiner_summary_cv: {
    table: 'examiner_summary_cv_forms',
    moduleName: 'examiner_summary_cv',
    title: 'Examiner Summary CV',
    completionCalculator: examinerSummaryCompletion,
    ensurePrerequisite: ensureSummaryPrerequisite,
    buildPrefill: async ({ caseId, rottFormData }) => {
      const changeRecord = await readModuleRecord('change_examiners_forms', caseId);
      const appointRecord = await readModuleRecord('appoint_examiners_forms', caseId);
      const summarySource = changeRecord?.status === 'approved'
        ? parseJsonObject<ChangeExaminersFormData>(changeRecord.form_data_json)['Current examiner panel summary']
        : appointRecord
          ? examinersPanelSummary(parseJsonObject<AppointExaminersFormData>(appointRecord.form_data_json))
          : '';
      return defaultExaminerSummary(rottFormData, summarySource);
    },
    editRole: 'supervisor',
    submitRole: 'supervisor',
    submitTargetStatus: 'awaiting_dept_review',
  },
  appoint_arbiter: {
    table: 'appoint_arbiter_forms',
    moduleName: 'appoint_arbiter',
    title: 'Appointment of Arbiter',
    completionCalculator: arbiterCompletion,
    ensurePrerequisite: ensureArbiterPrerequisite,
    buildPrefill: async ({ caseId, rottFormData }) => {
      const changeRecord = await readModuleRecord('change_examiners_forms', caseId);
      const appointRecord = await readModuleRecord('appoint_examiners_forms', caseId);
      const panelSummary = changeRecord?.status === 'approved'
        ? parseJsonObject<ChangeExaminersFormData>(changeRecord.form_data_json)['Current examiner panel summary']
        : appointRecord
          ? examinersPanelSummary(parseJsonObject<AppointExaminersFormData>(appointRecord.form_data_json))
          : '';
      return defaultArbiter(rottFormData, panelSummary);
    },
    editRole: 'supervisor',
    submitRole: 'supervisor',
    submitTargetStatus: 'awaiting_dept_review',
  },
};

function getModuleConfig<K extends ModuleName>(moduleName: K): NextWaveModuleConfig<NextWaveModuleDataMap[K]> {
  return NEXT_WAVE_MODULE_REGISTRY[moduleName];
}

function getReviewTransition(moduleName: ModuleName, roleAction: ReviewRoleAction): ReviewTransition {
  const transition = NEXT_WAVE_REVIEW_TRANSITIONS[moduleName][roleAction];
  if (!transition) {
    throw new Error(`${moduleName} does not support ${roleAction} transitions.`);
  }
  return transition;
}

async function getOrCreateModule<K extends ModuleName>(
  moduleName: K,
  actor: AuthUserLike,
  caseId: number,
): Promise<{ record: ModuleFormRecord; formData: NextWaveModuleDataMap[K] }> {
  await assertModuleAuthorization(actor, caseId, 'read');
  const config = getModuleConfig(moduleName);
  await config.ensurePrerequisite(caseId);
  const { formData: rottFormData } = await getCaseById(caseId);
  const prefill = await config.buildPrefill({ actor, caseId, rottFormData });
  return getOrCreateModuleRecord(caseId, config, prefill);
}

async function updateModule<K extends ModuleName>(
  moduleName: K,
  actor: AuthUserLike,
  caseId: number,
  patch: Partial<NextWaveModuleDataMap[K]>,
): Promise<{ record: ModuleFormRecord; formData: NextWaveModuleDataMap[K] }> {
  await assertModuleAuthorization(actor, caseId, 'edit');
  const config = getModuleConfig(moduleName);
  if (actor.role !== config.editRole) {
    throw new Error(`Only an assigned ${config.editRole} can edit ${moduleName.toUpperCase()} draft data.`);
  }
  return updateModuleRecord(caseId, config, patch, (id) => getOrCreateModule(moduleName, actor, id));
}

async function submitModule<K extends ModuleName>(moduleName: K, actor: AuthUserLike, caseId: number): Promise<ModuleFormRecord> {
  await assertModuleAuthorization(actor, caseId, 'submit');
  const config = getModuleConfig(moduleName);
  if (actor.role !== config.submitRole) {
    throw new Error(`Only an assigned ${config.submitRole} can submit ${moduleName.toUpperCase()}.`);
  }
  return submitModuleRecord(caseId, config, (id) => getOrCreateModule(moduleName, actor, id), config.submitTargetStatus);
}

async function reviewModule<K extends ModuleName>(
  moduleName: K,
  actor: AuthUserLike,
  caseId: number,
  decision: ModuleReviewDecision,
  roleAction: ReviewRoleAction,
): Promise<ModuleFormRecord> {
  await assertModuleAuthorization(actor, caseId, roleAction);
  return reviewModuleRecord(caseId, getModuleConfig(moduleName), decision, getReviewTransition(moduleName, roleAction));
}

async function printModule<K extends ModuleName>(moduleName: K, actor: AuthUserLike, caseId: number): Promise<{ pdfPath: string }> {
  const auth = await assertModuleAuthorization(actor, caseId, 'print');
  return printModulePdf(caseId, getModuleConfig(moduleName), auth.studentNumber);
}

export async function getOrCreateIntentionToSubmit(actor: AuthUserLike, caseId: number): Promise<{ record: ModuleFormRecord; formData: IntentionToSubmitFormData }> {
  return getOrCreateModule('intention_to_submit', actor, caseId);
}

export async function updateIntentionToSubmit(
  actor: AuthUserLike,
  caseId: number,
  patch: Partial<IntentionToSubmitFormData>,
): Promise<{ record: ModuleFormRecord; formData: IntentionToSubmitFormData }> {
  return updateModule('intention_to_submit', actor, caseId, patch);
}

export async function submitIntentionToSubmit(actor: AuthUserLike, caseId: number): Promise<ModuleFormRecord> {
  return submitModule('intention_to_submit', actor, caseId);
}

export async function reviewIntentionToSubmitBySupervisor(
  actor: AuthUserLike,
  caseId: number,
  decision: ModuleReviewDecision,
): Promise<ModuleFormRecord> {
  return reviewModule('intention_to_submit', actor, caseId, decision, 'review_supervisor');
}

export async function reviewIntentionToSubmitByDept(
  actor: AuthUserLike,
  caseId: number,
  decision: ModuleReviewDecision,
): Promise<ModuleFormRecord> {
  return reviewModule('intention_to_submit', actor, caseId, decision, 'review_dept');
}

export async function printIntentionToSubmit(actor: AuthUserLike, caseId: number): Promise<{ pdfPath: string }> {
  return printModule('intention_to_submit', actor, caseId);
}

export async function getOrCreateAppointExaminers(actor: AuthUserLike, caseId: number): Promise<{ record: ModuleFormRecord; formData: AppointExaminersFormData }> {
  return getOrCreateModule('appoint_examiners', actor, caseId);
}

export async function updateAppointExaminers(
  actor: AuthUserLike,
  caseId: number,
  patch: Partial<AppointExaminersFormData>,
): Promise<{ record: ModuleFormRecord; formData: AppointExaminersFormData }> {
  return updateModule('appoint_examiners', actor, caseId, patch);
}

export async function submitAppointExaminers(actor: AuthUserLike, caseId: number): Promise<ModuleFormRecord> {
  return submitModule('appoint_examiners', actor, caseId);
}

export async function reviewAppointExaminersByDept(actor: AuthUserLike, caseId: number, decision: ModuleReviewDecision): Promise<ModuleFormRecord> {
  return reviewModule('appoint_examiners', actor, caseId, decision, 'review_dept');
}

export async function reviewAppointExaminersByChairperson(actor: AuthUserLike, caseId: number, decision: ModuleReviewDecision): Promise<ModuleFormRecord> {
  return reviewModule('appoint_examiners', actor, caseId, decision, 'review_chairperson');
}

export async function reviewAppointExaminersByFaculty(actor: AuthUserLike, caseId: number, decision: ModuleReviewDecision): Promise<ModuleFormRecord> {
  return reviewModule('appoint_examiners', actor, caseId, decision, 'review_faculty');
}

export async function printAppointExaminers(actor: AuthUserLike, caseId: number): Promise<{ pdfPath: string }> {
  return printModule('appoint_examiners', actor, caseId);
}

export async function getOrCreateChangeExaminers(actor: AuthUserLike, caseId: number): Promise<{ record: ModuleFormRecord; formData: ChangeExaminersFormData }> {
  return getOrCreateModule('change_examiners', actor, caseId);
}

export async function updateChangeExaminers(
  actor: AuthUserLike,
  caseId: number,
  patch: Partial<ChangeExaminersFormData>,
): Promise<{ record: ModuleFormRecord; formData: ChangeExaminersFormData }> {
  return updateModule('change_examiners', actor, caseId, patch);
}

export async function submitChangeExaminers(actor: AuthUserLike, caseId: number): Promise<ModuleFormRecord> {
  return submitModule('change_examiners', actor, caseId);
}

export async function reviewChangeExaminersByDept(actor: AuthUserLike, caseId: number, decision: ModuleReviewDecision): Promise<ModuleFormRecord> {
  return reviewModule('change_examiners', actor, caseId, decision, 'review_dept');
}

export async function reviewChangeExaminersByChairperson(actor: AuthUserLike, caseId: number, decision: ModuleReviewDecision): Promise<ModuleFormRecord> {
  return reviewModule('change_examiners', actor, caseId, decision, 'review_chairperson');
}

export async function reviewChangeExaminersByFaculty(actor: AuthUserLike, caseId: number, decision: ModuleReviewDecision): Promise<ModuleFormRecord> {
  return reviewModule('change_examiners', actor, caseId, decision, 'review_faculty');
}

export async function printChangeExaminers(actor: AuthUserLike, caseId: number): Promise<{ pdfPath: string }> {
  return printModule('change_examiners', actor, caseId);
}

export async function getOrCreateExaminerSummaryCv(actor: AuthUserLike, caseId: number): Promise<{ record: ModuleFormRecord; formData: ExaminerSummaryCvFormData }> {
  return getOrCreateModule('examiner_summary_cv', actor, caseId);
}

export async function updateExaminerSummaryCv(
  actor: AuthUserLike,
  caseId: number,
  patch: Partial<ExaminerSummaryCvFormData>,
): Promise<{ record: ModuleFormRecord; formData: ExaminerSummaryCvFormData }> {
  return updateModule('examiner_summary_cv', actor, caseId, patch);
}

export async function submitExaminerSummaryCv(actor: AuthUserLike, caseId: number): Promise<ModuleFormRecord> {
  return submitModule('examiner_summary_cv', actor, caseId);
}

export async function reviewExaminerSummaryCvByDept(actor: AuthUserLike, caseId: number, decision: ModuleReviewDecision): Promise<ModuleFormRecord> {
  return reviewModule('examiner_summary_cv', actor, caseId, decision, 'review_dept');
}

export async function reviewExaminerSummaryCvByFaculty(actor: AuthUserLike, caseId: number, decision: ModuleReviewDecision): Promise<ModuleFormRecord> {
  return reviewModule('examiner_summary_cv', actor, caseId, decision, 'review_faculty');
}

export async function printExaminerSummaryCv(actor: AuthUserLike, caseId: number): Promise<{ pdfPath: string }> {
  return printModule('examiner_summary_cv', actor, caseId);
}

export async function getOrCreateAppointArbiter(actor: AuthUserLike, caseId: number): Promise<{ record: ModuleFormRecord; formData: AppointArbiterFormData }> {
  return getOrCreateModule('appoint_arbiter', actor, caseId);
}

export async function updateAppointArbiter(
  actor: AuthUserLike,
  caseId: number,
  patch: Partial<AppointArbiterFormData>,
): Promise<{ record: ModuleFormRecord; formData: AppointArbiterFormData }> {
  return updateModule('appoint_arbiter', actor, caseId, patch);
}

export async function submitAppointArbiter(actor: AuthUserLike, caseId: number): Promise<ModuleFormRecord> {
  return submitModule('appoint_arbiter', actor, caseId);
}

export async function reviewAppointArbiterByDept(actor: AuthUserLike, caseId: number, decision: ModuleReviewDecision): Promise<ModuleFormRecord> {
  return reviewModule('appoint_arbiter', actor, caseId, decision, 'review_dept');
}

export async function reviewAppointArbiterByFaculty(actor: AuthUserLike, caseId: number, decision: ModuleReviewDecision): Promise<ModuleFormRecord> {
  return reviewModule('appoint_arbiter', actor, caseId, decision, 'review_faculty');
}

export async function printAppointArbiter(actor: AuthUserLike, caseId: number): Promise<{ pdfPath: string }> {
  return printModule('appoint_arbiter', actor, caseId);
}
