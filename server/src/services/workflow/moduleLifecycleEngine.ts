import fs from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';
import db from '../../db/knex';
import { renderPhaseBModulePdfDocument } from '../pdf-generation/phaseBModulePdfService';
import type { ModuleFormRecord } from '../contracts/titleRegistration';

export type ModuleReviewDecision = 'approved' | 'returned';
export type ModuleStatus = ModuleFormRecord['status'];

export const EDITABLE_MODULE_STATUSES: ModuleStatus[] = [
  'draft',
  'returned_by_supervisor',
  'returned_by_dept',
  'returned_by_chairperson',
  'returned_by_faculty',
];

export const SUBMITTED_OR_LATER_MODULE_STATUSES: ModuleStatus[] = [
  'submitted',
  'awaiting_supervisor_review',
  'awaiting_dept_review',
  'awaiting_chairperson_review',
  'awaiting_faculty_review',
  'approved',
  'returned_by_supervisor',
  'returned_by_dept',
  'returned_by_chairperson',
  'returned_by_faculty',
];

export interface ModuleLifecycleConfig<TData extends object, TTable extends string, TName extends string> {
  table: TTable;
  moduleName: TName;
  title: string;
  completionCalculator: (data: TData) => number;
}

export interface ReviewTransition {
  fromStatus: ModuleStatus;
  approvedStatus: ModuleStatus;
  returnedStatus: ModuleStatus;
}

export function parseJsonObject<T>(raw: string): T {
  return JSON.parse(raw) as T;
}

export function summaryForStatus(moduleName: string, status: ModuleStatus, completionPercent: number): string {
  if (status === 'approved') return `${moduleName} approved.`;
  if (status === 'awaiting_supervisor_review') return `${moduleName} awaiting supervisor review.`;
  if (status === 'awaiting_dept_review') return `${moduleName} awaiting departmental review.`;
  if (status === 'awaiting_chairperson_review') return `${moduleName} awaiting chairperson review.`;
  if (status === 'awaiting_faculty_review') return `${moduleName} awaiting faculty review.`;
  if (status === 'returned_by_supervisor') return `${moduleName} returned by supervisor for correction.`;
  if (status === 'returned_by_dept') return `${moduleName} returned by department for correction.`;
  if (status === 'returned_by_chairperson') return `${moduleName} returned by chairperson for correction.`;
  if (status === 'returned_by_faculty') return `${moduleName} returned by faculty for correction.`;
  if (status === 'submitted') return `${moduleName} submitted.`;
  return `${moduleName} draft in progress (${completionPercent}%).`;
}

function resolveRepoRoot(): string {
  const candidates = [
    path.resolve(process.cwd()),
    path.resolve(process.cwd(), '..'),
    path.resolve(__dirname, '../../..'),
    path.resolve(__dirname, '../../../..'),
  ];

  for (const candidate of candidates) {
    if (existsSync(path.join(candidate, 'ridiculous_forms'))) {
      return candidate;
    }
  }

  throw new Error('Repository root with ridiculous_forms not found');
}

export async function upsertModuleEntry(caseId: number, moduleName: string, status: ModuleStatus, summary: string): Promise<void> {
  const moduleStatus = status === 'approved' ? 'approved' : status.startsWith('returned_') ? 'action_required' : 'in_progress';

  await db('module_entries')
    .insert({
      case_id: caseId,
      module_name: moduleName,
      status: moduleStatus,
      summary,
      updated_at: db.fn.now(),
    })
    .onConflict(['case_id', 'module_name'])
    .merge({ status: moduleStatus, summary, updated_at: db.fn.now() });
}

export async function readModuleRecord<TTable extends string>(table: TTable, caseId: number): Promise<ModuleFormRecord | undefined> {
  const record = await db<ModuleFormRecord>(table).where({ case_id: caseId }).first();
  return record ?? undefined;
}

export async function assertModuleHasSubmittedState<TTable extends string>(
  table: TTable,
  caseId: number,
  label: string,
): Promise<void> {
  const record = await readModuleRecord(table, caseId);
  if (!record || !SUBMITTED_OR_LATER_MODULE_STATUSES.includes(record.status)) {
    throw new Error(`${label} must be submitted before this module can start.`);
  }
}

export async function getOrCreateModuleRecord<TData extends object, TTable extends string, TName extends string>(
  caseId: number,
  config: ModuleLifecycleConfig<TData, TTable, TName>,
  prefill: TData,
): Promise<{ record: ModuleFormRecord; formData: TData }> {
  let record = await readModuleRecord(config.table, caseId);

  if (!record) {
    const completionPercent = config.completionCalculator(prefill);
    const [id] = await db(config.table).insert({
      case_id: caseId,
      form_data_json: JSON.stringify(prefill),
      completion_percent: completionPercent,
      status: 'draft',
    });
    record = await db<ModuleFormRecord>(config.table).where({ id }).first();
    if (!record) {
      throw new Error(`Failed to create ${config.moduleName} module record.`);
    }
  }

  const formData = parseJsonObject<TData>(record.form_data_json);
  await upsertModuleEntry(
    caseId,
    config.moduleName,
    record.status,
    summaryForStatus(config.moduleName, record.status, record.completion_percent),
  );

  return { record, formData };
}

