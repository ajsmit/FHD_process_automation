import db from '../../db/knex';
import { getCaseById } from '../titleRegistrationWorkflowService';
import type {
  AppointArbiterFormData,
  AppointExaminersFormData,
  ChangeExaminersFormData,
  ExaminerSummaryCvFormData,
  FormData,
  IntentionToSubmitFormData,
  ModuleFormRecord,
} from '../contracts/titleRegistration';

type FormTableName =
  | 'intention_to_submit_forms'
  | 'appoint_examiners_forms'
  | 'change_examiners_forms'
  | 'examiner_summary_cv_forms'
  | 'appoint_arbiter_forms';

function parseJsonObject<T>(raw: string): T {
  return JSON.parse(raw) as T;
}

function sanitiseText(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

function boolFrom(value: unknown): boolean {
  return value === true;
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
  const names = [co1, co2]
    .map((value) => value.trim())
    .filter((value) => value && value.toUpperCase() !== 'NA');

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

async function upsertModuleEntry(caseId: number, moduleName: string, status: string, summary: string): Promise<void> {
  await db('module_entries')
    .insert({
      case_id: caseId,
      module_name: moduleName,
      status,
      summary,
      updated_at: db.fn.now(),
    })
    .onConflict(['case_id', 'module_name'])
    .merge({ status, summary, updated_at: db.fn.now() });
}

async function readModuleRecord(table: FormTableName, caseId: number): Promise<ModuleFormRecord | undefined> {
  const record = await db<ModuleFormRecord>(table).where({ case_id: caseId }).first();
  return record ?? undefined;
}

async function assertSubmitted(table: FormTableName, caseId: number, label: string): Promise<void> {
  const record = await readModuleRecord(table, caseId);
  if (!record || record.status !== 'submitted') {
    throw new Error(`${label} must be submitted before this module can start.`);
  }
}

async function ensureItsPrerequisite(caseId: number): Promise<void> {
  const { formData } = await getCaseById(caseId);
  if (formData['Has the MOU been submitted?'] !== 'Yes') {
    throw new Error('INTENTION_TO_SUBMIT can start only after MOU is submitted.');
  }
}

async function ensureAppointExaminersPrerequisite(caseId: number): Promise<void> {
  await assertSubmitted('intention_to_submit_forms', caseId, 'INTENTION_TO_SUBMIT');
}

async function ensureChangeExaminersPrerequisite(caseId: number): Promise<void> {
  await assertSubmitted('appoint_examiners_forms', caseId, 'APPOINT_EXAMINERS');
}

async function ensureSummaryPrerequisite(caseId: number): Promise<void> {
  const appoint = await readModuleRecord('appoint_examiners_forms', caseId);
  const change = await readModuleRecord('change_examiners_forms', caseId);
  if ((appoint?.status ?? '') !== 'submitted' && (change?.status ?? '') !== 'submitted') {
    throw new Error('EXAMINER_SUMMARY_CV can start only after APPOINT_EXAMINERS or CHANGE_EXAMINERS is submitted.');
  }
}

async function ensureArbiterPrerequisite(caseId: number): Promise<void> {
  const appoint = await readModuleRecord('appoint_examiners_forms', caseId);
  const change = await readModuleRecord('change_examiners_forms', caseId);
  if ((appoint?.status ?? '') !== 'submitted' && (change?.status ?? '') !== 'submitted') {
    throw new Error('APPOINT_ARBITER can start only after APPOINT_EXAMINERS or CHANGE_EXAMINERS is submitted.');
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

async function getOrCreateRecord<T extends object>(
  table: FormTableName,
  caseId: number,
  moduleName: string,
  prefill: T,
  completionCalculator: (data: T) => number,
): Promise<{ record: ModuleFormRecord; formData: T }> {
  let record = await db<ModuleFormRecord>(table).where({ case_id: caseId }).first();
  if (!record) {
    const completionPercent = completionCalculator(prefill);
    const [id] = await db(table).insert({
      case_id: caseId,
      form_data_json: JSON.stringify(prefill),
      completion_percent: completionPercent,
      status: 'draft',
    });
    record = await db<ModuleFormRecord>(table).where({ id }).first();
    if (!record) {
      throw new Error(`Failed to create ${moduleName} module record.`);
    }
  }

  const formData = parseJsonObject<T>(record.form_data_json);
  const summary = record.status === 'submitted'
    ? `${moduleName} submitted.`
    : `${moduleName} draft in progress (${record.completion_percent}%).`;
  const moduleStatus = record.status === 'submitted' ? 'approved' : 'in_progress';
  await upsertModuleEntry(caseId, moduleName, moduleStatus, summary);
  return { record, formData };
}

async function updateRecord<T extends object>(
  table: FormTableName,
  caseId: number,
  moduleName: string,
  patch: Partial<T>,
  getter: (id: number) => Promise<{ record: ModuleFormRecord; formData: T }>,
  completionCalculator: (data: T) => number,
): Promise<{ record: ModuleFormRecord; formData: T }> {
  const { record, formData } = await getter(caseId);
  if (record.status === 'submitted') {
    throw new Error(`${moduleName} is already submitted.`);
  }

  const merged = { ...formData, ...patch } as T;
  const completionPercent = completionCalculator(merged);
  await db(table).where({ id: record.id }).update({
    form_data_json: JSON.stringify(merged),
    completion_percent: completionPercent,
    updated_at: db.fn.now(),
  });

  const updated = await db<ModuleFormRecord>(table).where({ id: record.id }).first();
  if (!updated) {
    throw new Error(`Failed to update ${moduleName}.`);
  }

  await upsertModuleEntry(caseId, moduleName, 'in_progress', `${moduleName} draft in progress (${completionPercent}%).`);
  return { record: updated, formData: merged };
}

async function submitRecord<T extends object>(
  table: FormTableName,
  caseId: number,
  moduleName: string,
  getter: (id: number) => Promise<{ record: ModuleFormRecord; formData: T }>,
): Promise<ModuleFormRecord> {
  const { record } = await getter(caseId);
  if (record.completion_percent < 100) {
    throw new Error(`${moduleName} is incomplete. Save all required fields before submit.`);
  }

  await db(table).where({ id: record.id }).update({
    status: 'submitted',
    submitted_at: db.fn.now(),
    updated_at: db.fn.now(),
  });

  await upsertModuleEntry(caseId, moduleName, 'approved', `${moduleName} submitted and ready for downstream workflow.`);

  const updated = await db<ModuleFormRecord>(table).where({ id: record.id }).first();
  if (!updated) {
    throw new Error(`Failed to submit ${moduleName}.`);
  }

  return updated;
}

export async function getOrCreateIntentionToSubmit(caseId: number): Promise<{ record: ModuleFormRecord; formData: IntentionToSubmitFormData }> {
  await ensureItsPrerequisite(caseId);
  const { formData } = await getCaseById(caseId);
  return getOrCreateRecord('intention_to_submit_forms', caseId, 'intention_to_submit', defaultItsFromRott(formData), itsCompletion);
}

export async function updateIntentionToSubmit(
  caseId: number,
  patch: Partial<IntentionToSubmitFormData>,
): Promise<{ record: ModuleFormRecord; formData: IntentionToSubmitFormData }> {
  return updateRecord('intention_to_submit_forms', caseId, 'intention_to_submit', patch, getOrCreateIntentionToSubmit, itsCompletion);
}

export async function submitIntentionToSubmit(caseId: number): Promise<ModuleFormRecord> {
  return submitRecord('intention_to_submit_forms', caseId, 'intention_to_submit', getOrCreateIntentionToSubmit);
}

export async function getOrCreateAppointExaminers(caseId: number): Promise<{ record: ModuleFormRecord; formData: AppointExaminersFormData }> {
  await ensureAppointExaminersPrerequisite(caseId);
  const { formData } = await getCaseById(caseId);
  return getOrCreateRecord('appoint_examiners_forms', caseId, 'appoint_examiners', defaultAppointExaminersFromRott(formData), appointExaminersCompletion);
}

export async function updateAppointExaminers(
  caseId: number,
  patch: Partial<AppointExaminersFormData>,
): Promise<{ record: ModuleFormRecord; formData: AppointExaminersFormData }> {
  return updateRecord('appoint_examiners_forms', caseId, 'appoint_examiners', patch, getOrCreateAppointExaminers, appointExaminersCompletion);
}

export async function submitAppointExaminers(caseId: number): Promise<ModuleFormRecord> {
  return submitRecord('appoint_examiners_forms', caseId, 'appoint_examiners', getOrCreateAppointExaminers);
}

export async function getOrCreateChangeExaminers(caseId: number): Promise<{ record: ModuleFormRecord; formData: ChangeExaminersFormData }> {
  await ensureChangeExaminersPrerequisite(caseId);
  const { formData } = await getCaseById(caseId);
  const appoint = await getOrCreateAppointExaminers(caseId);
  return getOrCreateRecord(
    'change_examiners_forms',
    caseId,
    'change_examiners',
    defaultChangeExaminers(formData, appoint.formData),
    changeExaminersCompletion,
  );
}

export async function updateChangeExaminers(
  caseId: number,
  patch: Partial<ChangeExaminersFormData>,
): Promise<{ record: ModuleFormRecord; formData: ChangeExaminersFormData }> {
  return updateRecord('change_examiners_forms', caseId, 'change_examiners', patch, getOrCreateChangeExaminers, changeExaminersCompletion);
}

export async function submitChangeExaminers(caseId: number): Promise<ModuleFormRecord> {
  return submitRecord('change_examiners_forms', caseId, 'change_examiners', getOrCreateChangeExaminers);
}

export async function getOrCreateExaminerSummaryCv(caseId: number): Promise<{ record: ModuleFormRecord; formData: ExaminerSummaryCvFormData }> {
  await ensureSummaryPrerequisite(caseId);
  const { formData } = await getCaseById(caseId);
  const changeRecord = await readModuleRecord('change_examiners_forms', caseId);
  const appointRecord = await readModuleRecord('appoint_examiners_forms', caseId);
  const summarySource = changeRecord?.status === 'submitted'
    ? parseJsonObject<ChangeExaminersFormData>(changeRecord.form_data_json)['Current examiner panel summary']
    : appointRecord
      ? examinersPanelSummary(parseJsonObject<AppointExaminersFormData>(appointRecord.form_data_json))
      : '';

  return getOrCreateRecord(
    'examiner_summary_cv_forms',
    caseId,
    'examiner_summary_cv',
    defaultExaminerSummary(formData, summarySource),
    examinerSummaryCompletion,
  );
}

export async function updateExaminerSummaryCv(
  caseId: number,
  patch: Partial<ExaminerSummaryCvFormData>,
): Promise<{ record: ModuleFormRecord; formData: ExaminerSummaryCvFormData }> {
  return updateRecord('examiner_summary_cv_forms', caseId, 'examiner_summary_cv', patch, getOrCreateExaminerSummaryCv, examinerSummaryCompletion);
}

export async function submitExaminerSummaryCv(caseId: number): Promise<ModuleFormRecord> {
  return submitRecord('examiner_summary_cv_forms', caseId, 'examiner_summary_cv', getOrCreateExaminerSummaryCv);
}

export async function getOrCreateAppointArbiter(caseId: number): Promise<{ record: ModuleFormRecord; formData: AppointArbiterFormData }> {
  await ensureArbiterPrerequisite(caseId);
  const { formData } = await getCaseById(caseId);
  const changeRecord = await readModuleRecord('change_examiners_forms', caseId);
  const appointRecord = await readModuleRecord('appoint_examiners_forms', caseId);
  const panelSummary = changeRecord?.status === 'submitted'
    ? parseJsonObject<ChangeExaminersFormData>(changeRecord.form_data_json)['Current examiner panel summary']
    : appointRecord
      ? examinersPanelSummary(parseJsonObject<AppointExaminersFormData>(appointRecord.form_data_json))
      : '';

  return getOrCreateRecord('appoint_arbiter_forms', caseId, 'appoint_arbiter', defaultArbiter(formData, panelSummary), arbiterCompletion);
}

export async function updateAppointArbiter(
  caseId: number,
  patch: Partial<AppointArbiterFormData>,
): Promise<{ record: ModuleFormRecord; formData: AppointArbiterFormData }> {
  return updateRecord('appoint_arbiter_forms', caseId, 'appoint_arbiter', patch, getOrCreateAppointArbiter, arbiterCompletion);
}

export async function submitAppointArbiter(caseId: number): Promise<ModuleFormRecord> {
  return submitRecord('appoint_arbiter_forms', caseId, 'appoint_arbiter', getOrCreateAppointArbiter);
}
