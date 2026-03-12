import {
  isAdministrativeRole,
  isDeptHdRepRole,
  isFacultyHdRepRole,
  isLegacyAdminRole,
  isSystemAdminRole,
} from '../../auth/roleService';
import type { Role } from '../../auth/tokenService';
import {
  getOrCreateModuleRecord,
  parseJsonObject,
  printModulePdf,
  reviewModuleRecord,
  submitModuleRecord,
  updateModuleRecord,
  type ModuleReviewDecision,
  type ModuleLifecycleConfig,
} from './moduleLifecycleEngine';
import { getCaseById } from '../rottCaseService';
import type { FormData, ModuleFormRecord } from '../contracts/titleRegistration';

export interface ProgressReportFormData {
  'Student Full Name': string;
  'Student Number': string;
  Department: string;
  Degree: string;
  Supervisor: string;
  'Co-supervisor(s)': string;
  'Thesis title': string;
  'Reporting period': string;
  'Research progress summary': string;
  Challenges: string;
  'Publication output': string;
  'Ethics compliance status': string;
  'Support required': string;
  'Student declaration': string;
  'Supervisor comment': string;
}

export interface LeaveOfAbsenceFormData {
  'Student Full Name': string;
  'Student Number': string;
  Department: string;
  Degree: string;
  Supervisor: string;
  'Co-supervisor(s)': string;
  'Thesis title': string;
  'Leave start date': string;
  'Leave end date': string;
  'Reason for leave': string;
  'Support plan during leave': string;
  'Student declaration': string;
  'Supervisor recommendation': string;
}

export interface ReadmissionRequestFormData {
  'Student Full Name': string;
  'Student Number': string;
  Department: string;
  Degree: string;
  Supervisor: string;
  'Thesis title': string;
  'Previous leave period': string;
  'Requested readmission date': string;
  'Reason for readmission': string;
  'Academic recovery plan': string;
  'Student declaration': string;
  'Supervisor recommendation': string;
}

export interface UpgradeMscToPhdFormData {
  'Student Full Name': string;
  'Student Number': string;
  Department: string;
  'Current Degree': string;
  'Requested Upgrade Degree': string;
  'Current Thesis title': string;
  'Initial thesis title for upgrade from Masters to Doctoral': string;
  'Upgrade motivation': string;
  'Research progress evidence': string;
  'Student declaration': string;
  'Supervisor recommendation': string;
}

export interface SupervisorSummativeReportFormData {
  'Student Full Name': string;
  'Student Number': string;
  Department: string;
  Degree: string;
  Supervisor: string;
  'Thesis title': string;
  'Summative period': string;
  'Overall progress summary': string;
  'Submission readiness assessment': string;
  'Examiner outcomes summary': string;
  'Supervisor recommendation': string;
}

export interface OtherRequestFormData {
  'Student Full Name': string;
  'Student Number': string;
  Department: string;
  Degree: string;
  'Thesis title': string;
  'Request category': string;
  'Request details': string;
  'Requested effective date': string;
  'Impact statement': string;
  'Student declaration': string;
  'Supervisor comment': string;
}

interface AuthUserLike {
  id: number;
  role: Role;
  sasiId: string;
  firstName: string;
  lastName: string;
}

function requiredCompletionPercent<T extends object>(data: T, required: Array<keyof T>): number {
  const completed = required.filter((key) => {
    const value = data[key];
    return typeof value === 'string' && value.trim().length > 0;
  }).length;
  return Math.round((completed / required.length) * 100);
}

function resolveStudentFullName(formData: FormData): string {
  return `${formData['Student First-Name'] ?? ''} ${formData['Student Surname'] ?? ''}`.replace(/\s+/g, ' ').trim();
}

