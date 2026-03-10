import path from 'path';
import fs from 'fs/promises';
import { existsSync } from 'fs';
import db from '../db/knex';
import type { SasiStudent } from './sasiService';
import { getStudentByNumber } from './sasiService';
import type {
  CaseStatus,
  FormData,
  MouFormData,
  MouFormRecord,
  ReviewDecision,
  SupervisorProfileRole,
  SupervisorProfileForm,
  TitleRegistrationCase,
} from './contracts/titleRegistration';
import { renderMouPdfDocument } from './pdf-generation/mouPdfService';
import { renderTitleRegistrationPdfDocument } from './pdf-generation/titleRegistrationPdfService';
import {
  listExternalInviteItems,
  listNotificationEntries,
  listPeopleEntries,
  listPipelineItems,
  listTaskItems,
  listToDoEntries,
} from './operationsFeedService';
import {
  runChairpersonSignTransition,
  runDeptReviewTransition,
  runDeptSendToFacultyTransition,
  runFacultyReminderTransition,
  runFacultyReviewTransition,
  runSupervisorReviewTransition,
} from './workflow/titleRegistrationTransitions';

export type {
  FormData,
  MouFormData,
  MouFormRecord,
  ReviewDecision,
  SupervisorProfileForm,
  TitleRegistrationCase,
} from './contracts/titleRegistration';

const moduleNames = [
  'mou',
  'supervisor_profiles',
  'intention_to_submit',
  'appoint_examiners',
  'change_examiners',
  'examiner_summary_cv',
  'appoint_arbiter',
  'tasks',
  'approvals',
  'people',
  'system',
  'radar',
  'pipeline',
  'timelines',
  'calendar',
  'kanban',
  'team',
  'policy',
];

function toDdMmYyyy(dateString: string | null): string {
  if (!dateString) {
    return '';
  }
  const d = new Date(dateString);
  if (Number.isNaN(d.getTime())) {
    return '';
  }
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yyyy = d.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
}

export function checkStudentEligibility(student: SasiStudent): { eligible: boolean; reasons: string[] } {
  const reasons: string[] = [];
  if (!student.registration_active) {
    reasons.push('Student is not currently registered on SASI. Only registered students can proceed with this submission.');
  }
  if (!student.first_registration_date) {
    reasons.push('Missing first registration date on SASI.');
    return { eligible: false, reasons };
  }

  const now = new Date();
  const firstReg = new Date(student.first_registration_date);
  if (Number.isNaN(firstReg.getTime())) {
    reasons.push('Invalid first registration date on SASI.');
    return { eligible: false, reasons };
  }

  if (now.getFullYear() > student.first_enrolment_year) {
    reasons.push('Title registration should be completed in the first enrolment year before annual progress reporting.');
  }

  return { eligible: reasons.length === 0, reasons };
}

function buildPrefill(student: SasiStudent): FormData {
  const isPhd = student.degree_level === 'PHD';
  const isMaster = student.degree_level === 'MSC';
  const ethics = student.ethics_required ? 'Yes' : 'No';

  const firstReg = toDdMmYyyy(student.first_registration_date);
  const firstRegYear = firstReg ? firstReg.slice(6, 10) : String(student.first_enrolment_year);
  const hasCoSupervisor = Boolean(student.co_supervisor_name?.trim());
  const adminSame = (student.admin_supervisor_name ?? '').trim().toLowerCase() === (student.supervisor_name ?? '').trim().toLowerCase();

  return {
    'Student Title': student.title ?? '',
    'Student First-Name': student.first_names,
    'Student Surname': student.last_name,
    'Student Number': student.student_number,
    Department: student.department,
    Degree: student.degree_level,
    'Date of first title registration on SASI': firstReg,
    'Student registration active on SASI': student.registration_active ? 'Yes' : 'No',
    'PhD by traditional thesis format': isPhd,
    'PhD by publication': false,
    'Masters Full-thesis': isMaster && student.degree_type === 'FULL_THESIS',
    'Masters Mini thesis': isMaster && student.degree_type === 'MINI_THESIS',
    'Masters by publication': isMaster && student.degree_type === 'PROJECT',
    'Supervisor Title': 'Dr',
    Supervisor: student.supervisor_name ?? 'AJ Smit',
    'Supervisor Qualifications': student.supervisor_qualifications ?? 'PhD',
    'Supervisor is UWC-internal': 'Yes',
    'Supervisor External Lookup Id': '',
    'Supervisor External First Name': '',
    'Supervisor External Surname': '',
    'Supervisor External Address': '',
    'Supervisor External Email': '',
    'Administrative Supervisor same as Supervisor': adminSame ? 'Yes' : 'No',
    'Administrative Supervisor (Nominal Role)': student.admin_supervisor_name ?? 'Adriaan Engelbrecht',
    'Administrative Supervisor Qualifications (Nominal Role)': student.admin_supervisor_qualifications ?? 'PhD',
    'Administrative Supervisor is UWC-internal': 'Yes',
    'Administrative Supervisor External Lookup Id': '',
    'Administrative Supervisor External Title': '',
    'Administrative Supervisor External First Name': '',
    'Administrative Supervisor External Surname': '',
    'Administrative Supervisor External Address': '',
    'Administrative Supervisor External Email': '',
    'Has Co-supervisor?': hasCoSupervisor ? 'Yes' : 'No',
    'Co-supervisor Title': hasCoSupervisor ? 'Dr' : 'NA',
    'Co-supervisor': hasCoSupervisor ? (student.co_supervisor_name ?? '') : 'NA',
    'Co-supervisor Qualifications': hasCoSupervisor ? (student.co_supervisor_qualifications ?? 'PhD') : 'NA',
    'Co-supervisor is UWC-internal': 'Yes',
    'Co-supervisor External Lookup Id': '',
    'Co-supervisor External First Name': '',
    'Co-supervisor External Surname': '',
    'Co-supervisor External Address': '',
    'Co-supervisor External Email': '',
    'Second Co-supervisor Title': 'NA',
    'Second Co-supervisor': 'NA',
    'Second Co-supervisor Qualifications': 'NA',
    'Second Co-supervisor is UWC-internal': 'Yes',
    'Second Co-supervisor External Lookup Id': '',
    'Second Co-supervisor External First Name': '',
    'Second Co-supervisor External Surname': '',
    'Second Co-supervisor External Address': '',
    'Second Co-supervisor External Email': '',
    'Thesis title': student.thesis_title ?? '',
    'Key words': '',
    'Does this project need Ethics clearance?': ethics,
    'Ethics clearance reference number': student.ethics_ref_number ?? '',
    'Date on which ethics clearance was issued': '',
    'Has the MOU been submitted?': 'No',
    'Year first registered': firstRegYear,
    'Semester first registered': String(student.first_registration_semester ?? ''),
    'Initial thesis title for upgrade from Masters to Doctoral': '',
    Abstract: '',
    'PhD proposal link (5-10 pages incl. timeframes)': '',
  };
}

