import db from '../db/knex';
import { SUBMITTED_OR_LATER_MODULE_STATUSES } from './workflow/moduleLifecycleEngine';

interface FacultyProcessCalendarRow {
  id: number;
  academic_year: number;
  rott_submission_deadline: string | null;
  progress_report_deadline: string | null;
  intention_to_submit_deadline: string | null;
  appoint_examiners_deadline: string | null;
  published_notice: string | null;
  updated_by_user_id: number | null;
  created_at: string;
  updated_at: string;
}

interface ProgressReportSnapshot {
  status: string | null;
  submitted_at: string | null;
  updated_at: string | null;
  form_data_json: string | null;
}

export interface FacultyProcessCalendar {
  academicYear: number;
  rottSubmissionDeadline: string | null;
  progressReportDeadline: string | null;
  intentionToSubmitDeadline: string | null;
  appointExaminersDeadline: string | null;
  publishedNotice: string | null;
  updatedAt: string | null;
}

export interface PolicyWarning {
  code: 'progress_report_due' | 'progress_report_overdue';
  severity: 'info' | 'warning';
  message: string;
  deadline: string | null;
}

export interface FacultyProcessCalendarPatch {
  rottSubmissionDeadline?: string | null;
  progressReportDeadline?: string | null;
  intentionToSubmitDeadline?: string | null;
  appointExaminersDeadline?: string | null;
  publishedNotice?: string | null;
}

function toIsoDate(value: string | null | undefined): string | null {
  if (!value) {
    return null;
  }
  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    throw new Error(`Invalid date format: ${value}. Use YYYY-MM-DD.`);
  }
  const parsed = new Date(`${trimmed}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) {
    throw new Error(`Invalid date value: ${value}.`);
  }
  return trimmed;
}

function formatDateHuman(dateIso: string): string {
  const d = new Date(`${dateIso}T00:00:00Z`);
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric', timeZone: 'UTC' });
}

function mapRowToCalendar(row: FacultyProcessCalendarRow | undefined, academicYear: number): FacultyProcessCalendar {
  if (!row) {
    return {
      academicYear,
      rottSubmissionDeadline: null,
      progressReportDeadline: null,
      intentionToSubmitDeadline: null,
      appointExaminersDeadline: null,
      publishedNotice: null,
      updatedAt: null,
    };
  }

  return {
    academicYear: row.academic_year,
    rottSubmissionDeadline: row.rott_submission_deadline,
    progressReportDeadline: row.progress_report_deadline,
    intentionToSubmitDeadline: row.intention_to_submit_deadline,
    appointExaminersDeadline: row.appoint_examiners_deadline,
    publishedNotice: row.published_notice,
    updatedAt: row.updated_at,
  };
}

function parseReportingYear(rawFormData: string | null): number | null {
  if (!rawFormData) {
    return null;
  }
  try {
    const parsed = JSON.parse(rawFormData) as { ['Reporting period']?: unknown };
    const reportingPeriod = typeof parsed['Reporting period'] === 'string' ? parsed['Reporting period'] : '';
    const yearMatch = reportingPeriod.match(/\b(20\d{2})\b/);
    if (!yearMatch) {
      return null;
    }
    return Number.parseInt(yearMatch[1], 10);
  } catch {
    return null;
  }
}

function hasSubmittedProgressForYear(progress: ProgressReportSnapshot | undefined, year: number): boolean {
  if (!progress || !progress.status || !SUBMITTED_OR_LATER_MODULE_STATUSES.includes(progress.status as typeof SUBMITTED_OR_LATER_MODULE_STATUSES[number])) {
    return false;
  }

  const submittedYear = progress.submitted_at ? new Date(progress.submitted_at).getUTCFullYear() : null;
  const updatedYear = progress.updated_at ? new Date(progress.updated_at).getUTCFullYear() : null;
  const reportingPeriodYear = parseReportingYear(progress.form_data_json ?? null);

  return submittedYear === year || updatedYear === year || reportingPeriodYear === year;
}

function deriveDeadlineYear(inputYear?: number): number {
  if (typeof inputYear === 'number' && Number.isFinite(inputYear) && inputYear >= 2000 && inputYear <= 2999) {
    return Math.trunc(inputYear);
  }
  return new Date().getUTCFullYear();
}

export async function getFacultyProcessCalendar(year?: number): Promise<FacultyProcessCalendar> {
  const academicYear = deriveDeadlineYear(year);
  const row = await db<FacultyProcessCalendarRow>('faculty_process_calendar').where({ academic_year: academicYear }).first();
  return mapRowToCalendar(row, academicYear);
}

export async function updateFacultyProcessCalendar(year: number, patch: FacultyProcessCalendarPatch, updatedByUserId: number | null): Promise<FacultyProcessCalendar> {
  const academicYear = deriveDeadlineYear(year);
  const payload = {
    academic_year: academicYear,
    rott_submission_deadline: toIsoDate(patch.rottSubmissionDeadline),
    progress_report_deadline: toIsoDate(patch.progressReportDeadline),
    intention_to_submit_deadline: toIsoDate(patch.intentionToSubmitDeadline),
    appoint_examiners_deadline: toIsoDate(patch.appointExaminersDeadline),
    published_notice: typeof patch.publishedNotice === 'string' ? patch.publishedNotice.trim() || null : null,
    updated_by_user_id: updatedByUserId,
    updated_at: db.fn.now(),
  };

  await db('faculty_process_calendar')
    .insert({ ...payload, created_at: db.fn.now() })
    .onConflict(['academic_year'])
    .merge(payload);

  const row = await db<FacultyProcessCalendarRow>('faculty_process_calendar').where({ academic_year: academicYear }).first();
  return mapRowToCalendar(row, academicYear);
}

export async function getCasePolicyWarnings(caseId: number, year?: number): Promise<{ calendar: FacultyProcessCalendar; warnings: PolicyWarning[] }> {
  const academicYear = deriveDeadlineYear(year);
  const calendar = await getFacultyProcessCalendar(academicYear);

  const progress = await db('progress_report_forms')
    .where('case_id', caseId)
    .first('status', 'submitted_at', 'updated_at', 'form_data_json');

  const hasSubmittedProgress = hasSubmittedProgressForYear(progress, academicYear);
  const warnings: PolicyWarning[] = [];

  if (!calendar.progressReportDeadline || hasSubmittedProgress) {
    return { calendar, warnings };
  }

  const nowIso = new Date().toISOString().slice(0, 10);
  if (nowIso > calendar.progressReportDeadline) {
    warnings.push({
      code: 'progress_report_overdue',
      severity: 'warning',
      deadline: calendar.progressReportDeadline,
      message: `Progress report for ${academicYear} is overdue since ${formatDateHuman(calendar.progressReportDeadline)}. Without a submitted progress report, registration in ${academicYear + 1} may be blocked.`,
    });
    return { calendar, warnings };
  }

  warnings.push({
    code: 'progress_report_due',
    severity: 'info',
    deadline: calendar.progressReportDeadline,
    message: `Progress report for ${academicYear} must be submitted by ${formatDateHuman(calendar.progressReportDeadline)} to avoid next-year registration risk.`,
  });

  return { calendar, warnings };
}