function resolveCoSupervisors(formData: FormData): string {
  if ((formData['Has Co-supervisor?'] ?? 'No') !== 'Yes') return 'None';
  const names: string[] = [];
  if ((formData['Co-supervisor'] ?? '').trim() && formData['Co-supervisor'] !== 'NA') names.push(formData['Co-supervisor'].trim());
  if ((formData['Second Co-supervisor'] ?? '').trim() && formData['Second Co-supervisor'] !== 'NA') names.push(formData['Second Co-supervisor'].trim());
  return names.length ? names.join('; ') : 'Not specified';
}

function defaultProgressReportFromRott(formData: FormData): ProgressReportFormData {
  return {
    'Student Full Name': resolveStudentFullName(formData),
    'Student Number': formData['Student Number'] ?? '',
    Department: formData.Department ?? '',
    Degree: formData.Degree ?? '',
    Supervisor: formData.Supervisor ?? '',
    'Co-supervisor(s)': resolveCoSupervisors(formData),
    'Thesis title': formData['Thesis title'] ?? '',
    'Reporting period': '',
    'Research progress summary': '',
    Challenges: '',
    'Publication output': '',
    'Ethics compliance status': '',
    'Support required': '',
    'Student declaration': 'I confirm this progress report is accurate and complete.',
    'Supervisor comment': '',
  };
}

function progressReportCompletion(formData: ProgressReportFormData): number {
  return requiredCompletionPercent(formData, [
    'Student Full Name',
    'Student Number',
    'Department',
    'Degree',
    'Supervisor',
    'Thesis title',
    'Reporting period',
    'Research progress summary',
    'Ethics compliance status',
    'Student declaration',
  ]);
}

const PROGRESS_REPORT_CONFIG: ModuleLifecycleConfig<ProgressReportFormData, 'progress_report_forms', 'progress_report'> = {
  table: 'progress_report_forms',
  moduleName: 'progress_report',
  title: 'PROGRESS REPORT',
  completionCalculator: progressReportCompletion,
};

const LEAVE_OF_ABSENCE_CONFIG: ModuleLifecycleConfig<LeaveOfAbsenceFormData, 'leave_of_absence_forms', 'leave_of_absence'> = {
  table: 'leave_of_absence_forms',
  moduleName: 'leave_of_absence',
  title: 'LEAVE OF ABSENCE',
  completionCalculator: leaveOfAbsenceCompletion,
};

const READMISSION_REQUEST_CONFIG: ModuleLifecycleConfig<ReadmissionRequestFormData, 'readmission_request_forms', 'readmission_request'> = {
  table: 'readmission_request_forms',
  moduleName: 'readmission_request',
  title: 'REQUEST FOR READMISSION',
  completionCalculator: readmissionRequestCompletion,
};

const UPGRADE_MSC_TO_PHD_CONFIG: ModuleLifecycleConfig<UpgradeMscToPhdFormData, 'upgrade_msc_to_phd_forms', 'upgrade_msc_to_phd'> = {
  table: 'upgrade_msc_to_phd_forms',
  moduleName: 'upgrade_msc_to_phd',
  title: 'REQUEST TO UPGRADE FROM MASTERS TO DOCTORAL',
  completionCalculator: upgradeMscToPhdCompletion,
};

const SUPERVISOR_SUMMATIVE_REPORT_CONFIG: ModuleLifecycleConfig<SupervisorSummativeReportFormData, 'supervisor_summative_report_forms', 'supervisor_summative_report'> = {
  table: 'supervisor_summative_report_forms',
  moduleName: 'supervisor_summative_report',
  title: 'SUPERVISOR SUMMATIVE REPORT',
  completionCalculator: supervisorSummativeReportCompletion,
};

const OTHER_REQUEST_CONFIG: ModuleLifecycleConfig<OtherRequestFormData, 'other_request_forms', 'other_request'> = {
  table: 'other_request_forms',
  moduleName: 'other_request',
  title: 'OTHER REQUEST',
  completionCalculator: otherRequestCompletion,
};