function normalizeLegacyFormData(input: Record<string, unknown>): FormData {
  const mapped = { ...input } as Record<string, unknown>;
  if (typeof mapped['Date of first title registration (dd-mm-yyyy)'] === 'string' && !mapped['Date of first title registration on SASI']) {
    mapped['Date of first title registration on SASI'] = mapped['Date of first title registration (dd-mm-yyyy)'];
  }
  if (typeof mapped['Departmental Higher Degrees Representative'] === 'string' && !mapped['Administrative Supervisor (Nominal Role)']) {
    mapped['Administrative Supervisor (Nominal Role)'] = mapped['Departmental Higher Degrees Representative'];
  }
  if (typeof mapped['Departmental Higher Degrees Representative Qualifications'] === 'string' && !mapped['Administrative Supervisor Qualifications (Nominal Role)']) {
    mapped['Administrative Supervisor Qualifications (Nominal Role)'] = mapped['Departmental Higher Degrees Representative Qualifications'];
  }
  if (typeof mapped['PhD proposal link (5-10 pages incl. timeframes)'] !== 'string') {
    mapped['PhD proposal link (5-10 pages incl. timeframes)'] = '';
  }
  if (mapped['Student registration active on SASI'] !== 'Yes' && mapped['Student registration active on SASI'] !== 'No') {
    mapped['Student registration active on SASI'] = 'Yes';
  }
  if (typeof mapped['Supervisor Title'] !== 'string') {
    mapped['Supervisor Title'] = '';
  }
  if (typeof mapped['Co-supervisor Title'] !== 'string') {
    mapped['Co-supervisor Title'] = '';
  }
  if (mapped['Administrative Supervisor same as Supervisor'] !== 'Yes' && mapped['Administrative Supervisor same as Supervisor'] !== 'No') {
    mapped['Administrative Supervisor same as Supervisor'] = 'No';
  }
  if (mapped['Has Co-supervisor?'] !== 'Yes' && mapped['Has Co-supervisor?'] !== 'No') {
    mapped['Has Co-supervisor?'] = typeof mapped['Co-supervisor'] === 'string' && hasNamedPerson(String(mapped['Co-supervisor'])) ? 'Yes' : 'No';
  }
  if (mapped['Supervisor is UWC-internal'] !== 'Yes' && mapped['Supervisor is UWC-internal'] !== 'No') {
    mapped['Supervisor is UWC-internal'] = 'Yes';
  }
  if (typeof mapped['Supervisor External Lookup Id'] !== 'string') {
    mapped['Supervisor External Lookup Id'] = '';
  }
  if (typeof mapped['Supervisor External First Name'] !== 'string') {
    mapped['Supervisor External First Name'] = '';
  }
  if (typeof mapped['Supervisor External Surname'] !== 'string') {
    mapped['Supervisor External Surname'] = '';
  }
  if (mapped['Co-supervisor is UWC-internal'] !== 'Yes' && mapped['Co-supervisor is UWC-internal'] !== 'No') {
    mapped['Co-supervisor is UWC-internal'] = 'Yes';
  }
  if (typeof mapped['Co-supervisor External Lookup Id'] !== 'string') {
    mapped['Co-supervisor External Lookup Id'] = '';
  }
  if (typeof mapped['Co-supervisor External First Name'] !== 'string') {
    mapped['Co-supervisor External First Name'] = '';
  }
  if (typeof mapped['Co-supervisor External Surname'] !== 'string') {
    mapped['Co-supervisor External Surname'] = '';
  }
  if (mapped['Administrative Supervisor is UWC-internal'] !== 'Yes' && mapped['Administrative Supervisor is UWC-internal'] !== 'No') {
    mapped['Administrative Supervisor is UWC-internal'] = 'Yes';
  }
  if (typeof mapped['Administrative Supervisor External Lookup Id'] !== 'string') {
    mapped['Administrative Supervisor External Lookup Id'] = '';
  }
  if (typeof mapped['Administrative Supervisor External Title'] !== 'string') {
    mapped['Administrative Supervisor External Title'] = '';
  }
  if (typeof mapped['Administrative Supervisor External First Name'] !== 'string') {
    mapped['Administrative Supervisor External First Name'] = '';
  }
  if (typeof mapped['Administrative Supervisor External Surname'] !== 'string') {
    mapped['Administrative Supervisor External Surname'] = '';
  }
  if (typeof mapped['Administrative Supervisor External Address'] !== 'string') {
    mapped['Administrative Supervisor External Address'] = '';
  }
  if (typeof mapped['Administrative Supervisor External Email'] !== 'string') {
    mapped['Administrative Supervisor External Email'] = '';
  }
  if (typeof mapped['Supervisor External Address'] !== 'string') {
    mapped['Supervisor External Address'] = '';
  }
  if (typeof mapped['Supervisor External Email'] !== 'string') {
    mapped['Supervisor External Email'] = '';
  }
  if (typeof mapped['Co-supervisor External Address'] !== 'string') {
    mapped['Co-supervisor External Address'] = '';
  }
  if (typeof mapped['Co-supervisor External Email'] !== 'string') {
    mapped['Co-supervisor External Email'] = '';
  }
  if (typeof mapped['Second Co-supervisor Title'] !== 'string') {
    mapped['Second Co-supervisor Title'] = 'NA';
  }
  if (typeof mapped['Second Co-supervisor'] !== 'string') {
    mapped['Second Co-supervisor'] = 'NA';
  }
  if (typeof mapped['Second Co-supervisor Qualifications'] !== 'string') {
    mapped['Second Co-supervisor Qualifications'] = 'NA';
  }
  if (mapped['Second Co-supervisor is UWC-internal'] !== 'Yes' && mapped['Second Co-supervisor is UWC-internal'] !== 'No') {
    mapped['Second Co-supervisor is UWC-internal'] = 'Yes';
  }
  if (typeof mapped['Second Co-supervisor External Lookup Id'] !== 'string') {
    mapped['Second Co-supervisor External Lookup Id'] = '';
  }
  if (typeof mapped['Second Co-supervisor External First Name'] !== 'string') {
    mapped['Second Co-supervisor External First Name'] = '';
  }
  if (typeof mapped['Second Co-supervisor External Surname'] !== 'string') {
    mapped['Second Co-supervisor External Surname'] = '';
  }
  if (typeof mapped['Second Co-supervisor External Address'] !== 'string') {
    mapped['Second Co-supervisor External Address'] = '';
  }
  if (typeof mapped['Second Co-supervisor External Email'] !== 'string') {
    mapped['Second Co-supervisor External Email'] = '';
  }
  if (mapped['Has Co-supervisor?'] === 'No') {
    mapped['Co-supervisor Title'] = 'NA';
    mapped['Co-supervisor'] = 'NA';
    mapped['Co-supervisor Qualifications'] = 'NA';
    mapped['Co-supervisor External Lookup Id'] = '';
    mapped['Co-supervisor External First Name'] = '';
    mapped['Co-supervisor External Surname'] = '';
    mapped['Co-supervisor External Address'] = '';
    mapped['Co-supervisor External Email'] = '';
    mapped['Second Co-supervisor Title'] = 'NA';
    mapped['Second Co-supervisor'] = 'NA';
    mapped['Second Co-supervisor Qualifications'] = 'NA';
    mapped['Second Co-supervisor External Lookup Id'] = '';
    mapped['Second Co-supervisor External First Name'] = '';
    mapped['Second Co-supervisor External Surname'] = '';
    mapped['Second Co-supervisor External Address'] = '';
    mapped['Second Co-supervisor External Email'] = '';
  }
  return mapped as unknown as FormData;
}

function parseKeywords(raw: string): string[] {
  return raw
    .split(',')
    .map((k) => k.trim())
    .filter(Boolean);
}

function isNotApplicable(value: string): boolean {
  return value.trim().toUpperCase() === 'NA';
}

function hasNamedPerson(value: string): boolean {
  const trimmed = value.trim();
  return Boolean(trimmed) && !isNotApplicable(trimmed);
}

function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function sanitizeThesisTitle(value: string): string {
  // Normalize accidental trailing spaces and sentence-ending periods in thesis titles.
  return String(value ?? '')
    .trim()
    .replace(/\.+$/, '')
    .trim();
}

function hasLikelyFullName(raw: string): boolean {
  const parts = raw.trim().split(/\s+/).filter(Boolean);
  return parts.length >= 2;
}

function completionPercent(formData: FormData): number {
  const requiredStringKeys: Array<keyof FormData> = [
    'Student Title',
    'Student First-Name',
    'Student Surname',
    'Student Number',
    'Department',
    'Degree',
    'Date of first title registration on SASI',
    'Student registration active on SASI',
    'Supervisor Title',
    'Supervisor',
    'Thesis title',
    'Year first registered',
    'Semester first registered',
  ];

  let completed = 0;
  for (const key of requiredStringKeys) {
    const value = formData[key];
    if (typeof value === 'string' && value.trim()) {
      completed += 1;
    }
  }

  const boolComplete = formData['PhD by traditional thesis format'] || formData['PhD by publication'] || formData['Masters Full-thesis'] || formData['Masters Mini thesis'] || formData['Masters by publication'];
  if (boolComplete) {
    completed += 1;
  }

  const keywords = parseKeywords(formData['Key words']);
  if (keywords.length >= 3) {
    completed += 1;
  }

  if (formData.Abstract.trim() && wordCount(formData.Abstract) <= 200) {
    completed += 1;
  }

  if (formData.Degree === 'PHD' && formData['PhD proposal link (5-10 pages incl. timeframes)'].trim()) {
    completed += 1;
  } else if (formData.Degree !== 'PHD') {
    completed += 1;
  }

  if (formData['Supervisor is UWC-internal'] === 'Yes' && formData.Supervisor.trim()) {
    completed += 1;
  } else if (
    formData['Supervisor is UWC-internal'] === 'No' &&
    formData.Supervisor.trim() &&
    formData['Supervisor External Email'].trim()
  ) {
    completed += 1;
  }

  if (formData['Has Co-supervisor?'] === 'No') {
    completed += 1;
  } else {
    const co1Present = hasNamedPerson(formData['Co-supervisor']);
    const co2Present = hasNamedPerson(formData['Second Co-supervisor']);
    if (co1Present || co2Present) {
      completed += 1;
    }
    if (co1Present && formData['Co-supervisor is UWC-internal'] === 'No') {
      if (formData['Co-supervisor External Email'].trim()) {
        completed += 1;
      }
    } else if (co1Present) {
      completed += 1;
    }
    if (co2Present && formData['Second Co-supervisor is UWC-internal'] === 'No') {
      if (formData['Second Co-supervisor External Email'].trim()) {
        completed += 1;
      }
    } else if (co2Present) {
      completed += 1;
    }
  }

  const total = requiredStringKeys.length + 8;
  return Math.round((completed / total) * 100);
}