export async function updateModuleRecord<TData extends object, TTable extends string, TName extends string>(
  caseId: number,
  config: ModuleLifecycleConfig<TData, TTable, TName>,
  patch: Partial<TData>,
  getter: (id: number) => Promise<{ record: ModuleFormRecord; formData: TData }>,
): Promise<{ record: ModuleFormRecord; formData: TData }> {
  const { record, formData } = await getter(caseId);
  if (!EDITABLE_MODULE_STATUSES.includes(record.status)) {
    throw new Error(`${config.moduleName} cannot be edited at status ${record.status}.`);
  }

  const merged = { ...formData, ...patch } as TData;
  const completionPercent = config.completionCalculator(merged);
  await db(config.table).where({ id: record.id }).update({
    form_data_json: JSON.stringify(merged),
    completion_percent: completionPercent,
    updated_at: db.fn.now(),
  });

  const updated = await db<ModuleFormRecord>(config.table).where({ id: record.id }).first();
  if (!updated) {
    throw new Error(`Failed to update ${config.moduleName}.`);
  }

  await upsertModuleEntry(
    caseId,
    config.moduleName,
    updated.status,
    summaryForStatus(config.moduleName, updated.status, completionPercent),
  );

  return { record: updated, formData: merged };
}

export async function submitModuleRecord<TData extends object, TTable extends string, TName extends string>(
  caseId: number,
  config: ModuleLifecycleConfig<TData, TTable, TName>,
  getter: (id: number) => Promise<{ record: ModuleFormRecord; formData: TData }>,
  targetStatus: ModuleStatus,
  beforeSubmit?: (data: TData) => void | Promise<void>,
): Promise<ModuleFormRecord> {
  const { record, formData } = await getter(caseId);
  if (beforeSubmit) {
    await beforeSubmit(formData);
  }

  if (record.completion_percent < 100) {
    throw new Error(`${config.moduleName} is incomplete. Save all required fields before submit.`);
  }
  if (!EDITABLE_MODULE_STATUSES.includes(record.status)) {
    throw new Error(`${config.moduleName} cannot be submitted from status ${record.status}.`);
  }

  await db(config.table).where({ id: record.id }).update({
    status: targetStatus,
    submitted_at: db.fn.now(),
    updated_at: db.fn.now(),
  });

  const updated = await db<ModuleFormRecord>(config.table).where({ id: record.id }).first();
  if (!updated) {
    throw new Error(`Failed to submit ${config.moduleName}.`);
  }

  await upsertModuleEntry(
    caseId,
    config.moduleName,
    updated.status,
    summaryForStatus(config.moduleName, updated.status, updated.completion_percent),
  );

  return updated;
}

export async function reviewModuleRecord<TData extends object, TTable extends string, TName extends string>(
  caseId: number,
  config: ModuleLifecycleConfig<TData, TTable, TName>,
  decision: ModuleReviewDecision,
  transition: ReviewTransition,
  onFinalApproval?: (recordData: TData) => Promise<void>,
): Promise<ModuleFormRecord> {
  const record = await readModuleRecord(config.table, caseId);
  if (!record) {
    throw new Error(`${config.moduleName} not found.`);
  }

  if (record.status !== transition.fromStatus) {
    throw new Error(`${config.moduleName} review not allowed from status ${record.status}.`);
  }

  const nextStatus = decision === 'approved' ? transition.approvedStatus : transition.returnedStatus;
  await db(config.table).where({ id: record.id }).update({ status: nextStatus, updated_at: db.fn.now() });

  if (decision === 'approved' && nextStatus === 'approved' && onFinalApproval) {
    await onFinalApproval(parseJsonObject<TData>(record.form_data_json));
  }

  const updated = await db<ModuleFormRecord>(config.table).where({ id: record.id }).first();
  if (!updated) {
    throw new Error(`Failed to review ${config.moduleName}.`);
  }

  await upsertModuleEntry(
    caseId,
    config.moduleName,
    updated.status,
    summaryForStatus(config.moduleName, updated.status, updated.completion_percent),
  );

  return updated;
}

export async function printModulePdf<TData extends object, TTable extends string, TName extends string>(
  caseId: number,
  config: ModuleLifecycleConfig<TData, TTable, TName>,
  studentNumber: string,
): Promise<{ pdfPath: string }> {
  const record = await readModuleRecord(config.table, caseId);
  if (!record) {
    throw new Error(`${config.moduleName} has not started.`);
  }

  const data = parseJsonObject<Record<string, unknown>>(record.form_data_json);
  const fields = Object.entries(data).map(([label, value]) => ({
    label,
    value: typeof value === 'string' ? value : JSON.stringify(value),
    minHeight: typeof value === 'string' && value.length > 120 ? 34 : 20,
  }));

  const repoRoot = resolveRepoRoot();
  const outDir = path.join(repoRoot, 'generated_forms', studentNumber);
  await fs.mkdir(outDir, { recursive: true });
  const outFile = path.join(outDir, `${config.moduleName}_${caseId}.pdf`);

  await renderPhaseBModulePdfDocument(outFile, {
    title: config.title,
    subtitle: 'Generated from canonical workflow payload (policy-aligned rendering)',
    repoRoot,
    fields,
  });

  await db(config.table).where({ id: record.id }).update({ pdf_path: outFile, updated_at: db.fn.now() });
  return { pdfPath: outFile };
}