function assertActorRoleForAction(
  actor: AuthUserLike,
  action: 'read' | 'edit_submit' | 'review_dept' | 'review_faculty' | 'print',
  editRoles: Role[] = ['student'],
): void {
  const isAdmin = isAdministrativeRole(actor.role) || isSystemAdminRole(actor.role) || isLegacyAdminRole(actor.role);
  if (action === 'read' || action === 'print') return;
  if (action === 'edit_submit' && editRoles.includes(actor.role)) return;
  if (action === 'review_dept' && isDeptHdRepRole(actor.role)) return;
  if (action === 'review_faculty' && isFacultyHdRepRole(actor.role)) return;
  if ((action === 'review_dept' || action === 'review_faculty') && isAdmin) return;
  throw new Error('Actor is not authorized for this progression module action.');
}

function defaultLeaveOfAbsenceFromRott(formData: FormData): LeaveOfAbsenceFormData {
  return {
    'Student Full Name': resolveStudentFullName(formData),
    'Student Number': formData['Student Number'] ?? '',
    Department: formData.Department ?? '',
    Degree: formData.Degree ?? '',
    Supervisor: formData.Supervisor ?? '',
    'Co-supervisor(s)': resolveCoSupervisors(formData),
    'Thesis title': formData['Thesis title'] ?? '',
    'Leave start date': '',
    'Leave end date': '',
    'Reason for leave': '',
    'Support plan during leave': '',
    'Student declaration': 'I confirm this leave request is accurate and submitted in good faith.',
    'Supervisor recommendation': '',
  };
}

function leaveOfAbsenceCompletion(formData: LeaveOfAbsenceFormData): number {
  return requiredCompletionPercent(formData, [
    'Student Full Name',
    'Student Number',
    'Department',
    'Degree',
    'Thesis title',
    'Leave start date',
    'Leave end date',
    'Reason for leave',
    'Student declaration',
  ]);
}

function defaultReadmissionRequestFromRott(formData: FormData): ReadmissionRequestFormData {
  return {
    'Student Full Name': resolveStudentFullName(formData),
    'Student Number': formData['Student Number'] ?? '',
    Department: formData.Department ?? '',
    Degree: formData.Degree ?? '',
    Supervisor: formData.Supervisor ?? '',
    'Thesis title': formData['Thesis title'] ?? '',
    'Previous leave period': '',
    'Requested readmission date': '',
    'Reason for readmission': '',
    'Academic recovery plan': '',
    'Student declaration': 'I confirm the information provided for readmission is accurate.',
    'Supervisor recommendation': '',
  };
}

function readmissionRequestCompletion(formData: ReadmissionRequestFormData): number {
  return requiredCompletionPercent(formData, [
    'Student Full Name',
    'Student Number',
    'Department',
    'Degree',
    'Thesis title',
    'Requested readmission date',
    'Reason for readmission',
    'Academic recovery plan',
    'Student declaration',
  ]);
}

function defaultUpgradeMscToPhdFromRott(formData: FormData): UpgradeMscToPhdFormData {
  return {
    'Student Full Name': resolveStudentFullName(formData),
    'Student Number': formData['Student Number'] ?? '',
    Department: formData.Department ?? '',
    'Current Degree': formData.Degree ?? '',
    'Requested Upgrade Degree': 'PhD',
    'Current Thesis title': formData['Thesis title'] ?? '',
    'Initial thesis title for upgrade from Masters to Doctoral': formData['Initial thesis title for upgrade from Masters to Doctoral'] ?? '',
    'Upgrade motivation': '',
    'Research progress evidence': '',
    'Student declaration': 'I confirm this upgrade request is accurate and complete.',
    'Supervisor recommendation': '',
  };
}

function upgradeMscToPhdCompletion(formData: UpgradeMscToPhdFormData): number {
  return requiredCompletionPercent(formData, [
    'Student Full Name',
    'Student Number',
    'Department',
    'Current Degree',
    'Requested Upgrade Degree',
    'Current Thesis title',
    'Upgrade motivation',
    'Research progress evidence',
    'Student declaration',
  ]);
}