function normalizeName(value: string): string {
  return value
    .toLowerCase()
    .replace(/\b(professor|prof|associate|dr|mr|mrs|ms|prof\.)\b/g, '')
    .replace(/[^a-z\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function nameMatches(a: string, b: string): boolean {
  const na = normalizeName(a);
  const nb = normalizeName(b);
  return na === nb || na.includes(nb) || nb.includes(na);
}

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

interface InternalDirectoryRow {
  staff_name: string;
  staff_title: string | null;
  first_name: string | null;
  last_name: string | null;
  highest_qualification: string | null;
  department_name: string | null;
  faculty_name: string | null;
}

interface ExternalAcademicRegistryRow {
  id: number;
  title: string;
  first_name: string;
  last_name: string;
  full_name: string;
  normalized_full_name: string;
  highest_qualification: string;
  email: string;
  address: string;
}

function buildDisplayName(title: string, firstName: string, lastName: string): string {
  return [title.trim(), firstName.trim(), lastName.trim()].filter(Boolean).join(' ').replace(/\s+/g, ' ').trim();
}

function resolveInternalPerson(rawName: string, directoryRows: InternalDirectoryRow[]): InternalDirectoryRow | null {
  const exact = directoryRows.find((row) => String(row.staff_name).trim().toLowerCase() === rawName.trim().toLowerCase());
  if (exact) return exact;
  return directoryRows.find((row) => nameMatches(String(row.staff_name), rawName)) ?? null;
}

async function upsertExternalAcademicFromForm(formData: FormData, role: 'supervisor' | 'co1' | 'co2' | 'admin'): Promise<void> {
  const roleMap = {
    supervisor: {
      isInternal: formData['Supervisor is UWC-internal'],
      lookupId: formData['Supervisor External Lookup Id'],
      title: formData['Supervisor Title'],
      firstName: formData['Supervisor External First Name'],
      lastName: formData['Supervisor External Surname'],
      qualification: formData['Supervisor Qualifications'],
      email: formData['Supervisor External Email'],
      address: formData['Supervisor External Address'],
    },
    co1: {
      isInternal: formData['Co-supervisor is UWC-internal'],
      lookupId: formData['Co-supervisor External Lookup Id'],
      title: formData['Co-supervisor Title'],
      firstName: formData['Co-supervisor External First Name'],
      lastName: formData['Co-supervisor External Surname'],
      qualification: formData['Co-supervisor Qualifications'],
      email: formData['Co-supervisor External Email'],
      address: formData['Co-supervisor External Address'],
    },
    co2: {
      isInternal: formData['Second Co-supervisor is UWC-internal'],
      lookupId: formData['Second Co-supervisor External Lookup Id'],
      title: formData['Second Co-supervisor Title'],
      firstName: formData['Second Co-supervisor External First Name'],
      lastName: formData['Second Co-supervisor External Surname'],
      qualification: formData['Second Co-supervisor Qualifications'],
      email: formData['Second Co-supervisor External Email'],
      address: formData['Second Co-supervisor External Address'],
    },
    admin: {
      isInternal: formData['Administrative Supervisor is UWC-internal'],
      lookupId: formData['Administrative Supervisor External Lookup Id'],
      title: formData['Administrative Supervisor External Title'],
      firstName: formData['Administrative Supervisor External First Name'],
      lastName: formData['Administrative Supervisor External Surname'],
      qualification: formData['Administrative Supervisor Qualifications (Nominal Role)'],
      email: formData['Administrative Supervisor External Email'],
      address: formData['Administrative Supervisor External Address'],
    },
  }[role];

  if (roleMap.isInternal !== 'No') return;
  if (!roleMap.lookupId?.trim()) return;
  const fullName = buildDisplayName(roleMap.title, roleMap.firstName, roleMap.lastName);
  if (!fullName) return;
  const id = Number.parseInt(roleMap.lookupId, 10);
  if (!Number.isFinite(id) || id < 1) return;

  const existing = await db<ExternalAcademicRegistryRow>('external_academic_registry').where({ id }).first();
  if (!existing) return;

  await db('external_academic_registry').where({ id }).update({
    title: roleMap.title.trim(),
    first_name: roleMap.firstName.trim(),
    last_name: roleMap.lastName.trim(),
    full_name: fullName,
    normalized_full_name: normalizeName(fullName),
    highest_qualification: roleMap.qualification.trim(),
    email: roleMap.email.trim(),
    address: roleMap.address.trim(),
    updated_at: db.fn.now(),
  });
}

function resolveQualificationFromDirectories(
  name: string,
  sasiStaffRows: Array<{ full_name: string; highest_qualification: string | null }>,
  directoryRows: Array<{ staff_name: string; highest_qualification: string | null }>,
): string | null {
  const exactDirectory = directoryRows.find((row) => row.staff_name.toLowerCase() === name.trim().toLowerCase());
  if (exactDirectory?.highest_qualification) {
    return String(exactDirectory.highest_qualification);
  }

  const fuzzyDirectory = directoryRows.find((row) => nameMatches(String(row.staff_name), name));
  if (fuzzyDirectory?.highest_qualification) {
    return String(fuzzyDirectory.highest_qualification);
  }

  const exactSasi = sasiStaffRows.find((row) => row.full_name.toLowerCase() === name.trim().toLowerCase());
  if (exactSasi?.highest_qualification) {
    return String(exactSasi.highest_qualification);
  }

  const fuzzySasi = sasiStaffRows.find((row) => nameMatches(String(row.full_name), name));
  if (fuzzySasi?.highest_qualification) {
    return String(fuzzySasi.highest_qualification);
  }

  return null;
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

async function queueEmail(caseId: number, recipients: string[], subject: string, body: string): Promise<void> {
  const rows = recipients.filter(Boolean).map((email) => ({ case_id: caseId, email_to: email, subject, body, status: 'queued' }));
  if (rows.length > 0) {
    await db('notification_queue').insert(rows);
  }
}

async function getStaffEmail(role: string): Promise<string[]> {
  const rows = await db('sasi_staff').where({ role }).select('email');
  return rows.map((r: { email: string }) => r.email);
}

function moduleStatusFromCaseStatus(caseStatus: CaseStatus): string {
  if (caseStatus === 'approved' || caseStatus === 'sent_to_faculty_fhd') {
    return 'approved';
  }
  if (caseStatus.startsWith('returned')) {
    return 'action_required';
  }
  return 'in_progress';
}

async function syncModuleEntries(caseId: number, status: CaseStatus, summary: string): Promise<void> {
  const moduleStatus = moduleStatusFromCaseStatus(status);
  const dedicatedStatusModules = new Set([
    'supervisor_profiles',
    'mou',
    'intention_to_submit',
    'appoint_examiners',
    'change_examiners',
    'examiner_summary_cv',
    'appoint_arbiter',
  ]);
  await Promise.all(
    moduleNames.map(async (moduleName) => {
      if (dedicatedStatusModules.has(moduleName)) {
        return;
      }
      await db('module_entries')
        .insert({ case_id: caseId, module_name: moduleName, status: moduleStatus, summary, updated_at: db.fn.now() })
        .onConflict(['case_id', 'module_name'])
        .merge({ status: moduleStatus, summary, updated_at: db.fn.now() });
    }),
  );
}

function formatIsoDateToDdMmYyyy(raw: string | null | undefined): string {
  if (!raw) return '';
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return '';
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yy = d.getFullYear();
  return `${dd}-${mm}-${yy}`;
}

function mouCompletionPercent(formData: MouFormData): number {
  const required: Array<keyof MouFormData> = [
    'Student Full Name',
    'Student Number',
    'Degree',
    'Department',
    'First Year of Registration',
    'Study Mode',
    'Expected Date of Completion',
    'Thesis Title',
    'Brief Description of Project (<200 words)',
    'Principal Supervisor',
    'Principal Supervisor Highest Qualifications',
    'Principal Supervisor Main Responsibilities',
    'Financial Arrangements for Project',
    'Data Ownership',
    'Supervisor-Student Meetings',
    'Progress Reports',
    'Study Outputs',
    'Student Signature Confirmed',
    'Supervisor Signature Confirmed',
    'Dept Chair/PG Coord Signature Confirmed',
  ];
  let completed = 0;
  for (const key of required) {
    const value = formData[key];
    if (typeof value === 'string' && value.trim()) {
      completed += 1;
    }
  }
  if (wordCount(formData['Brief Description of Project (<200 words)']) <= 200) {
    completed += 1;
  }
  const total = required.length + 1;
  return Math.round((completed / total) * 100);
}

function defaultMouFromCase(student: SasiStudent, rott: FormData, profiles: SupervisorProfileForm[]): MouFormData {
  const supervisorProfile = profiles.find((p) => p.role === 'supervisor' && p.status !== 'inactive');
  const coProfiles = profiles.filter((p) => p.role === 'co_supervisor' && p.status !== 'inactive');
  return {
    'Student Full Name': `${rott['Student Title']} ${rott['Student First-Name']} ${rott['Student Surname']}`.trim(),
    'Student Number': rott['Student Number'],
    Degree: rott.Degree,
    Department: rott.Department,
    'First Year of Registration': rott['Year first registered'],
    'Study Mode': student.registration_type === 'PART_TIME' ? 'PART-TIME' : 'FULL TIME',
    'Expected Date of Completion': formatIsoDateToDdMmYyyy(student.expected_completion_date),
    'Thesis Title': rott['Thesis title'],
    'Brief Description of Project (<200 words)': rott.Abstract,
    'Principal Supervisor': `${rott['Supervisor Title']} ${rott.Supervisor}`.trim(),
    'Principal Supervisor Highest Qualifications': supervisorProfile?.qualifications || rott['Supervisor Qualifications'],
    'Principal Supervisor Main Responsibilities': '',
    'Co-supervisor(s)': coProfiles.map((p) => `${p.person_title} ${p.person_name}`.trim()).join('; '),
    'Co-supervisor Highest Qualifications': coProfiles.map((p) => p.qualifications).filter(Boolean).join('; '),
    'Co-supervisor Main Responsibilities': '',
    'Supervisor Availability Arrangements': '',
    'Student Leave Entitlement Per Annum': '',
    'Student Extended Research Away from UWC Arrangements': '',
    'Prescribed Courses/Workshops': '',
    'Time Allocation': '',
    'Space Allocation': '',
    'Computer Facilities': '',
    'Financial Arrangements for Project': '',
    'Publication Issues': '',
    'Data Ownership': '',
    'Supervisor-Student Meetings': '',
    'Progress Reports': '',
    'Study Outputs': rott.Degree === 'PHD' ? 'Full Thesis' : 'Full Thesis',
    'Research Visits/Conferences': '',
    'Other Duties': '',
    'Other Expectations': '',
    'Other Issues Relevant to Study': '',
    'Student Signature Confirmed': 'No',
    'Supervisor Signature Confirmed': 'No',
    'Co-supervisor Signature Confirmed': rott['Has Co-supervisor?'] === 'Yes' ? 'No' : 'Yes',
    'Dept Chair/PG Coord Signature Confirmed': 'No',
  };
}

function profileIdentityKey(role: SupervisorProfileRole, personName: string): string {
  return `${role}::${normalizeName(personName)}`;
}

function parsePublicationEntries(raw: string): string[] {
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed.map((v) => String(v).trim()).filter(Boolean);
  } catch {
    return [];
  }
}

function serializePublicationEntries(entries: string[]): string {
  return JSON.stringify(entries.map((entry) => entry.trim()).filter(Boolean));
}

function isProfileReady(profile: SupervisorProfileForm): { ok: boolean; reason?: string } {
  if (!profile.person_name.trim()) {
    return { ok: false, reason: 'Missing person name.' };
  }
  if (!profile.person_title.trim()) {
    return { ok: false, reason: 'Missing title.' };
  }
  if (!profile.qualifications.trim()) {
    return { ok: false, reason: 'Missing qualifications.' };
  }
  if (profile.is_internal === 'No') {
    if (!profile.external_address.trim()) {
      return { ok: false, reason: 'External address is required for external supervisors.' };
    }
    if (!profile.contact_email.trim() || !isEmail(profile.contact_email)) {
      return { ok: false, reason: 'A valid contact email is required for external supervisors.' };
    }
  } else if (profile.contact_email.trim() && !isEmail(profile.contact_email)) {
    return { ok: false, reason: 'Contact email format is invalid.' };
  }
  if (profile.publication_count === null || profile.publication_count < 3 || profile.publication_count > 5) {
    return { ok: false, reason: 'Supervisor profile must include 3 to 5 publications from the last 4 years.' };
  }
  const entries = parsePublicationEntries(profile.recent_publications_json);
  if (entries.length < 3 || entries.length > 5) {
    return { ok: false, reason: 'Provide between 3 and 5 latest publications (last 4 years).' };
  }
  if (profile.role === 'co_supervisor' && !profile.contribution_motivation.trim()) {
    return { ok: false, reason: 'Co-supervisor profile requires contribution motivation under point 5.2.' };
  }
  if (profile.cv_attached !== 'Yes') {
    return { ok: false, reason: 'CV attached must be set to Yes before profile completion.' };
  }
  if (!profile.cv_file_path.trim()) {
    return { ok: false, reason: 'Upload a CV file before profile completion.' };
  }
  if (profile.new_to_department === 'Yes' && (!profile.contact_email.trim() || !isEmail(profile.contact_email))) {
    return { ok: false, reason: 'New-to-department profiles must include a valid contact email.' };
  }
  return { ok: true };
}

async function syncSupervisorProfilesForCase(caseId: number, formData: FormData): Promise<void> {
  const desiredProfiles: Array<Omit<SupervisorProfileForm, 'id' | 'case_id' | 'recent_publications_json' | 'status' | 'requested_at' | 'submitted_at' | 'last_reminder_at' | 'created_at' | 'updated_at'>> = [];

  if (formData.Supervisor.trim()) {
    desiredProfiles.push({
      role: 'supervisor',
      person_name: formData.Supervisor,
      person_title: formData['Supervisor Title'],
      qualifications: formData['Supervisor Qualifications'],
      is_internal: formData['Supervisor is UWC-internal'],
      external_address: formData['Supervisor External Address'],
      contact_email: formData['Supervisor External Email'],
      publication_count: null,
      contribution_motivation: '',
      new_to_department: 'No',
      cv_attached: 'No',
      cv_file_path: '',
    });
  }

  if (formData['Has Co-supervisor?'] === 'Yes' && hasNamedPerson(formData['Co-supervisor'])) {
    desiredProfiles.push({
      role: 'co_supervisor',
      person_name: formData['Co-supervisor'],
      person_title: formData['Co-supervisor Title'],
      qualifications: formData['Co-supervisor Qualifications'],
      is_internal: formData['Co-supervisor is UWC-internal'],
      external_address: formData['Co-supervisor External Address'],
      contact_email: formData['Co-supervisor External Email'],
      publication_count: null,
      contribution_motivation: '',
      new_to_department: 'No',
      cv_attached: 'No',
      cv_file_path: '',
    });
  }

  if (formData['Has Co-supervisor?'] === 'Yes' && hasNamedPerson(formData['Second Co-supervisor'])) {
    desiredProfiles.push({
      role: 'co_supervisor',
      person_name: formData['Second Co-supervisor'],
      person_title: formData['Second Co-supervisor Title'],
      qualifications: formData['Second Co-supervisor Qualifications'],
      is_internal: formData['Second Co-supervisor is UWC-internal'],
      external_address: formData['Second Co-supervisor External Address'],
      contact_email: formData['Second Co-supervisor External Email'],
      publication_count: null,
      contribution_motivation: '',
      new_to_department: 'No',
      cv_attached: 'No',
      cv_file_path: '',
    });
  }

  if (formData['Administrative Supervisor (Nominal Role)'].trim()) {
    desiredProfiles.push({
      role: 'admin_supervisor',
      person_name: formData['Administrative Supervisor (Nominal Role)'],
      person_title: formData['Administrative Supervisor External Title'] || 'Dr',
      qualifications: formData['Administrative Supervisor Qualifications (Nominal Role)'],
      is_internal: formData['Administrative Supervisor is UWC-internal'],
      external_address: formData['Administrative Supervisor External Address'],
      contact_email: formData['Administrative Supervisor External Email'],
      publication_count: null,
      contribution_motivation: '',
      new_to_department: 'No',
      cv_attached: 'No',
      cv_file_path: '',
    });
  }

  const existing = await db<SupervisorProfileForm>('supervisor_profile_forms').where({ case_id: caseId });
  const desiredKeys = new Set(desiredProfiles.map((profile) => profileIdentityKey(profile.role, profile.person_name)));

  for (const profile of desiredProfiles) {
    const match = existing.find((row) => profileIdentityKey(row.role, row.person_name) === profileIdentityKey(profile.role, profile.person_name));
    if (!match) {
      await db('supervisor_profile_forms').insert({
        case_id: caseId,
        role: profile.role,
        person_name: profile.person_name,
        person_title: profile.person_title,
        qualifications: profile.qualifications,
        is_internal: profile.is_internal,
        external_address: profile.external_address,
        contact_email: profile.contact_email,
        publication_count: profile.publication_count,
        recent_publications_json: '[]',
        contribution_motivation: profile.contribution_motivation,
        new_to_department: profile.new_to_department,
        cv_attached: profile.cv_attached,
        cv_file_path: '',
        status: 'draft',
      });
      continue;
    }
    await db('supervisor_profile_forms').where({ id: match.id }).update({
      person_title: profile.person_title,
      qualifications: profile.qualifications,
      is_internal: profile.is_internal,
      external_address: profile.external_address,
      contact_email: profile.contact_email,
      status: match.status === 'inactive' ? 'draft' : match.status,
      updated_at: db.fn.now(),
    });
  }

  for (const row of existing) {
    const key = profileIdentityKey(row.role, row.person_name);
    if (!desiredKeys.has(key)) {
      await db('supervisor_profile_forms').where({ id: row.id }).update({ status: 'inactive', updated_at: db.fn.now() });
    }
  }

  await syncSupervisorProfilesModuleStatus(caseId);
}

async function syncSupervisorProfilesModuleStatus(caseId: number): Promise<void> {
  const activeProfiles = await db<SupervisorProfileForm>('supervisor_profile_forms')
    .where({ case_id: caseId })
    .whereNot({ status: 'inactive' });

  let status = 'pending';
  let summary = 'No supervisor profile forms activated yet.';
  if (activeProfiles.length > 0) {
    const completed = activeProfiles.filter((profile) => profile.status === 'completed').length;
    if (completed === activeProfiles.length) {
      status = 'approved';
      summary = `All supervisor profiles completed (${completed}/${activeProfiles.length}).`;
    } else if (activeProfiles.some((profile) => profile.status === 'requested')) {
      status = 'action_required';
      summary = `Supervisor profiles requested (${completed}/${activeProfiles.length} completed).`;
    } else {
      status = 'in_progress';
      summary = `Supervisor profiles in draft (${completed}/${activeProfiles.length} completed).`;
    }
  }

  await db('module_entries')
    .insert({ case_id: caseId, module_name: 'supervisor_profiles', status, summary, updated_at: db.fn.now() })
    .onConflict(['case_id', 'module_name'])
    .merge({ status, summary, updated_at: db.fn.now() });
}

async function ensureMouPrerequisites(caseId: number): Promise<{ student: SasiStudent; rott: FormData; profiles: SupervisorProfileForm[]; caseRecord: TitleRegistrationCase }> {
  const { case: caseRecord, formData: rott, student } = await getCaseById(caseId);
  if (caseRecord.completion_percent < 100) {
    throw new Error('MOU can start only after the ROTT is completed in full and saved.');
  }
  const profiles = await db<SupervisorProfileForm>('supervisor_profile_forms')
    .where({ case_id: caseId })
    .whereNot({ status: 'inactive' });
  return { student, rott, profiles, caseRecord };
}

async function syncMouModuleStatus(caseId: number): Promise<void> {
  const record = await db<MouFormRecord>('mou_forms').where({ case_id: caseId }).first();
  let status = 'pending';
  let summary = 'MOU not started.';
  if (record) {
    if (record.status === 'completed') {
      status = 'approved';
      summary = 'MOU completed and ready for signatures/archive.';
    } else {
      status = 'in_progress';
      summary = `MOU draft in progress (${record.completion_percent}%).`;
    }
  }
  await db('module_entries')
    .insert({ case_id: caseId, module_name: 'mou', status, summary, updated_at: db.fn.now() })
    .onConflict(['case_id', 'module_name'])
    .merge({ status, summary, updated_at: db.fn.now() });
}

function normalizeMouFormData(input: Record<string, unknown>): MouFormData {
  const mapped = { ...input } as Record<string, unknown>;
  const yesNoKeys: Array<keyof MouFormData> = [
    'Student Signature Confirmed',
    'Supervisor Signature Confirmed',
    'Co-supervisor Signature Confirmed',
    'Dept Chair/PG Coord Signature Confirmed',
  ];
  for (const key of yesNoKeys) {
    if (mapped[key] !== 'Yes' && mapped[key] !== 'No') {
      mapped[key] = 'No';
    }
  }
  return mapped as unknown as MouFormData;
}

export async function getOrCreateMou(caseId: number): Promise<{ record: MouFormRecord; formData: MouFormData }> {
  const { student, rott, profiles } = await ensureMouPrerequisites(caseId);
  let record = await db<MouFormRecord>('mou_forms').where({ case_id: caseId }).first();
  if (!record) {
    const prefill = defaultMouFromCase(student, rott, profiles);
    const percent = mouCompletionPercent(prefill);
    const [id] = await db('mou_forms').insert({
      case_id: caseId,
      form_data_json: JSON.stringify(prefill),
      completion_percent: percent,
      status: 'draft',
    });
    record = await db<MouFormRecord>('mou_forms').where({ id }).first();
    if (!record) {
      throw new Error('Failed to create MOU record.');
    }
  }
  await syncMouModuleStatus(caseId);
  return { record, formData: normalizeMouFormData(JSON.parse(record.form_data_json) as Record<string, unknown>) };
}

export async function updateMou(caseId: number, patch: Partial<MouFormData>): Promise<{ record: MouFormRecord; formData: MouFormData }> {
  const { record, formData } = await getOrCreateMou(caseId);
  if (record.status === 'completed') {
    throw new Error('MOU is already completed.');
  }
  const merged = normalizeMouFormData({ ...formData, ...patch } as Record<string, unknown>);
  if (wordCount(merged['Brief Description of Project (<200 words)']) > 200) {
    throw new Error('MOU brief project description must be 200 words or fewer.');
  }
  const percent = mouCompletionPercent(merged);
  await db('mou_forms').where({ id: record.id }).update({
    form_data_json: JSON.stringify(merged),
    completion_percent: percent,
    updated_at: db.fn.now(),
  });
  const updated = await db<MouFormRecord>('mou_forms').where({ id: record.id }).first();
  if (!updated) {
    throw new Error('Failed to update MOU.');
  }
  await syncMouModuleStatus(caseId);
  return { record: updated, formData: merged };
}

export async function completeMou(caseId: number): Promise<MouFormRecord> {
  const { record, formData } = await getOrCreateMou(caseId);
  if (record.completion_percent < 100) {
    throw new Error('MOU is incomplete. Fill all required fields.');
  }
  const requiredSignatures: Array<keyof MouFormData> = [
    'Student Signature Confirmed',
    'Supervisor Signature Confirmed',
    'Dept Chair/PG Coord Signature Confirmed',
  ];
  for (const sig of requiredSignatures) {
    if (formData[sig] !== 'Yes') {
      throw new Error(`MOU cannot be completed until "${sig}" is confirmed.`);
    }
  }
  if (formData['Co-supervisor(s)'].trim() && formData['Co-supervisor Signature Confirmed'] !== 'Yes') {
    throw new Error('MOU cannot be completed until co-supervisor signature is confirmed.');
  }

  await db('mou_forms').where({ id: record.id }).update({
    status: 'completed',
    submitted_at: db.fn.now(),
    updated_at: db.fn.now(),
  });

  const caseRecord = await db<TitleRegistrationCase>('title_registration_cases').where({ id: caseId }).first();
  if (caseRecord) {
    const rott = normalizeLegacyFormData(JSON.parse(caseRecord.form_data_json) as Record<string, unknown>);
    rott['Has the MOU been submitted?'] = 'Yes';
    await db('title_registration_cases').where({ id: caseId }).update({
      form_data_json: JSON.stringify(rott),
      updated_at: db.fn.now(),
    });
  }

  await syncMouModuleStatus(caseId);
  const facultyReps = await getStaffEmail('faculty_fhd_rep');
  await queueEmail(caseId, facultyReps, 'MOU completed for records', `Case #${caseId} MOU is completed and ready for Faculty HD records.`);
  const updated = await db<MouFormRecord>('mou_forms').where({ id: record.id }).first();
  if (!updated) {
    throw new Error('MOU missing after completion.');
  }
  return updated;
}

export async function generateMouPdf(caseId: number): Promise<{ pdfPath: string }> {
  const { record, formData } = await getOrCreateMou(caseId);
  const repoRoot = resolveRepoRoot();
  const outDir = path.join(repoRoot, 'generated_forms', formData['Student Number']);
  await fs.mkdir(outDir, { recursive: true });
  const outFile = path.join(outDir, `mou_${caseId}.pdf`);
  await renderMouPdfDocument(outFile, formData);
  await db('mou_forms').where({ id: record.id }).update({ pdf_path: outFile, updated_at: db.fn.now() });
  return { pdfPath: outFile };
}

async function hydrateCase(baseCase: TitleRegistrationCase): Promise<{ case: TitleRegistrationCase; formData: FormData; student: SasiStudent }> {
  const student = await db<SasiStudent>('sasi_students').where({ id: baseCase.sasi_student_id }).first();
  if (!student) {
    throw new Error('Linked SASI student missing');
  }
  return { case: baseCase, formData: normalizeLegacyFormData(JSON.parse(baseCase.form_data_json) as Record<string, unknown>), student };
}

export async function checkAndPrefill(studentNumber: string): Promise<{ eligible: boolean; reasons: string[]; student?: SasiStudent; caseRecord?: TitleRegistrationCase; formData?: FormData }> {
  const student = await getStudentByNumber(studentNumber);
  if (!student) {
    return { eligible: false, reasons: ['Student not found on SASI.'] };
  }

  const eligibility = checkStudentEligibility(student);
  if (!eligibility.eligible) {
    return { eligible: false, reasons: eligibility.reasons, student };
  }

  let caseRecord = await db<TitleRegistrationCase>('title_registration_cases').where({ sasi_student_id: student.id }).first();
  if (!caseRecord) {
    const prefill = buildPrefill(student);
    const percent = completionPercent(prefill);
    const [id] = await db('title_registration_cases').insert({
      sasi_student_id: student.id,
      case_status: 'awaiting_student_vetting',
      form_data_json: JSON.stringify(prefill),
      completion_percent: percent,
    });
    caseRecord = await db<TitleRegistrationCase>('title_registration_cases').where({ id }).first();
    if (!caseRecord) {
      throw new Error('Failed to create title registration case');
    }
    await syncModuleEntries(caseRecord.id, caseRecord.case_status, 'Title Registration initiated from SASI prefill');
    await syncSupervisorProfilesForCase(caseRecord.id, prefill);
    await syncMouModuleStatus(caseRecord.id);
  }

  const hydrated = await hydrateCase(caseRecord);
  await syncSupervisorProfilesForCase(hydrated.case.id, hydrated.formData);
  await syncMouModuleStatus(hydrated.case.id);
  return { eligible: true, reasons: [], student, caseRecord: hydrated.case, formData: hydrated.formData };
}

export async function getCaseById(caseId: number): Promise<{ case: TitleRegistrationCase; formData: FormData; student: SasiStudent }> {
  const caseRecord = await db<TitleRegistrationCase>('title_registration_cases').where({ id: caseId }).first();
  if (!caseRecord) {
    throw new Error('Title registration case not found');
  }
  return hydrateCase(caseRecord);
}

export async function updateForm(caseId: number, formPatch: Partial<FormData>): Promise<{ case: TitleRegistrationCase; formData: FormData }> {
  const { case: caseRecord, formData } = await getCaseById(caseId);
  const readonlyFields: Array<keyof FormData> = [
    'Student Title',
    'Student First-Name',
    'Student Surname',
    'Student Number',
    'Department',
    'Degree',
    'Date of first title registration on SASI',
    'Student registration active on SASI',
    'Year first registered',
    'Has the MOU been submitted?',
  ];

  for (const key of Object.keys(formPatch) as Array<keyof FormData>) {
    if (readonlyFields.includes(key)) {
      throw new Error(`${key} is pulled from SASI and cannot be edited.`);
    }
  }

  const merged = { ...formData, ...formPatch };
  merged['Thesis title'] = sanitizeThesisTitle(merged['Thesis title']);
  merged['Year first registered'] = merged['Date of first title registration on SASI']?.slice(6, 10) || merged['Year first registered'];

  const directoryRows = await db<InternalDirectoryRow>('uwc_staff_directory').select(
    'staff_name',
    'staff_title',
    'first_name',
    'last_name',
    'highest_qualification',
    'department_name',
    'faculty_name',
  );

  if (merged['Supervisor is UWC-internal'] === 'Yes') {
    const supervisor = resolveInternalPerson(merged.Supervisor, directoryRows);
    if (!supervisor) {
      throw new Error('Internal supervisor must be selected from the UWC staff directory.');
    }
    const firstLast = `${supervisor.first_name ?? ''} ${supervisor.last_name ?? ''}`.trim();
    merged.Supervisor = firstLast || String(supervisor.staff_name);
    merged['Supervisor Title'] = String(supervisor.staff_title ?? '').trim() || 'Dr';
    merged['Supervisor Qualifications'] = String(supervisor.highest_qualification ?? '').trim() || merged['Supervisor Qualifications'];
    merged['Supervisor External Lookup Id'] = '';
    merged['Supervisor External First Name'] = '';
    merged['Supervisor External Surname'] = '';
    merged['Supervisor External Address'] = '';
    merged['Supervisor External Email'] = '';
  } else {
    if (!merged['Supervisor External First Name'].trim() || !merged['Supervisor External Surname'].trim()) {
      throw new Error('External supervisor requires title, first name, and surname.');
    }
    merged.Supervisor = `${merged['Supervisor External First Name']} ${merged['Supervisor External Surname']}`.replace(/\s+/g, ' ').trim();
    if (!merged['Supervisor Title'].trim()) {
      throw new Error('External supervisor title is required.');
    }
    if (!merged['Supervisor External Email'].trim()) {
      throw new Error('External supervisor email is required.');
    }
    if (!isEmail(merged['Supervisor External Email'])) {
      throw new Error('External supervisor email is invalid.');
    }
  }

  if (merged['Administrative Supervisor same as Supervisor'] === 'Yes') {
    merged['Administrative Supervisor (Nominal Role)'] = merged.Supervisor;
    merged['Administrative Supervisor Qualifications (Nominal Role)'] = merged['Supervisor Qualifications'];
    merged['Administrative Supervisor is UWC-internal'] = merged['Supervisor is UWC-internal'];
    merged['Administrative Supervisor External Title'] = merged['Supervisor Title'];
    merged['Administrative Supervisor External First Name'] = merged['Supervisor External First Name'];
    merged['Administrative Supervisor External Surname'] = merged['Supervisor External Surname'];
    merged['Administrative Supervisor External Address'] = merged['Supervisor External Address'];
    merged['Administrative Supervisor External Email'] = merged['Supervisor External Email'];
    merged['Administrative Supervisor External Lookup Id'] = merged['Supervisor External Lookup Id'];
  } else if (merged['Administrative Supervisor is UWC-internal'] === 'Yes') {
    const admin = resolveInternalPerson(merged['Administrative Supervisor (Nominal Role)'], directoryRows);
    if (!admin) {
      throw new Error('Administrative Supervisor (Nominal Role) must be selected from the UWC staff directory.');
    }
    const firstLast = `${admin.first_name ?? ''} ${admin.last_name ?? ''}`.trim();
    merged['Administrative Supervisor (Nominal Role)'] = firstLast || String(admin.staff_name);
    merged['Administrative Supervisor Qualifications (Nominal Role)'] =
      String(admin.highest_qualification ?? '').trim() || merged['Administrative Supervisor Qualifications (Nominal Role)'];
    merged['Administrative Supervisor External Title'] = String(admin.staff_title ?? '').trim() || 'Dr';
    merged['Administrative Supervisor External Lookup Id'] = '';
    merged['Administrative Supervisor External Title'] = '';
    merged['Administrative Supervisor External First Name'] = '';
    merged['Administrative Supervisor External Surname'] = '';
    merged['Administrative Supervisor External Address'] = '';
    merged['Administrative Supervisor External Email'] = '';
  } else {
    if (!merged['Administrative Supervisor External Title'].trim() || !merged['Administrative Supervisor External First Name'].trim() || !merged['Administrative Supervisor External Surname'].trim()) {
      throw new Error('External Administrative Supervisor requires title, first name, and surname.');
    }
    merged['Administrative Supervisor (Nominal Role)'] =
      `${merged['Administrative Supervisor External First Name']} ${merged['Administrative Supervisor External Surname']}`.replace(/\s+/g, ' ').trim();
    if (!merged['Administrative Supervisor External Email'].trim()) {
      throw new Error('External Administrative Supervisor email is required.');
    }
    if (!isEmail(merged['Administrative Supervisor External Email'])) {
      throw new Error('External Administrative Supervisor email is invalid.');
    }
  }

  if (merged['Has Co-supervisor?'] === 'No') {
    merged['Co-supervisor Title'] = 'NA';
    merged['Co-supervisor'] = 'NA';
    merged['Co-supervisor Qualifications'] = 'NA';
    merged['Co-supervisor is UWC-internal'] = 'Yes';
    merged['Co-supervisor External Lookup Id'] = '';
    merged['Co-supervisor External First Name'] = '';
    merged['Co-supervisor External Surname'] = '';
    merged['Co-supervisor External Address'] = '';
    merged['Co-supervisor External Email'] = '';

    merged['Second Co-supervisor Title'] = 'NA';
    merged['Second Co-supervisor'] = 'NA';
    merged['Second Co-supervisor Qualifications'] = 'NA';
    merged['Second Co-supervisor is UWC-internal'] = 'Yes';
    merged['Second Co-supervisor External Lookup Id'] = '';
    merged['Second Co-supervisor External First Name'] = '';
    merged['Second Co-supervisor External Surname'] = '';
    merged['Second Co-supervisor External Address'] = '';
    merged['Second Co-supervisor External Email'] = '';
  } else {
    if (merged['Co-supervisor is UWC-internal'] === 'No' && !hasNamedPerson(merged['Co-supervisor'])) {
      const derived = `${merged['Co-supervisor External First Name']} ${merged['Co-supervisor External Surname']}`.replace(/\s+/g, ' ').trim();
      if (hasNamedPerson(derived)) {
        merged['Co-supervisor'] = derived;
      }
    }
    if (merged['Second Co-supervisor is UWC-internal'] === 'No' && !hasNamedPerson(merged['Second Co-supervisor'])) {
      const derived = `${merged['Second Co-supervisor External First Name']} ${merged['Second Co-supervisor External Surname']}`.replace(/\s+/g, ' ').trim();
      if (hasNamedPerson(derived)) {
        merged['Second Co-supervisor'] = derived;
      }
    }
    if (!hasNamedPerson(merged['Co-supervisor']) && !hasNamedPerson(merged['Second Co-supervisor'])) {
      throw new Error('At least one co-supervisor must be provided when "Has Co-supervisor?" is Yes.');
    }
    if (hasNamedPerson(merged['Co-supervisor']) && merged['Co-supervisor is UWC-internal'] === 'Yes') {
      const coSupervisor = resolveInternalPerson(merged['Co-supervisor'], directoryRows);
      if (!coSupervisor) {
        throw new Error('Internal co-supervisor must be selected from UWC staff directory.');
      }
      const firstLast = `${coSupervisor.first_name ?? ''} ${coSupervisor.last_name ?? ''}`.trim();
      merged['Co-supervisor'] = firstLast || String(coSupervisor.staff_name);
      merged['Co-supervisor Title'] = String(coSupervisor.staff_title ?? '').trim() || 'Dr';
      merged['Co-supervisor Qualifications'] = String(coSupervisor.highest_qualification ?? '').trim() || merged['Co-supervisor Qualifications'];
      merged['Co-supervisor External Lookup Id'] = '';
      merged['Co-supervisor External First Name'] = '';
      merged['Co-supervisor External Surname'] = '';
      merged['Co-supervisor External Address'] = '';
      merged['Co-supervisor External Email'] = '';
    } else if (hasNamedPerson(merged['Co-supervisor'])) {
      if (!merged['Co-supervisor Title'].trim() || !merged['Co-supervisor External First Name'].trim() || !merged['Co-supervisor External Surname'].trim()) {
        throw new Error('External co-supervisor 1 requires title, first name, and surname.');
      }
      merged['Co-supervisor'] = `${merged['Co-supervisor External First Name']} ${merged['Co-supervisor External Surname']}`.replace(/\s+/g, ' ').trim();
    }
    if (hasNamedPerson(merged['Second Co-supervisor']) && merged['Second Co-supervisor is UWC-internal'] === 'Yes') {
      const coSupervisor2 = resolveInternalPerson(merged['Second Co-supervisor'], directoryRows);
      if (!coSupervisor2) {
        throw new Error('Second internal co-supervisor must be selected from UWC staff directory.');
      }
      const firstLast = `${coSupervisor2.first_name ?? ''} ${coSupervisor2.last_name ?? ''}`.trim();
      merged['Second Co-supervisor'] = firstLast || String(coSupervisor2.staff_name);
      merged['Second Co-supervisor Title'] = String(coSupervisor2.staff_title ?? '').trim() || 'Dr';
      merged['Second Co-supervisor Qualifications'] = String(coSupervisor2.highest_qualification ?? '').trim() || merged['Second Co-supervisor Qualifications'];
      merged['Second Co-supervisor External Lookup Id'] = '';
      merged['Second Co-supervisor External First Name'] = '';
      merged['Second Co-supervisor External Surname'] = '';
      merged['Second Co-supervisor External Address'] = '';
      merged['Second Co-supervisor External Email'] = '';
    } else if (hasNamedPerson(merged['Second Co-supervisor'])) {
      if (!merged['Second Co-supervisor Title'].trim() || !merged['Second Co-supervisor External First Name'].trim() || !merged['Second Co-supervisor External Surname'].trim()) {
        throw new Error('External co-supervisor 2 requires title, first name, and surname.');
      }
      merged['Second Co-supervisor'] =
        `${merged['Second Co-supervisor External First Name']} ${merged['Second Co-supervisor External Surname']}`.replace(/\s+/g, ' ').trim();
    }
    if (
      hasNamedPerson(merged['Co-supervisor']) &&
      hasNamedPerson(merged['Second Co-supervisor']) &&
      normalizeName(merged['Co-supervisor']) === normalizeName(merged['Second Co-supervisor'])
    ) {
      throw new Error('Two co-supervisors must be different people.');
    }
  }

  if (wordCount(merged.Abstract) > 200) {
    throw new Error('Abstract must be 200 words or fewer.');
  }

  if (merged['Has Co-supervisor?'] === 'Yes' && hasNamedPerson(merged['Co-supervisor'])) {
    if (merged['Co-supervisor is UWC-internal'] === 'No') {
      if (!merged['Co-supervisor External Email'].trim()) {
        throw new Error('External co-supervisor email is required.');
      }
      if (!isEmail(merged['Co-supervisor External Email'])) {
        throw new Error('External co-supervisor email is invalid.');
      }
    } else {
      merged['Co-supervisor External Address'] = '';
      merged['Co-supervisor External Email'] = '';
    }
  }
  if (merged['Has Co-supervisor?'] === 'Yes' && hasNamedPerson(merged['Second Co-supervisor'])) {
    if (merged['Second Co-supervisor is UWC-internal'] === 'No') {
      if (!merged['Second Co-supervisor External Email'].trim()) {
        throw new Error('External second co-supervisor email is required.');
      }
      if (!isEmail(merged['Second Co-supervisor External Email'])) {
        throw new Error('External second co-supervisor email is invalid.');
      }
    } else {
      merged['Second Co-supervisor External Address'] = '';
      merged['Second Co-supervisor External Email'] = '';
    }
  }

  await upsertExternalAcademicFromForm(merged, 'supervisor');
  await upsertExternalAcademicFromForm(merged, 'co1');
  await upsertExternalAcademicFromForm(merged, 'co2');
  await upsertExternalAcademicFromForm(merged, 'admin');

  const percent = completionPercent(merged);
  await db('title_registration_cases')
    .where({ id: caseId })
    .update({ form_data_json: JSON.stringify(merged), completion_percent: percent, updated_at: db.fn.now() });

  const updated = await db<TitleRegistrationCase>('title_registration_cases').where({ id: caseId }).first();
  if (!updated) {
    throw new Error('Failed to update case');
  }
  await syncSupervisorProfilesForCase(updated.id, merged);
  await syncMouModuleStatus(updated.id);
  await syncModuleEntries(updated.id, updated.case_status, `Form completion ${percent}%`);
  return { case: updated, formData: merged };
}

export async function generatePdf(caseId: number): Promise<{ pdfPath: string }> {
  const { formData } = await getCaseById(caseId);
  const coSupervisor1Name =
    formData['Co-supervisor is UWC-internal'] === 'No' && !hasNamedPerson(formData['Co-supervisor'])
      ? `${formData['Co-supervisor External First Name']} ${formData['Co-supervisor External Surname']}`.replace(/\s+/g, ' ').trim()
      : formData['Co-supervisor'];
  const coSupervisor2Name =
    formData['Second Co-supervisor is UWC-internal'] === 'No' && !hasNamedPerson(formData['Second Co-supervisor'])
      ? `${formData['Second Co-supervisor External First Name']} ${formData['Second Co-supervisor External Surname']}`.replace(/\s+/g, ' ').trim()
      : formData['Second Co-supervisor'];
  const repoRoot = resolveRepoRoot();
  const outDir = path.join(repoRoot, 'generated_forms', formData['Student Number']);
  const outFile = path.join(outDir, `title_registration_${caseId}.pdf`);
  await fs.mkdir(outDir, { recursive: true });
  await renderTitleRegistrationPdfDocument(outFile, formData, {
    repoRoot,
    coSupervisor1Name,
    coSupervisor2Name,
  });

  await db('title_registration_cases').where({ id: caseId }).update({ pdf_path: outFile, updated_at: db.fn.now() });
  return { pdfPath: outFile };
}

export async function studentVet(caseId: number): Promise<TitleRegistrationCase> {
  const caseRecord = await db<TitleRegistrationCase>('title_registration_cases').where({ id: caseId }).first();
  if (!caseRecord) {
    throw new Error('Case not found');
  }
  const { formData, student } = await getCaseById(caseId);
  if (!student.registration_active || formData['Student registration active on SASI'] !== 'Yes') {
    throw new Error('Student must be registered on SASI before this submission can proceed.');
  }
  if (!formData['Supervisor Title'].trim() || !hasLikelyFullName(formData.Supervisor)) {
    throw new Error('Supervisor details are incomplete.');
  }
  if (formData['Has Co-supervisor?'] === 'Yes') {
    if (!hasNamedPerson(formData['Co-supervisor']) && !hasNamedPerson(formData['Second Co-supervisor'])) {
      throw new Error('At least one co-supervisor must be listed when co-supervisor is marked as present.');
    }
    if (hasNamedPerson(formData['Co-supervisor']) && (!formData['Co-supervisor Title'].trim() || !hasLikelyFullName(formData['Co-supervisor']))) {
      throw new Error('Co-supervisor 1 details are incomplete.');
    }
    if (hasNamedPerson(formData['Second Co-supervisor']) && (!formData['Second Co-supervisor Title'].trim() || !hasLikelyFullName(formData['Second Co-supervisor']))) {
      throw new Error('Co-supervisor 2 details are incomplete.');
    }
    if (hasNamedPerson(formData['Co-supervisor']) && hasNamedPerson(formData['Second Co-supervisor']) && normalizeName(formData['Co-supervisor']) === normalizeName(formData['Second Co-supervisor'])) {
      throw new Error('Co-supervisor 1 and 2 must be different people.');
    }
  } else {
    if (!isNotApplicable(formData['Co-supervisor']) || !isNotApplicable(formData['Second Co-supervisor'])) {
      throw new Error('When no co-supervisor is present, co-supervisor fields must remain NA.');
    }
  }

  const keywords = parseKeywords(formData['Key words']);
  if (keywords.length < 3) {
    throw new Error('Provide at least 3 precise keywords/key phrases.');
  }
  if (!keywords.some((keyword) => keyword.includes(' '))) {
    throw new Error('Use at least one keyword phrase (e.g., South African weather, water pollution).');
  }
  if (!formData.Abstract.trim()) {
    throw new Error('Abstract is compulsory.');
  }
  if (wordCount(formData.Abstract) > 500) {
    throw new Error('Abstract should not exceed one page (approximately 500 words).');
  }
  if (formData.Degree === 'MSC' && wordCount(formData.Abstract) < 150) {
    throw new Error('MSc abstract is too short; target approximately 200 words.');
  }
  if (formData.Degree === 'PHD' && wordCount(formData.Abstract) < 150) {
    throw new Error('PhD abstract is too short; provide a substantive one-page abstract.');
  }
  if ((formData.Abstract.includes('et al.') || formData.Abstract.includes('[')) && !formData.Abstract.includes('References:')) {
    throw new Error('If references are used in the abstract, list them in full under a References: section.');
  }
  if (formData.Degree === 'PHD' && !formData['PhD proposal link (5-10 pages incl. timeframes)'].trim()) {
    throw new Error('PhD students must provide a proposal link (5-10 pages including timeframes).');
  }
  if (
    formData['Does this project need Ethics clearance?'] === 'Yes' &&
    !formData['Ethics clearance reference number'].trim()
  ) {
    throw new Error('Ethics clearance reference number is required when ethics clearance is needed.');
  }
  const directoryRows = await db('uwc_staff_directory').select('staff_name', 'department_name');

  if (formData['Supervisor is UWC-internal'] === 'Yes') {
    const exists = directoryRows.some((r) => nameMatches(String(r.staff_name), formData.Supervisor));
    if (!exists) {
      throw new Error('Supervisor marked as UWC-internal must be selected from UWC staff directory.');
    }
  } else {
    if (!formData['Supervisor External Email'].trim()) {
      throw new Error('External supervisor email is required.');
    }
    if (!isEmail(formData['Supervisor External Email'])) {
      throw new Error('External supervisor email is invalid.');
    }
  }

  if (formData['Has Co-supervisor?'] === 'Yes' && hasNamedPerson(formData['Co-supervisor'])) {
    if (formData['Co-supervisor is UWC-internal'] === 'Yes') {
      const exists = directoryRows.some((r) => nameMatches(String(r.staff_name), formData['Co-supervisor']));
      if (!exists) {
        throw new Error('Co-supervisor 1 marked as UWC-internal must be selected from UWC staff directory.');
      }
    } else if (!formData['Co-supervisor External Email'].trim()) {
      throw new Error('External co-supervisor 1 email is required.');
    } else if (!isEmail(formData['Co-supervisor External Email'])) {
      throw new Error('External co-supervisor 1 email is invalid.');
    }
  }

  if (formData['Has Co-supervisor?'] === 'Yes' && hasNamedPerson(formData['Second Co-supervisor'])) {
    if (formData['Second Co-supervisor is UWC-internal'] === 'Yes') {
      const exists = directoryRows.some((r) => nameMatches(String(r.staff_name), formData['Second Co-supervisor']));
      if (!exists) {
        throw new Error('Co-supervisor 2 marked as UWC-internal must be selected from UWC staff directory.');
      }
    } else if (!formData['Second Co-supervisor External Email'].trim()) {
      throw new Error('External co-supervisor 2 email is required.');
    } else if (!isEmail(formData['Second Co-supervisor External Email'])) {
      throw new Error('External co-supervisor 2 email is invalid.');
    }
  }

  if (!hasLikelyFullName(formData['Administrative Supervisor (Nominal Role)'])) {
    throw new Error('Administrative Supervisor details are incomplete.');
  }
  if (caseRecord.completion_percent < 100) {
    throw new Error('Form is incomplete. Complete required fields before student vetting.');
  }

  await db('title_registration_cases').where({ id: caseId }).update({
    case_status: 'awaiting_supervisor_review',
    student_vetted_at: db.fn.now(),
    last_comments: null,
    updated_at: db.fn.now(),
  });

  const supervisors = await getStaffEmail('supervisor');
  await queueEmail(caseId, supervisors, 'Title Registration ready for supervisor vetting', `Case #${caseId} has been vetted by the student and awaits your review.`);
  await requestSupervisorProfiles(caseId);
  await syncModuleEntries(caseId, 'awaiting_supervisor_review', 'Awaiting supervisor review');

  const updated = await db<TitleRegistrationCase>('title_registration_cases').where({ id: caseId }).first();
  if (!updated) {
    throw new Error('Case not found after student vetting');
  }
  return updated;
}

export async function supervisorReview(caseId: number, decision: ReviewDecision, comments?: string): Promise<TitleRegistrationCase> {
  return runSupervisorReviewTransition(caseId, decision, comments, {
    db,
    getStaffEmail,
    queueEmail,
    syncModuleEntries,
  });
}

export async function deptReview(caseId: number, decision: ReviewDecision, comments?: string): Promise<TitleRegistrationCase> {
  return runDeptReviewTransition(caseId, decision, comments, {
    db,
    getStaffEmail,
    queueEmail,
    syncModuleEntries,
  });
}

export async function chairpersonSign(caseId: number, comments?: string): Promise<TitleRegistrationCase> {
  return runChairpersonSignTransition(caseId, comments, {
    db,
    getStaffEmail,
    queueEmail,
    syncModuleEntries,
  });
}

export async function deptSendToFaculty(caseId: number): Promise<TitleRegistrationCase> {
  return runDeptSendToFacultyTransition(caseId, {
    db,
    getStaffEmail,
    queueEmail,
    syncModuleEntries,
  });
}

function parseYesNo(input: unknown, defaultValue: 'Yes' | 'No'): 'Yes' | 'No' {
  return input === 'Yes' || input === 'No' ? input : defaultValue;
}

export async function listSupervisorProfiles(caseId: number): Promise<Array<Record<string, unknown>>> {
  return db('supervisor_profile_forms')
    .where({ case_id: caseId })
    .whereNot({ status: 'inactive' })
    .orderBy('role', 'asc')
    .orderBy('created_at', 'asc');
}

export async function updateSupervisorProfile(
  profileId: number,
  patch: Partial<{
    person_title: string;
    qualifications: string;
    contact_email: string;
    external_address: string;
    publication_count: number | null;
    recent_publications: string[];
    contribution_motivation: string;
    new_to_department: 'Yes' | 'No';
    cv_attached: 'Yes' | 'No';
    cv_file_path: string;
  }>,
): Promise<SupervisorProfileForm> {
  const existing = await db<SupervisorProfileForm>('supervisor_profile_forms').where({ id: profileId }).first();
  if (!existing || existing.status === 'inactive') {
    throw new Error('Supervisor profile form not found');
  }

  const publications = Array.isArray(patch.recent_publications) ? patch.recent_publications : parsePublicationEntries(existing.recent_publications_json);
  const publicationCount = typeof patch.publication_count === 'number' ? patch.publication_count : existing.publication_count;

  const updatePayload = {
    person_title: typeof patch.person_title === 'string' ? patch.person_title : existing.person_title,
    qualifications: typeof patch.qualifications === 'string' ? patch.qualifications : existing.qualifications,
    contact_email: typeof patch.contact_email === 'string' ? patch.contact_email : existing.contact_email,
    external_address: typeof patch.external_address === 'string' ? patch.external_address : existing.external_address,
    publication_count: publicationCount,
    recent_publications_json: serializePublicationEntries(publications),
    contribution_motivation: typeof patch.contribution_motivation === 'string' ? patch.contribution_motivation : existing.contribution_motivation,
    new_to_department: parseYesNo(patch.new_to_department, existing.new_to_department),
    cv_attached: parseYesNo(patch.cv_attached, existing.cv_attached),
    cv_file_path: typeof patch.cv_file_path === 'string' ? patch.cv_file_path : existing.cv_file_path,
    updated_at: db.fn.now(),
  };

  await db('supervisor_profile_forms').where({ id: profileId }).update(updatePayload);
  const updated = await db<SupervisorProfileForm>('supervisor_profile_forms').where({ id: profileId }).first();
  if (!updated) {
    throw new Error('Supervisor profile update failed');
  }
  await syncSupervisorProfilesModuleStatus(updated.case_id);
  return updated;
}

export async function submitSupervisorProfile(profileId: number): Promise<SupervisorProfileForm> {
  const profile = await db<SupervisorProfileForm>('supervisor_profile_forms').where({ id: profileId }).first();
  if (!profile || profile.status === 'inactive') {
    throw new Error('Supervisor profile form not found');
  }
  const readiness = isProfileReady(profile);
  if (!readiness.ok) {
    throw new Error(readiness.reason ?? 'Supervisor profile is incomplete.');
  }

  await db('supervisor_profile_forms').where({ id: profileId }).update({
    status: 'completed',
    submitted_at: db.fn.now(),
    updated_at: db.fn.now(),
  });
  const updated = await db<SupervisorProfileForm>('supervisor_profile_forms').where({ id: profileId }).first();
  if (!updated) {
    throw new Error('Supervisor profile submit failed');
  }
  await syncSupervisorProfilesModuleStatus(updated.case_id);
  return updated;
}

export async function requestSupervisorProfiles(caseId: number): Promise<{ requested: number }> {
  const profiles = await db<SupervisorProfileForm>('supervisor_profile_forms')
    .where({ case_id: caseId })
    .whereNot({ status: 'inactive' });
  if (profiles.length === 0) {
    return { requested: 0 };
  }

  const pending = profiles.filter((profile) => profile.status !== 'completed');
  if (pending.length === 0) {
    return { requested: 0 };
  }

  await db('supervisor_profile_forms')
    .whereIn('id', pending.map((profile) => profile.id))
    .update({ status: 'requested', requested_at: db.fn.now(), updated_at: db.fn.now() });

  const { formData } = await getCaseById(caseId);
  const adminRecipients = await getStaffEmail('dept_fhd_rep');
  await queueEmail(
    caseId,
    adminRecipients,
    'Supervisor profile forms require completion',
    `Case #${caseId}: complete ${pending.length} activated supervisor profile form(s) for ${formData['Student Number']} (${formData['Student First-Name']} ${formData['Student Surname']}).`,
  );

  await syncSupervisorProfilesModuleStatus(caseId);
  return { requested: pending.length };
}

export async function sendSupervisorProfilesReminder(caseId: number): Promise<{ sent: boolean; reason?: string }> {
  const profiles = await db<SupervisorProfileForm>('supervisor_profile_forms')
    .where({ case_id: caseId })
    .whereIn('status', ['draft', 'requested']);

  if (profiles.length === 0) {
    return { sent: false, reason: 'No pending supervisor profile forms.' };
  }

  const recipients = await getStaffEmail('dept_fhd_rep');
  await queueEmail(
    caseId,
    recipients,
    'Reminder: pending supervisor profile forms',
    `Case #${caseId} still has ${profiles.length} pending supervisor profile form(s).`,
  );

  await db('supervisor_profile_forms')
    .whereIn('id', profiles.map((profile) => profile.id))
    .update({ last_reminder_at: db.fn.now(), updated_at: db.fn.now() });

  return { sent: true };
}

function sanitizeFilePart(value: string): string {
  return value.replace(/[^a-zA-Z0-9._-]/g, '_');
}

function extractBase64Payload(input: string): string {
  const commaIdx = input.indexOf(',');
  if (input.startsWith('data:') && commaIdx !== -1) {
    return input.slice(commaIdx + 1);
  }
  return input;
}

export async function uploadSupervisorProfileCv(profileId: number, fileName: string, contentBase64: string): Promise<SupervisorProfileForm> {
  const profile = await db<SupervisorProfileForm>('supervisor_profile_forms').where({ id: profileId }).first();
  if (!profile || profile.status === 'inactive') {
    throw new Error('Supervisor profile form not found');
  }
  const { formData } = await getCaseById(profile.case_id);

  const safeName = sanitizeFilePart(fileName || 'cv.pdf');
  const ext = path.extname(safeName).toLowerCase();
  const allowed = new Set(['.pdf', '.doc', '.docx']);
  if (!allowed.has(ext)) {
    throw new Error('CV upload must be a .pdf, .doc, or .docx file.');
  }

  const payload = extractBase64Payload(contentBase64).trim();
  if (!payload) {
    throw new Error('CV upload payload is empty.');
  }

  const repoRoot = resolveRepoRoot();
  const outDir = path.join(repoRoot, 'generated_forms', formData['Student Number'], 'supervisor_profiles');
  await fs.mkdir(outDir, { recursive: true });
  const outFile = path.join(outDir, `profile_${profileId}_cv${ext}`);
  const bytes = Buffer.from(payload, 'base64');
  if (bytes.length === 0) {
    throw new Error('CV upload is empty after decoding.');
  }
  await fs.writeFile(outFile, bytes);

  await db('supervisor_profile_forms').where({ id: profileId }).update({
    cv_file_path: outFile,
    cv_attached: 'Yes',
    updated_at: db.fn.now(),
  });

  const updated = await db<SupervisorProfileForm>('supervisor_profile_forms').where({ id: profileId }).first();
  if (!updated) {
    throw new Error('Failed to persist uploaded CV path');
  }
  await syncSupervisorProfilesModuleStatus(updated.case_id);
  return updated;
}

export async function facultyReview(caseId: number, decision: ReviewDecision, comments?: string): Promise<TitleRegistrationCase> {
  return runFacultyReviewTransition(caseId, decision, comments, {
    db,
    getStaffEmail,
    queueEmail,
    syncModuleEntries,
  });
}

export async function sendFacultyReminderIfDue(caseId: number): Promise<{ sent: boolean; reason?: string }> {
  return runFacultyReminderTransition(caseId, {
    db,
    getStaffEmail,
    queueEmail,
  });
}

export async function listPipeline(): Promise<Array<Record<string, unknown>>> {
  return listPipelineItems();
}

export async function listTasks(): Promise<Array<Record<string, unknown>>> {
  return listTaskItems();
}

export async function listExternalInvitesForCase(caseId: number): Promise<Array<Record<string, unknown>>> {
  return listExternalInviteItems(caseId);
}

export async function listToDoItems(): Promise<Array<Record<string, unknown>>> {
  return listToDoEntries();
}

export async function listPeople(): Promise<Array<Record<string, unknown>>> {
  return listPeopleEntries();
}

export async function listNotifications(caseId?: number): Promise<Array<Record<string, unknown>>> {
  return listNotificationEntries(caseId);
}