function defaultSupervisorSummativeReportFromRott(formData: FormData): SupervisorSummativeReportFormData {
  return {
    'Student Full Name': resolveStudentFullName(formData),
    'Student Number': formData['Student Number'] ?? '',
    Department: formData.Department ?? '',
    Degree: formData.Degree ?? '',
    Supervisor: formData.Supervisor ?? '',
    'Thesis title': formData['Thesis title'] ?? '',
    'Summative period': '',
    'Overall progress summary': '',
    'Submission readiness assessment': '',
    'Examiner outcomes summary': '',
    'Supervisor recommendation': '',
  };
}

function supervisorSummativeReportCompletion(formData: SupervisorSummativeReportFormData): number {
  return requiredCompletionPercent(formData, [
    'Student Full Name',
    'Student Number',
    'Department',
    'Degree',
    'Supervisor',
    'Thesis title',
    'Summative period',
    'Overall progress summary',
    'Submission readiness assessment',
    'Supervisor recommendation',
  ]);
}

function defaultOtherRequestFromRott(formData: FormData): OtherRequestFormData {
  return {
    'Student Full Name': resolveStudentFullName(formData),
    'Student Number': formData['Student Number'] ?? '',
    Department: formData.Department ?? '',
    Degree: formData.Degree ?? '',
    'Thesis title': formData['Thesis title'] ?? '',
    'Request category': '',
    'Request details': '',
    'Requested effective date': '',
    'Impact statement': '',
    'Student declaration': 'I confirm this request is accurate and complete.',
    'Supervisor comment': '',
  };
}

function otherRequestCompletion(formData: OtherRequestFormData): number {
  return requiredCompletionPercent(formData, [
    'Student Full Name',
    'Student Number',
    'Department',
    'Degree',
    'Thesis title',
    'Request category',
    'Request details',
    'Student declaration',
  ]);
}

async function getOrCreateProgressReport(caseId: number): Promise<{ record: ModuleFormRecord; formData: ProgressReportFormData }> {
  const { formData } = await getCaseById(caseId);
  return getOrCreateModuleRecord(caseId, PROGRESS_REPORT_CONFIG, defaultProgressReportFromRott(formData));
}

export async function getProgressReport(
  actor: AuthUserLike,
  caseId: number,
): Promise<{ record: ModuleFormRecord; formData: ProgressReportFormData }> {
  assertActorRoleForAction(actor, 'read');
  return getOrCreateProgressReport(caseId);
}

export async function patchProgressReport(
  actor: AuthUserLike,
  caseId: number,
  patch: Partial<ProgressReportFormData>,
): Promise<{ record: ModuleFormRecord; formData: ProgressReportFormData }> {
  assertActorRoleForAction(actor, 'edit_submit');
  return updateModuleRecord(caseId, PROGRESS_REPORT_CONFIG, patch, getOrCreateProgressReport);
}

export async function submitProgressReport(actor: AuthUserLike, caseId: number): Promise<ModuleFormRecord> {
  assertActorRoleForAction(actor, 'edit_submit');
  return submitModuleRecord(caseId, PROGRESS_REPORT_CONFIG, getOrCreateProgressReport, 'awaiting_dept_review');
}

export async function reviewProgressReportByDept(
  actor: AuthUserLike,
  caseId: number,
  decision: ModuleReviewDecision,
): Promise<ModuleFormRecord> {
  assertActorRoleForAction(actor, 'review_dept');
  return reviewModuleRecord(caseId, PROGRESS_REPORT_CONFIG, decision, {
    fromStatus: 'awaiting_dept_review',
    approvedStatus: 'awaiting_faculty_review',
    returnedStatus: 'returned_by_dept',
  });
}

export async function reviewProgressReportByFaculty(
  actor: AuthUserLike,
  caseId: number,
  decision: ModuleReviewDecision,
): Promise<ModuleFormRecord> {
  assertActorRoleForAction(actor, 'review_faculty');
  return reviewModuleRecord(caseId, PROGRESS_REPORT_CONFIG, decision, {
    fromStatus: 'awaiting_faculty_review',
    approvedStatus: 'approved',
    returnedStatus: 'returned_by_faculty',
  });
}

export async function printProgressReport(actor: AuthUserLike, caseId: number): Promise<{ pdfPath: string }> {
  assertActorRoleForAction(actor, 'print');
  const { formData } = await getCaseById(caseId);
  return printModulePdf(caseId, PROGRESS_REPORT_CONFIG, formData['Student Number']);
}

export function parseProgressReport(rawJson: string): ProgressReportFormData {
  return parseJsonObject<ProgressReportFormData>(rawJson);
}

async function getOrCreateLeaveOfAbsence(caseId: number): Promise<{ record: ModuleFormRecord; formData: LeaveOfAbsenceFormData }> {
  const { formData } = await getCaseById(caseId);
  return getOrCreateModuleRecord(caseId, LEAVE_OF_ABSENCE_CONFIG, defaultLeaveOfAbsenceFromRott(formData));
}

export async function getLeaveOfAbsence(
  actor: AuthUserLike,
  caseId: number,
): Promise<{ record: ModuleFormRecord; formData: LeaveOfAbsenceFormData }> {
  assertActorRoleForAction(actor, 'read');
  return getOrCreateLeaveOfAbsence(caseId);
}

export async function patchLeaveOfAbsence(
  actor: AuthUserLike,
  caseId: number,
  patch: Partial<LeaveOfAbsenceFormData>,
): Promise<{ record: ModuleFormRecord; formData: LeaveOfAbsenceFormData }> {
  assertActorRoleForAction(actor, 'edit_submit');
  return updateModuleRecord(caseId, LEAVE_OF_ABSENCE_CONFIG, patch, getOrCreateLeaveOfAbsence);
}

export async function submitLeaveOfAbsence(actor: AuthUserLike, caseId: number): Promise<ModuleFormRecord> {
  assertActorRoleForAction(actor, 'edit_submit');
  return submitModuleRecord(caseId, LEAVE_OF_ABSENCE_CONFIG, getOrCreateLeaveOfAbsence, 'awaiting_dept_review');
}

export async function reviewLeaveOfAbsenceByDept(
  actor: AuthUserLike,
  caseId: number,
  decision: ModuleReviewDecision,
): Promise<ModuleFormRecord> {
  assertActorRoleForAction(actor, 'review_dept');
  return reviewModuleRecord(caseId, LEAVE_OF_ABSENCE_CONFIG, decision, {
    fromStatus: 'awaiting_dept_review',
    approvedStatus: 'awaiting_faculty_review',
    returnedStatus: 'returned_by_dept',
  });
}

export async function reviewLeaveOfAbsenceByFaculty(
  actor: AuthUserLike,
  caseId: number,
  decision: ModuleReviewDecision,
): Promise<ModuleFormRecord> {
  assertActorRoleForAction(actor, 'review_faculty');
  return reviewModuleRecord(caseId, LEAVE_OF_ABSENCE_CONFIG, decision, {
    fromStatus: 'awaiting_faculty_review',
    approvedStatus: 'approved',
    returnedStatus: 'returned_by_faculty',
  });
}

export async function printLeaveOfAbsence(actor: AuthUserLike, caseId: number): Promise<{ pdfPath: string }> {
  assertActorRoleForAction(actor, 'print');
  const { formData } = await getCaseById(caseId);
  return printModulePdf(caseId, LEAVE_OF_ABSENCE_CONFIG, formData['Student Number']);
}

export function parseLeaveOfAbsence(rawJson: string): LeaveOfAbsenceFormData {
  return parseJsonObject<LeaveOfAbsenceFormData>(rawJson);
}

async function getOrCreateReadmissionRequest(caseId: number): Promise<{ record: ModuleFormRecord; formData: ReadmissionRequestFormData }> {
  const { formData } = await getCaseById(caseId);
  return getOrCreateModuleRecord(caseId, READMISSION_REQUEST_CONFIG, defaultReadmissionRequestFromRott(formData));
}

export async function getReadmissionRequest(
  actor: AuthUserLike,
  caseId: number,
): Promise<{ record: ModuleFormRecord; formData: ReadmissionRequestFormData }> {
  assertActorRoleForAction(actor, 'read');
  return getOrCreateReadmissionRequest(caseId);
}

export async function patchReadmissionRequest(
  actor: AuthUserLike,
  caseId: number,
  patch: Partial<ReadmissionRequestFormData>,
): Promise<{ record: ModuleFormRecord; formData: ReadmissionRequestFormData }> {
  assertActorRoleForAction(actor, 'edit_submit');
  return updateModuleRecord(caseId, READMISSION_REQUEST_CONFIG, patch, getOrCreateReadmissionRequest);
}

export async function submitReadmissionRequest(actor: AuthUserLike, caseId: number): Promise<ModuleFormRecord> {
  assertActorRoleForAction(actor, 'edit_submit');
  return submitModuleRecord(caseId, READMISSION_REQUEST_CONFIG, getOrCreateReadmissionRequest, 'awaiting_dept_review');
}

export async function reviewReadmissionRequestByDept(
  actor: AuthUserLike,
  caseId: number,
  decision: ModuleReviewDecision,
): Promise<ModuleFormRecord> {
  assertActorRoleForAction(actor, 'review_dept');
  return reviewModuleRecord(caseId, READMISSION_REQUEST_CONFIG, decision, {
    fromStatus: 'awaiting_dept_review',
    approvedStatus: 'awaiting_faculty_review',
    returnedStatus: 'returned_by_dept',
  });
}

export async function reviewReadmissionRequestByFaculty(
  actor: AuthUserLike,
  caseId: number,
  decision: ModuleReviewDecision,
): Promise<ModuleFormRecord> {
  assertActorRoleForAction(actor, 'review_faculty');
  return reviewModuleRecord(caseId, READMISSION_REQUEST_CONFIG, decision, {
    fromStatus: 'awaiting_faculty_review',
    approvedStatus: 'approved',
    returnedStatus: 'returned_by_faculty',
  });
}

export async function printReadmissionRequest(actor: AuthUserLike, caseId: number): Promise<{ pdfPath: string }> {
  assertActorRoleForAction(actor, 'print');
  const { formData } = await getCaseById(caseId);
  return printModulePdf(caseId, READMISSION_REQUEST_CONFIG, formData['Student Number']);
}

export function parseReadmissionRequest(rawJson: string): ReadmissionRequestFormData {
  return parseJsonObject<ReadmissionRequestFormData>(rawJson);
}

async function getOrCreateUpgradeMscToPhd(caseId: number): Promise<{ record: ModuleFormRecord; formData: UpgradeMscToPhdFormData }> {
  const { formData } = await getCaseById(caseId);
  return getOrCreateModuleRecord(caseId, UPGRADE_MSC_TO_PHD_CONFIG, defaultUpgradeMscToPhdFromRott(formData));
}

export async function getUpgradeMscToPhd(
  actor: AuthUserLike,
  caseId: number,
): Promise<{ record: ModuleFormRecord; formData: UpgradeMscToPhdFormData }> {
  assertActorRoleForAction(actor, 'read');
  return getOrCreateUpgradeMscToPhd(caseId);
}

export async function patchUpgradeMscToPhd(
  actor: AuthUserLike,
  caseId: number,
  patch: Partial<UpgradeMscToPhdFormData>,
): Promise<{ record: ModuleFormRecord; formData: UpgradeMscToPhdFormData }> {
  assertActorRoleForAction(actor, 'edit_submit');
  return updateModuleRecord(caseId, UPGRADE_MSC_TO_PHD_CONFIG, patch, getOrCreateUpgradeMscToPhd);
}

export async function submitUpgradeMscToPhd(actor: AuthUserLike, caseId: number): Promise<ModuleFormRecord> {
  assertActorRoleForAction(actor, 'edit_submit');
  return submitModuleRecord(caseId, UPGRADE_MSC_TO_PHD_CONFIG, getOrCreateUpgradeMscToPhd, 'awaiting_dept_review');
}

export async function reviewUpgradeMscToPhdByDept(
  actor: AuthUserLike,
  caseId: number,
  decision: ModuleReviewDecision,
): Promise<ModuleFormRecord> {
  assertActorRoleForAction(actor, 'review_dept');
  return reviewModuleRecord(caseId, UPGRADE_MSC_TO_PHD_CONFIG, decision, {
    fromStatus: 'awaiting_dept_review',
    approvedStatus: 'awaiting_faculty_review',
    returnedStatus: 'returned_by_dept',
  });
}

export async function reviewUpgradeMscToPhdByFaculty(
  actor: AuthUserLike,
  caseId: number,
  decision: ModuleReviewDecision,
): Promise<ModuleFormRecord> {
  assertActorRoleForAction(actor, 'review_faculty');
  return reviewModuleRecord(caseId, UPGRADE_MSC_TO_PHD_CONFIG, decision, {
    fromStatus: 'awaiting_faculty_review',
    approvedStatus: 'approved',
    returnedStatus: 'returned_by_faculty',
  });
}

export async function printUpgradeMscToPhd(actor: AuthUserLike, caseId: number): Promise<{ pdfPath: string }> {
  assertActorRoleForAction(actor, 'print');
  const { formData } = await getCaseById(caseId);
  return printModulePdf(caseId, UPGRADE_MSC_TO_PHD_CONFIG, formData['Student Number']);
}

export function parseUpgradeMscToPhd(rawJson: string): UpgradeMscToPhdFormData {
  return parseJsonObject<UpgradeMscToPhdFormData>(rawJson);
}

async function getOrCreateSupervisorSummativeReport(caseId: number): Promise<{ record: ModuleFormRecord; formData: SupervisorSummativeReportFormData }> {
  const { formData } = await getCaseById(caseId);
  return getOrCreateModuleRecord(caseId, SUPERVISOR_SUMMATIVE_REPORT_CONFIG, defaultSupervisorSummativeReportFromRott(formData));
}

export async function getSupervisorSummativeReport(
  actor: AuthUserLike,
  caseId: number,
): Promise<{ record: ModuleFormRecord; formData: SupervisorSummativeReportFormData }> {
  assertActorRoleForAction(actor, 'read');
  return getOrCreateSupervisorSummativeReport(caseId);
}

export async function patchSupervisorSummativeReport(
  actor: AuthUserLike,
  caseId: number,
  patch: Partial<SupervisorSummativeReportFormData>,
): Promise<{ record: ModuleFormRecord; formData: SupervisorSummativeReportFormData }> {
  assertActorRoleForAction(actor, 'edit_submit', ['supervisor']);
  return updateModuleRecord(caseId, SUPERVISOR_SUMMATIVE_REPORT_CONFIG, patch, getOrCreateSupervisorSummativeReport);
}

export async function submitSupervisorSummativeReport(actor: AuthUserLike, caseId: number): Promise<ModuleFormRecord> {
  assertActorRoleForAction(actor, 'edit_submit', ['supervisor']);
  return submitModuleRecord(caseId, SUPERVISOR_SUMMATIVE_REPORT_CONFIG, getOrCreateSupervisorSummativeReport, 'awaiting_dept_review');
}

export async function reviewSupervisorSummativeReportByDept(
  actor: AuthUserLike,
  caseId: number,
  decision: ModuleReviewDecision,
): Promise<ModuleFormRecord> {
  assertActorRoleForAction(actor, 'review_dept');
  return reviewModuleRecord(caseId, SUPERVISOR_SUMMATIVE_REPORT_CONFIG, decision, {
    fromStatus: 'awaiting_dept_review',
    approvedStatus: 'awaiting_faculty_review',
    returnedStatus: 'returned_by_dept',
  });
}

export async function reviewSupervisorSummativeReportByFaculty(
  actor: AuthUserLike,
  caseId: number,
  decision: ModuleReviewDecision,
): Promise<ModuleFormRecord> {
  assertActorRoleForAction(actor, 'review_faculty');
  return reviewModuleRecord(caseId, SUPERVISOR_SUMMATIVE_REPORT_CONFIG, decision, {
    fromStatus: 'awaiting_faculty_review',
    approvedStatus: 'approved',
    returnedStatus: 'returned_by_faculty',
  });
}

export async function printSupervisorSummativeReport(actor: AuthUserLike, caseId: number): Promise<{ pdfPath: string }> {
  assertActorRoleForAction(actor, 'print');
  const { formData } = await getCaseById(caseId);
  return printModulePdf(caseId, SUPERVISOR_SUMMATIVE_REPORT_CONFIG, formData['Student Number']);
}

export function parseSupervisorSummativeReport(rawJson: string): SupervisorSummativeReportFormData {
  return parseJsonObject<SupervisorSummativeReportFormData>(rawJson);
}

async function getOrCreateOtherRequest(caseId: number): Promise<{ record: ModuleFormRecord; formData: OtherRequestFormData }> {
  const { formData } = await getCaseById(caseId);
  return getOrCreateModuleRecord(caseId, OTHER_REQUEST_CONFIG, defaultOtherRequestFromRott(formData));
}

export async function getOtherRequest(
  actor: AuthUserLike,
  caseId: number,
): Promise<{ record: ModuleFormRecord; formData: OtherRequestFormData }> {
  assertActorRoleForAction(actor, 'read');
  return getOrCreateOtherRequest(caseId);
}

export async function patchOtherRequest(
  actor: AuthUserLike,
  caseId: number,
  patch: Partial<OtherRequestFormData>,
): Promise<{ record: ModuleFormRecord; formData: OtherRequestFormData }> {
  assertActorRoleForAction(actor, 'edit_submit');
  return updateModuleRecord(caseId, OTHER_REQUEST_CONFIG, patch, getOrCreateOtherRequest);
}

export async function submitOtherRequest(actor: AuthUserLike, caseId: number): Promise<ModuleFormRecord> {
  assertActorRoleForAction(actor, 'edit_submit');
  return submitModuleRecord(caseId, OTHER_REQUEST_CONFIG, getOrCreateOtherRequest, 'awaiting_dept_review');
}

export async function reviewOtherRequestByDept(
  actor: AuthUserLike,
  caseId: number,
  decision: ModuleReviewDecision,
): Promise<ModuleFormRecord> {
  assertActorRoleForAction(actor, 'review_dept');
  return reviewModuleRecord(caseId, OTHER_REQUEST_CONFIG, decision, {
    fromStatus: 'awaiting_dept_review',
    approvedStatus: 'awaiting_faculty_review',
    returnedStatus: 'returned_by_dept',
  });
}

export async function reviewOtherRequestByFaculty(
  actor: AuthUserLike,
  caseId: number,
  decision: ModuleReviewDecision,
): Promise<ModuleFormRecord> {
  assertActorRoleForAction(actor, 'review_faculty');
  return reviewModuleRecord(caseId, OTHER_REQUEST_CONFIG, decision, {
    fromStatus: 'awaiting_faculty_review',
    approvedStatus: 'approved',
    returnedStatus: 'returned_by_faculty',
  });
}

export async function printOtherRequest(actor: AuthUserLike, caseId: number): Promise<{ pdfPath: string }> {
  assertActorRoleForAction(actor, 'print');
  const { formData } = await getCaseById(caseId);
  return printModulePdf(caseId, OTHER_REQUEST_CONFIG, formData['Student Number']);
}

export function parseOtherRequest(rawJson: string): OtherRequestFormData {
  return parseJsonObject<OtherRequestFormData>(rawJson);
}
