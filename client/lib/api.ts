import type {
  AddCoSupervisorFormData,
  AppointArbiterFormData,
  AppointExaminersFormData,
  CaseStatus,
  ChangeExaminersFormData,
  ChangeSupervisorFormData,
  ChangeTitleFormData,
  ExaminerSummaryCvFormData,
  FormData,
  IntentionToSubmitFormData,
  ModuleFormRecord,
  ModuleReviewDecision,
  MouFormData,
  MouFormRecord,
  ReviewDecision,
  SupervisorProfileForm,
  TitleRegistrationCase,
} from '@fhd/common-types';

export type {
  AddCoSupervisorFormData,
  AppointArbiterFormData,
  AppointExaminersFormData,
  CaseStatus,
  ChangeExaminersFormData,
  ChangeSupervisorFormData,
  ChangeTitleFormData,
  ExaminerSummaryCvFormData,
  FormData,
  IntentionToSubmitFormData,
  ModuleFormRecord,
  ModuleReviewDecision,
  MouFormData,
  MouFormRecord,
  ReviewDecision,
  SupervisorProfileForm,
  TitleRegistrationCase,
} from '@fhd/common-types';

export interface SasiStudent {
  id: number;
  student_number: string;
  title: string | null;
  first_names: string;
  last_name: string;
  email: string | null;
  faculty: string;
  department: string;
  degree_level: 'MSC' | 'PHD';
  degree_type: 'FULL_THESIS' | 'MINI_THESIS' | 'PROJECT';
  registration_type: 'FULL_TIME' | 'PART_TIME';
  registration_active: number;
  first_enrolment_year: number;
  first_registration_date: string | null;
  first_registration_semester: number | null;
  expected_completion_date: string | null;
  thesis_title: string | null;
  ethics_required: number;
  ethics_ref_number: string | null;
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

export interface LandingMessage {
  id: number;
  scope: 'faculty' | 'department';
  departmentName: string | null;
  message: string;
  activeFrom: string | null;
  activeUntil: string | null;
  createdAt: string;
  updatedAt: string;
}

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

export interface DepartmentDirectory {
  id: number;
  faculty_name: string;
  department_name: string;
}

export interface StaffDirectory {
  id: number;
  staff_number: string | null;
  staff_name: string;
  staff_title: string | null;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string | null;
  position_title: string | null;
  highest_qualification: string | null;
  employee_type: string | null;
  faculty_role: string | null;
  office_location: string | null;
  campus: string | null;
  orcid: string | null;
  google_scholar_url: string | null;
  scopus_id: string | null;
  research_specialisations: string | null;
  is_nrf_rated: number;
  nrf_rating: string | null;
  available_as_supervisor: number;
  available_as_co_supervisor: number;
  available_as_examiner: number;
  available_as_arbiter: number;
  can_serve_as_chair: number;
  can_sign_hod_delegate: number;
  max_supervision_load: number;
  current_supervision_load: number;
  max_examiner_load: number;
  current_examiner_load: number;
  availability_notes: string;
  active_status: number;
  faculty_name: string;
  department_name: string;
  is_internal: number;
}

export interface ExternalAcademicDirectory {
  id: number;
  title: string;
  first_name: string;
  middle_names: string;
  preferred_name: string;
  last_name: string;
  full_name: string;
  unique_identifier_type: string;
  unique_identifier_value: string;
  normalized_unique_identifier: string | null;
  highest_qualification: string;
  email: string;
  alternate_email: string;
  preferred_contact_method: string;
  address: string;
  city: string;
  province_state: string;
  postal_code: string;
  affiliation_institution: string;
  affiliation_department: string;
  affiliation_position_title: string;
  country: string;
  phone: string;
  orcid: string;
  website_url: string;
  google_scholar_url: string;
  scopus_id: string;
  expertise_keywords: string;
  eligible_as_supervisor: number;
  eligible_as_examiner: number;
  eligible_as_arbiter: number;
  eligible_for_masters: number;
  eligible_for_phd: number;
  is_international: number;
  is_former_uwc_staff: number;
  is_former_uwc_student: number;
  cv_last_received_on: string | null;
  cv_file_path: string;
  last_appointed_supervisor_on: string | null;
  last_appointed_examiner_on: string | null;
  last_appointed_arbiter_on: string | null;
  max_active_assignments: number;
  current_active_assignments: number;
  conflict_of_interest_notes: string;
  active_status: number;
  notes: string;
}

export type ExternalIdentifierType = 'SA_ID' | 'PASSPORT' | 'OTHER';

export interface ExternalAcademicInviteDetails {
  role: 'supervisor' | 'admin' | 'co1' | 'co2';
  email: string;
  expiresAt: string | null;
  caseId: number | null;
  studentName: string;
  thesisType: string;
  thesisTitle: string;
  inviteeTitle: string;
  inviteeFirstName: string;
  inviteeSurname: string;
}

export interface ExternalInviteStatus {
  role: 'supervisor' | 'admin' | 'co1' | 'co2';
  email: string;
  status: 'pending' | 'completed' | 'expired';
  expiresAt: string | null;
  completedAt: string | null;
  updatedAt: string | null;
  inviteLink: string;
  deliveryStatus: 'sent' | 'queued' | 'failed';
  externalAcademicId: number | null;
}

export interface ExternalAcademicProfilePayload {
  title: string;
  first_name: string;
  middle_names?: string;
  preferred_name?: string;
  last_name: string;
  highest_qualification: string;
  email: string;
  alternate_email?: string;
  preferred_contact_method?: string;
  address: string;
  city?: string;
  province_state?: string;
  postal_code?: string;
  country: string;
  phone?: string;
  affiliation_institution?: string;
  affiliation_department?: string;
  affiliation_position_title?: string;
  orcid?: string;
  website_url?: string;
  google_scholar_url?: string;
  scopus_id?: string;
  expertise_keywords?: string;
  identifier_type: ExternalIdentifierType;
  identifier_value: string;
}

interface AuthUser {
  id: number;
  sasiId: string;
  role: 'student' | 'supervisor' | 'dept_hd_rep' | 'dept_chairperson' | 'faculty_hd_rep' | 'system_admin' | 'admin';
  firstName: string;
  lastName: string;
}

function resolveApiBase(): string {
  const configured = process.env.NEXT_PUBLIC_API_BASE?.trim();
  if (configured) {
    return configured.replace(/\/+$/, '');
  }
  if (typeof window !== 'undefined') {
    return `${window.location.origin}/api/v1`;
  }
  return '/api/v1';
}

export function resolveApiOrigin(): string {
  const configured = process.env.NEXT_PUBLIC_API_BASE?.trim();
  if (configured) {
    try {
      return new URL(configured).origin;
    } catch {
      return configured.replace(/\/api\/v1\/?$/, '');
    }
  }
  if (typeof window !== 'undefined') {
    if (window.location.port === '3000') {
      return `${window.location.protocol}//${window.location.hostname}:3001`;
    }
    return window.location.origin;
  }
  return '';
}

const apiBase = resolveApiBase();

function candidateApiBases(): string[] {
  if (typeof window === 'undefined') {
    return [apiBase];
  }
  const configured = process.env.NEXT_PUBLIC_API_BASE?.trim();
  if (configured) {
    return [configured.replace(/\/+$/, '')];
  }
  const candidates = [`${window.location.origin}/api/v1`];
  if (window.location.port === '3000') {
    candidates.push(`${window.location.protocol}//${window.location.hostname}:3001/api/v1`);
  }
  return Array.from(new Set(candidates.map((value) => value.replace(/\/+$/, ''))));
}

const demoActorSasiIds = {
  student: '1234567',
  supervisor: 'STAFF-001',
  dept: 'STAFF-003',
  chair: 'STAFF-005',
  faculty: 'STAFF-004',
} as const;
type AdminActor = 'faculty' | 'dept';
export type PolicyAdminActor = AdminActor | 'student';

const tokenCacheByActor = new Map<string, string>();
let activeStudentActorSasiId: string = demoActorSasiIds.student;
let activePolicyAdminActor: PolicyAdminActor = 'faculty';
const SASI_STUDENT_NUMBER_PATTERN = /^\d{7}$/;

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const bases = candidateApiBases();
  let lastError: string | null = null;

  for (const base of bases) {
    const url = `${base}${path}`;
    let response: Response;
    try {
      response = await fetch(url, {
        ...init,
        headers: {
          'Content-Type': 'application/json',
          ...(init?.headers ?? {}),
        },
        cache: 'no-store',
      });
    } catch (error) {
      lastError = error instanceof Error ? error.message : 'Network error';
      continue;
    }

    const contentType = response.headers.get('content-type') ?? '';
    const bodyText = await response.text();
    if (!contentType.toLowerCase().includes('application/json')) {
      lastError = `API at ${base} returned non-JSON response (${response.status}).`;
      continue;
    }

    let payload: (T & { message?: string }) | null = null;
    try {
      payload = JSON.parse(bodyText) as T & { message?: string };
    } catch {
      lastError = `API at ${base} returned invalid JSON (${response.status}).`;
      continue;
    }

    if (!response.ok) {
      throw new Error(payload.message ?? `Request failed (${response.status})`);
    }
    return payload;
  }

  throw new Error(
    `Cannot reach API. Checked: ${bases.join(', ')}. Start the server with "npm run dev:server" and set NEXT_PUBLIC_API_BASE if needed. ${lastError ? `(${lastError})` : ''}`,
  );
}

async function devLogin(sasiId: string): Promise<{ token: string; user: AuthUser }> {
  return request('/auth/dev-login', {
    method: 'POST',
    body: JSON.stringify({ sasiId }),
  });
}

async function authHeadersForActor(actorSasiId: string): Promise<Record<string, string>> {
  let token = tokenCacheByActor.get(actorSasiId);
  if (!token) {
    const result = await devLogin(actorSasiId);
    token = result.token;
    tokenCacheByActor.set(actorSasiId, token);
  }
  return { Authorization: `Bearer ${token}` };
}

async function studentAuthHeaders(): Promise<Record<string, string>> {
  return authHeadersForActor(activeStudentActorSasiId);
}

export function setActivePolicyAdminActor(actor: PolicyAdminActor): void {
  activePolicyAdminActor = actor;
}

function resolvePolicyAdminActor(actor?: PolicyAdminActor): PolicyAdminActor {
  return actor ?? activePolicyAdminActor;
}

async function policyAdminAuthHeaders(actor?: PolicyAdminActor): Promise<Record<string, string>> {
  const resolved = resolvePolicyAdminActor(actor);
  if (resolved === 'student') {
    return authHeadersForActor(demoActorSasiIds.student);
  }
  return authHeadersForActor(demoActorSasiIds[resolved]);
}

export async function checkSasi(studentNumber: string): Promise<{
  eligible: boolean;
  reasons: string[];
  student?: SasiStudent;
  caseRecord?: TitleRegistrationCase;
  formData?: FormData;
  policyWarnings?: PolicyWarning[];
  facultyCalendar?: FacultyProcessCalendar;
  landingMessages?: LandingMessage[];
}> {
  const normalizedStudentNumber = studentNumber.trim();
  if (!SASI_STUDENT_NUMBER_PATTERN.test(normalizedStudentNumber)) {
    throw new Error('SASI student number must be exactly 7 digits.');
  }
  if (normalizedStudentNumber) {
    activeStudentActorSasiId = normalizedStudentNumber;
  }
  const headers = await studentAuthHeaders();
  return request(`/title-registration/sasi/${studentNumber}/check`, { headers });
}

export async function getFacultyCalendar(year?: number): Promise<{ calendar: FacultyProcessCalendar }> {
  const query = typeof year === 'number' ? `?year=${year}` : '';
  const headers = await studentAuthHeaders();
  return request(`/title-registration/faculty-calendar${query}`, { headers });
}

export async function patchFacultyCalendar(
  year: number,
  patch: {
    rottSubmissionDeadline?: string | null;
    progressReportDeadline?: string | null;
    intentionToSubmitDeadline?: string | null;
    appointExaminersDeadline?: string | null;
    publishedNotice?: string | null;
  },
  actor?: PolicyAdminActor,
): Promise<{ calendar: FacultyProcessCalendar }> {
  const headers = await policyAdminAuthHeaders(actor);
  return request(`/title-registration/faculty-calendar/${year}`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify(patch),
  });
}

export async function getLandingMessages(params?: { caseId?: number; department?: string }): Promise<{ data: LandingMessage[] }> {
  const query = new URLSearchParams();
  if (typeof params?.caseId === 'number') query.set('caseId', String(params.caseId));
  if (params?.department?.trim()) query.set('department', params.department.trim());
  const suffix = query.toString() ? `?${query.toString()}` : '';
  const headers = await studentAuthHeaders();
  return request(`/title-registration/landing-messages${suffix}`, { headers });
}

export async function getManagedLandingMessages(actor?: PolicyAdminActor): Promise<{ data: LandingMessage[] }> {
  const headers = await policyAdminAuthHeaders(actor);
  return request('/title-registration/landing-messages/manage', { headers });
}

export async function createLandingMessage(
  payload: {
    scope: 'faculty' | 'department';
    departmentName?: string | null;
    message: string;
    activeFrom?: string | null;
    activeUntil?: string | null;
  },
  actor?: PolicyAdminActor,
): Promise<{ message: LandingMessage }> {
  const headers = await policyAdminAuthHeaders(actor);
  return request('/title-registration/landing-messages', {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  });
}

export async function patchLandingMessage(
  messageId: number,
  payload: {
    message?: string;
    activeFrom?: string | null;
    activeUntil?: string | null;
  },
  actor?: PolicyAdminActor,
): Promise<{ message: LandingMessage }> {
  const headers = await policyAdminAuthHeaders(actor);
  return request(`/title-registration/landing-messages/${messageId}`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify(payload),
  });
}

export async function patchForm(caseId: number, patch: Partial<FormData>): Promise<{ case: TitleRegistrationCase; formData: FormData }> {
  const headers = await studentAuthHeaders();
  return request(`/title-registration/cases/${caseId}/form`, { method: 'PATCH', headers, body: JSON.stringify(patch) });
}

export async function generatePrintPdf(caseId: number): Promise<{ pdfPath: string }> {
  const headers = await studentAuthHeaders();
  return request(`/title-registration/cases/${caseId}/print`, { method: 'POST', headers });
}

export async function studentVet(caseId: number): Promise<{ case: TitleRegistrationCase }> {
  const headers = await studentAuthHeaders();
  return request(`/title-registration/cases/${caseId}/student-vet`, {
    method: 'POST',
    headers,
  });
}

export async function supervisorReview(caseId: number, decision: ReviewDecision, comments?: string): Promise<{ case: TitleRegistrationCase }> {
  const headers = await authHeadersForActor(demoActorSasiIds.supervisor);
  return request(`/title-registration/cases/${caseId}/supervisor-review`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ decision, comments }),
  });
}

export async function deptReview(caseId: number, decision: ReviewDecision, comments?: string): Promise<{ case: TitleRegistrationCase }> {
  const headers = await authHeadersForActor(demoActorSasiIds.dept);
  return request(`/title-registration/cases/${caseId}/dept-review`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ decision, comments }),
  });
}

export async function chairpersonSign(caseId: number, comments?: string): Promise<{ case: TitleRegistrationCase }> {
  const headers = await authHeadersForActor(demoActorSasiIds.chair);
  return request(`/title-registration/cases/${caseId}/chairperson-sign`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ comments }),
  });
}

export async function deptSendFaculty(caseId: number): Promise<{ case: TitleRegistrationCase }> {
  const headers = await authHeadersForActor(demoActorSasiIds.dept);
  return request(`/title-registration/cases/${caseId}/dept-send-faculty`, {
    method: 'POST',
    headers,
  });
}

export async function facultyReview(caseId: number, decision: ReviewDecision, comments?: string): Promise<{ case: TitleRegistrationCase }> {
  const headers = await authHeadersForActor(demoActorSasiIds.faculty);
  return request(`/title-registration/cases/${caseId}/faculty-review`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ decision, comments }),
  });
}

export async function sendReminder(caseId: number): Promise<{ sent: boolean; reason?: string }> {
  const headers = await authHeadersForActor(demoActorSasiIds.dept);
  return request(`/title-registration/cases/${caseId}/reminder`, {
    method: 'POST',
    headers,
  });
}

export async function getPipeline(): Promise<{ data: Array<Record<string, unknown>> }> {
  const headers = await studentAuthHeaders();
  return request('/title-registration/pipeline', { headers });
}

export async function getTasks(): Promise<{ data: Array<Record<string, unknown>> }> {
  const headers = await studentAuthHeaders();
  return request('/title-registration/tasks', { headers });
}

export async function getToDo(): Promise<{ data: Array<Record<string, unknown>> }> {
  const headers = await studentAuthHeaders();
  return request('/title-registration/to-do', { headers });
}

export async function getPeople(): Promise<{ data: Array<Record<string, unknown>> }> {
  const headers = await studentAuthHeaders();
  return request('/title-registration/people', { headers });
}

export async function getNotifications(caseId?: number): Promise<{ data: Array<Record<string, unknown>> }> {
  const query = typeof caseId === 'number' ? `?caseId=${caseId}` : '';
  const headers = await studentAuthHeaders();
  return request(`/title-registration/notifications${query}`, { headers });
}

export async function getSupervisorProfiles(caseId: number): Promise<{ data: SupervisorProfileForm[] }> {
  const headers = await studentAuthHeaders();
  return request(`/title-registration/cases/${caseId}/supervisor-profiles`, { headers });
}

export async function getExternalInviteStatuses(caseId: number): Promise<{ data: ExternalInviteStatus[] }> {
  const headers = await studentAuthHeaders();
  return request(`/title-registration/cases/${caseId}/external-invites`, { headers });
}

export async function patchSupervisorProfile(
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
  }>,
): Promise<{ profile: SupervisorProfileForm }> {
  const headers = await authHeadersForActor(demoActorSasiIds.supervisor);
  return request(`/title-registration/supervisor-profiles/${profileId}`, { method: 'PATCH', headers, body: JSON.stringify(patch) });
}

export async function submitSupervisorProfile(profileId: number): Promise<{ profile: SupervisorProfileForm }> {
  const headers = await authHeadersForActor(demoActorSasiIds.supervisor);
  return request(`/title-registration/supervisor-profiles/${profileId}/submit`, { method: 'POST', headers });
}

export async function requestSupervisorProfiles(caseId: number): Promise<{ requested: number }> {
  const headers = await studentAuthHeaders();
  return request(`/title-registration/cases/${caseId}/supervisor-profiles/request`, { method: 'POST', headers });
}

export async function sendSupervisorProfilesReminder(caseId: number): Promise<{ sent: boolean; reason?: string }> {
  const headers = await authHeadersForActor(demoActorSasiIds.dept);
  return request(`/title-registration/cases/${caseId}/supervisor-profiles/reminder`, { method: 'POST', headers });
}

export async function uploadSupervisorProfileCv(
  profileId: number,
  payload: { fileName: string; contentBase64: string },
): Promise<{ profile: SupervisorProfileForm }> {
  const headers = await authHeadersForActor(demoActorSasiIds.supervisor);
  return request(`/title-registration/supervisor-profiles/${profileId}/upload-cv`, { method: 'POST', headers, body: JSON.stringify(payload) });
}

export async function getMou(caseId: number): Promise<{ record: MouFormRecord; formData: MouFormData }> {
  const headers = await studentAuthHeaders();
  return request(`/title-registration/cases/${caseId}/mou`, { headers });
}

export async function patchMou(caseId: number, patch: Partial<MouFormData>): Promise<{ record: MouFormRecord; formData: MouFormData }> {
  const headers = await studentAuthHeaders();
  return request(`/title-registration/cases/${caseId}/mou`, { method: 'PATCH', headers, body: JSON.stringify(patch) });
}

export async function completeMou(caseId: number): Promise<{ record: MouFormRecord }> {
  const headers = await studentAuthHeaders();
  return request(`/title-registration/cases/${caseId}/mou/complete`, { method: 'POST', headers });
}

export async function printMou(caseId: number): Promise<{ pdfPath: string }> {
  const headers = await studentAuthHeaders();
  return request(`/title-registration/cases/${caseId}/mou/print`, { method: 'POST', headers });
}

export async function getIntentionToSubmit(caseId: number): Promise<{ record: ModuleFormRecord; formData: IntentionToSubmitFormData }> {
  const headers = await studentAuthHeaders();
  return request(`/title-registration/cases/${caseId}/intention-to-submit`, { headers });
}

export async function patchIntentionToSubmit(
  caseId: number,
  patch: Partial<IntentionToSubmitFormData>,
): Promise<{ record: ModuleFormRecord; formData: IntentionToSubmitFormData }> {
  const headers = await studentAuthHeaders();
  return request(`/title-registration/cases/${caseId}/intention-to-submit`, { method: 'PATCH', headers, body: JSON.stringify(patch) });
}

export async function submitIntentionToSubmit(caseId: number): Promise<{ record: ModuleFormRecord }> {
  const headers = await studentAuthHeaders();
  return request(`/title-registration/cases/${caseId}/intention-to-submit/submit`, { method: 'POST', headers });
}

export async function reviewIntentionToSubmitBySupervisor(caseId: number, decision: ModuleReviewDecision): Promise<{ record: ModuleFormRecord }> {
  const headers = await authHeadersForActor(demoActorSasiIds.supervisor);
  return request(`/title-registration/cases/${caseId}/intention-to-submit/supervisor-review`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ decision }),
  });
}

export async function reviewIntentionToSubmitByDept(caseId: number, decision: ModuleReviewDecision): Promise<{ record: ModuleFormRecord }> {
  const headers = await authHeadersForActor(demoActorSasiIds.dept);
  return request(`/title-registration/cases/${caseId}/intention-to-submit/dept-review`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ decision }),
  });
}

export async function printIntentionToSubmit(caseId: number): Promise<{ pdfPath: string }> {
  const headers = await studentAuthHeaders();
  return request(`/title-registration/cases/${caseId}/intention-to-submit/print`, { method: 'POST', headers });
}

export async function getAppointExaminers(caseId: number): Promise<{ record: ModuleFormRecord; formData: AppointExaminersFormData }> {
  const headers = await studentAuthHeaders();
  return request(`/title-registration/cases/${caseId}/appoint-examiners`, { headers });
}

export async function patchAppointExaminers(
  caseId: number,
  patch: Partial<AppointExaminersFormData>,
): Promise<{ record: ModuleFormRecord; formData: AppointExaminersFormData }> {
  const headers = await authHeadersForActor(demoActorSasiIds.supervisor);
  return request(`/title-registration/cases/${caseId}/appoint-examiners`, { method: 'PATCH', headers, body: JSON.stringify(patch) });
}

export async function submitAppointExaminers(caseId: number): Promise<{ record: ModuleFormRecord }> {
  const headers = await authHeadersForActor(demoActorSasiIds.supervisor);
  return request(`/title-registration/cases/${caseId}/appoint-examiners/submit`, { method: 'POST', headers });
}

export async function reviewAppointExaminersByDept(caseId: number, decision: ModuleReviewDecision): Promise<{ record: ModuleFormRecord }> {
  const headers = await authHeadersForActor(demoActorSasiIds.dept);
  return request(`/title-registration/cases/${caseId}/appoint-examiners/dept-review`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ decision }),
  });
}

export async function reviewAppointExaminersByChair(caseId: number, decision: ModuleReviewDecision): Promise<{ record: ModuleFormRecord }> {
  const headers = await authHeadersForActor(demoActorSasiIds.chair);
  return request(`/title-registration/cases/${caseId}/appoint-examiners/chairperson-review`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ decision }),
  });
}

export async function reviewAppointExaminersByFaculty(caseId: number, decision: ModuleReviewDecision): Promise<{ record: ModuleFormRecord }> {
  const headers = await authHeadersForActor(demoActorSasiIds.faculty);
  return request(`/title-registration/cases/${caseId}/appoint-examiners/faculty-review`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ decision }),
  });
}

export async function printAppointExaminers(caseId: number): Promise<{ pdfPath: string }> {
  const headers = await authHeadersForActor(demoActorSasiIds.supervisor);
  return request(`/title-registration/cases/${caseId}/appoint-examiners/print`, { method: 'POST', headers });
}

export async function getChangeExaminers(caseId: number): Promise<{ record: ModuleFormRecord; formData: ChangeExaminersFormData }> {
  const headers = await studentAuthHeaders();
  return request(`/title-registration/cases/${caseId}/change-examiners`, { headers });
}

export async function patchChangeExaminers(
  caseId: number,
  patch: Partial<ChangeExaminersFormData>,
): Promise<{ record: ModuleFormRecord; formData: ChangeExaminersFormData }> {
  const headers = await authHeadersForActor(demoActorSasiIds.supervisor);
  return request(`/title-registration/cases/${caseId}/change-examiners`, { method: 'PATCH', headers, body: JSON.stringify(patch) });
}

export async function submitChangeExaminers(caseId: number): Promise<{ record: ModuleFormRecord }> {
  const headers = await authHeadersForActor(demoActorSasiIds.supervisor);
  return request(`/title-registration/cases/${caseId}/change-examiners/submit`, { method: 'POST', headers });
}

export async function reviewChangeExaminersByDept(caseId: number, decision: ModuleReviewDecision): Promise<{ record: ModuleFormRecord }> {
  const headers = await authHeadersForActor(demoActorSasiIds.dept);
  return request(`/title-registration/cases/${caseId}/change-examiners/dept-review`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ decision }),
  });
}

export async function reviewChangeExaminersByChair(caseId: number, decision: ModuleReviewDecision): Promise<{ record: ModuleFormRecord }> {
  const headers = await authHeadersForActor(demoActorSasiIds.chair);
  return request(`/title-registration/cases/${caseId}/change-examiners/chairperson-review`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ decision }),
  });
}

export async function reviewChangeExaminersByFaculty(caseId: number, decision: ModuleReviewDecision): Promise<{ record: ModuleFormRecord }> {
  const headers = await authHeadersForActor(demoActorSasiIds.faculty);
  return request(`/title-registration/cases/${caseId}/change-examiners/faculty-review`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ decision }),
  });
}

export async function printChangeExaminers(caseId: number): Promise<{ pdfPath: string }> {
  const headers = await authHeadersForActor(demoActorSasiIds.supervisor);
  return request(`/title-registration/cases/${caseId}/change-examiners/print`, { method: 'POST', headers });
}

export async function getExaminerSummaryCv(caseId: number): Promise<{ record: ModuleFormRecord; formData: ExaminerSummaryCvFormData }> {
  const headers = await studentAuthHeaders();
  return request(`/title-registration/cases/${caseId}/examiner-summary-cv`, { headers });
}

export async function patchExaminerSummaryCv(
  caseId: number,
  patch: Partial<ExaminerSummaryCvFormData>,
): Promise<{ record: ModuleFormRecord; formData: ExaminerSummaryCvFormData }> {
  const headers = await authHeadersForActor(demoActorSasiIds.supervisor);
  return request(`/title-registration/cases/${caseId}/examiner-summary-cv`, { method: 'PATCH', headers, body: JSON.stringify(patch) });
}

export async function submitExaminerSummaryCv(caseId: number): Promise<{ record: ModuleFormRecord }> {
  const headers = await authHeadersForActor(demoActorSasiIds.supervisor);
  return request(`/title-registration/cases/${caseId}/examiner-summary-cv/submit`, { method: 'POST', headers });
}

export async function reviewExaminerSummaryCvByDept(caseId: number, decision: ModuleReviewDecision): Promise<{ record: ModuleFormRecord }> {
  const headers = await authHeadersForActor(demoActorSasiIds.dept);
  return request(`/title-registration/cases/${caseId}/examiner-summary-cv/dept-review`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ decision }),
  });
}

export async function reviewExaminerSummaryCvByFaculty(caseId: number, decision: ModuleReviewDecision): Promise<{ record: ModuleFormRecord }> {
  const headers = await authHeadersForActor(demoActorSasiIds.faculty);
  return request(`/title-registration/cases/${caseId}/examiner-summary-cv/faculty-review`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ decision }),
  });
}

export async function printExaminerSummaryCv(caseId: number): Promise<{ pdfPath: string }> {
  const headers = await authHeadersForActor(demoActorSasiIds.supervisor);
  return request(`/title-registration/cases/${caseId}/examiner-summary-cv/print`, { method: 'POST', headers });
}

export async function getAppointArbiter(caseId: number): Promise<{ record: ModuleFormRecord; formData: AppointArbiterFormData }> {
  const headers = await studentAuthHeaders();
  return request(`/title-registration/cases/${caseId}/appoint-arbiter`, { headers });
}

export async function patchAppointArbiter(
  caseId: number,
  patch: Partial<AppointArbiterFormData>,
): Promise<{ record: ModuleFormRecord; formData: AppointArbiterFormData }> {
  const headers = await authHeadersForActor(demoActorSasiIds.supervisor);
  return request(`/title-registration/cases/${caseId}/appoint-arbiter`, { method: 'PATCH', headers, body: JSON.stringify(patch) });
}

export async function submitAppointArbiter(caseId: number): Promise<{ record: ModuleFormRecord }> {
  const headers = await authHeadersForActor(demoActorSasiIds.supervisor);
  return request(`/title-registration/cases/${caseId}/appoint-arbiter/submit`, { method: 'POST', headers });
}

export async function reviewAppointArbiterByDept(caseId: number, decision: ModuleReviewDecision): Promise<{ record: ModuleFormRecord }> {
  const headers = await authHeadersForActor(demoActorSasiIds.dept);
  return request(`/title-registration/cases/${caseId}/appoint-arbiter/dept-review`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ decision }),
  });
}

export async function reviewAppointArbiterByFaculty(caseId: number, decision: ModuleReviewDecision): Promise<{ record: ModuleFormRecord }> {
  const headers = await authHeadersForActor(demoActorSasiIds.faculty);
  return request(`/title-registration/cases/${caseId}/appoint-arbiter/faculty-review`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ decision }),
  });
}

export async function printAppointArbiter(caseId: number): Promise<{ pdfPath: string }> {
  const headers = await authHeadersForActor(demoActorSasiIds.supervisor);
  return request(`/title-registration/cases/${caseId}/appoint-arbiter/print`, { method: 'POST', headers });
}

export async function getChangeTitle(caseId: number): Promise<{ record: ModuleFormRecord; formData: ChangeTitleFormData }> {
  const headers = await studentAuthHeaders();
  return request(`/title-registration/cases/${caseId}/change-title`, { headers });
}

export async function patchChangeTitle(caseId: number, patch: Partial<ChangeTitleFormData>): Promise<{ record: ModuleFormRecord; formData: ChangeTitleFormData }> {
  const headers = await studentAuthHeaders();
  return request(`/title-registration/cases/${caseId}/change-title`, { method: 'PATCH', headers, body: JSON.stringify(patch) });
}

export async function submitChangeTitle(caseId: number): Promise<{ record: ModuleFormRecord }> {
  const headers = await studentAuthHeaders();
  return request(`/title-registration/cases/${caseId}/change-title/submit`, { method: 'POST', headers });
}

export async function reviewChangeTitleBySupervisor(caseId: number, decision: ModuleReviewDecision): Promise<{ record: ModuleFormRecord }> {
  const headers = await authHeadersForActor(demoActorSasiIds.supervisor);
  return request(`/title-registration/cases/${caseId}/change-title/supervisor-review`, { method: 'POST', headers, body: JSON.stringify({ decision }) });
}

export async function reviewChangeTitleByDept(caseId: number, decision: ModuleReviewDecision): Promise<{ record: ModuleFormRecord }> {
  const headers = await authHeadersForActor(demoActorSasiIds.dept);
  return request(`/title-registration/cases/${caseId}/change-title/dept-review`, { method: 'POST', headers, body: JSON.stringify({ decision }) });
}

export async function reviewChangeTitleByChair(caseId: number, decision: ModuleReviewDecision): Promise<{ record: ModuleFormRecord }> {
  const headers = await authHeadersForActor(demoActorSasiIds.chair);
  return request(`/title-registration/cases/${caseId}/change-title/chairperson-review`, { method: 'POST', headers, body: JSON.stringify({ decision }) });
}

export async function reviewChangeTitleByFaculty(caseId: number, decision: ModuleReviewDecision): Promise<{ record: ModuleFormRecord }> {
  const headers = await authHeadersForActor(demoActorSasiIds.faculty);
  return request(`/title-registration/cases/${caseId}/change-title/faculty-review`, { method: 'POST', headers, body: JSON.stringify({ decision }) });
}

export async function printChangeTitle(caseId: number): Promise<{ pdfPath: string }> {
  const headers = await studentAuthHeaders();
  return request(`/title-registration/cases/${caseId}/change-title/print`, { method: 'POST', headers });
}

export async function getChangeSupervisor(caseId: number): Promise<{ record: ModuleFormRecord; formData: ChangeSupervisorFormData }> {
  const headers = await studentAuthHeaders();
  return request(`/title-registration/cases/${caseId}/change-supervisor`, { headers });
}

export async function patchChangeSupervisor(
  caseId: number,
  patch: Partial<ChangeSupervisorFormData>,
): Promise<{ record: ModuleFormRecord; formData: ChangeSupervisorFormData }> {
  const headers = await studentAuthHeaders();
  return request(`/title-registration/cases/${caseId}/change-supervisor`, { method: 'PATCH', headers, body: JSON.stringify(patch) });
}

export async function submitChangeSupervisor(caseId: number): Promise<{ record: ModuleFormRecord }> {
  const headers = await studentAuthHeaders();
  return request(`/title-registration/cases/${caseId}/change-supervisor/submit`, { method: 'POST', headers });
}

export async function reviewChangeSupervisorBySupervisor(caseId: number, decision: ModuleReviewDecision): Promise<{ record: ModuleFormRecord }> {
  const headers = await authHeadersForActor(demoActorSasiIds.supervisor);
  return request(`/title-registration/cases/${caseId}/change-supervisor/supervisor-review`, { method: 'POST', headers, body: JSON.stringify({ decision }) });
}

export async function reviewChangeSupervisorByDept(caseId: number, decision: ModuleReviewDecision): Promise<{ record: ModuleFormRecord }> {
  const headers = await authHeadersForActor(demoActorSasiIds.dept);
  return request(`/title-registration/cases/${caseId}/change-supervisor/dept-review`, { method: 'POST', headers, body: JSON.stringify({ decision }) });
}

export async function reviewChangeSupervisorByChair(caseId: number, decision: ModuleReviewDecision): Promise<{ record: ModuleFormRecord }> {
  const headers = await authHeadersForActor(demoActorSasiIds.chair);
  return request(`/title-registration/cases/${caseId}/change-supervisor/chairperson-review`, { method: 'POST', headers, body: JSON.stringify({ decision }) });
}

export async function reviewChangeSupervisorByFaculty(caseId: number, decision: ModuleReviewDecision): Promise<{ record: ModuleFormRecord }> {
  const headers = await authHeadersForActor(demoActorSasiIds.faculty);
  return request(`/title-registration/cases/${caseId}/change-supervisor/faculty-review`, { method: 'POST', headers, body: JSON.stringify({ decision }) });
}

export async function printChangeSupervisor(caseId: number): Promise<{ pdfPath: string }> {
  const headers = await studentAuthHeaders();
  return request(`/title-registration/cases/${caseId}/change-supervisor/print`, { method: 'POST', headers });
}

export async function getAddCoSupervisor(caseId: number): Promise<{ record: ModuleFormRecord; formData: AddCoSupervisorFormData }> {
  const headers = await studentAuthHeaders();
  return request(`/title-registration/cases/${caseId}/add-co-supervisor`, { headers });
}

export async function patchAddCoSupervisor(caseId: number, patch: Partial<AddCoSupervisorFormData>): Promise<{ record: ModuleFormRecord; formData: AddCoSupervisorFormData }> {
  const headers = await studentAuthHeaders();
  return request(`/title-registration/cases/${caseId}/add-co-supervisor`, { method: 'PATCH', headers, body: JSON.stringify(patch) });
}

export async function submitAddCoSupervisor(caseId: number): Promise<{ record: ModuleFormRecord }> {
  const headers = await studentAuthHeaders();
  return request(`/title-registration/cases/${caseId}/add-co-supervisor/submit`, { method: 'POST', headers });
}

export async function reviewAddCoSupervisorBySupervisor(caseId: number, decision: ModuleReviewDecision): Promise<{ record: ModuleFormRecord }> {
  const headers = await authHeadersForActor(demoActorSasiIds.supervisor);
  return request(`/title-registration/cases/${caseId}/add-co-supervisor/supervisor-review`, { method: 'POST', headers, body: JSON.stringify({ decision }) });
}

export async function reviewAddCoSupervisorByDept(caseId: number, decision: ModuleReviewDecision): Promise<{ record: ModuleFormRecord }> {
  const headers = await authHeadersForActor(demoActorSasiIds.dept);
  return request(`/title-registration/cases/${caseId}/add-co-supervisor/dept-review`, { method: 'POST', headers, body: JSON.stringify({ decision }) });
}

export async function reviewAddCoSupervisorByChair(caseId: number, decision: ModuleReviewDecision): Promise<{ record: ModuleFormRecord }> {
  const headers = await authHeadersForActor(demoActorSasiIds.chair);
  return request(`/title-registration/cases/${caseId}/add-co-supervisor/chairperson-review`, { method: 'POST', headers, body: JSON.stringify({ decision }) });
}

export async function reviewAddCoSupervisorByFaculty(caseId: number, decision: ModuleReviewDecision): Promise<{ record: ModuleFormRecord }> {
  const headers = await authHeadersForActor(demoActorSasiIds.faculty);
  return request(`/title-registration/cases/${caseId}/add-co-supervisor/faculty-review`, { method: 'POST', headers, body: JSON.stringify({ decision }) });
}

export async function printAddCoSupervisor(caseId: number): Promise<{ pdfPath: string }> {
  const headers = await studentAuthHeaders();
  return request(`/title-registration/cases/${caseId}/add-co-supervisor/print`, { method: 'POST', headers });
}

export async function getProgressReport(caseId: number): Promise<{ record: ModuleFormRecord; formData: ProgressReportFormData }> {
  const headers = await studentAuthHeaders();
  return request(`/title-registration/cases/${caseId}/progress-report`, { headers });
}

export async function patchProgressReport(
  caseId: number,
  patch: Partial<ProgressReportFormData>,
): Promise<{ record: ModuleFormRecord; formData: ProgressReportFormData }> {
  const headers = await studentAuthHeaders();
  return request(`/title-registration/cases/${caseId}/progress-report`, { method: 'PATCH', headers, body: JSON.stringify(patch) });
}

export async function submitProgressReport(caseId: number): Promise<{ record: ModuleFormRecord }> {
  const headers = await studentAuthHeaders();
  return request(`/title-registration/cases/${caseId}/progress-report/submit`, { method: 'POST', headers });
}

export async function reviewProgressReportByDept(caseId: number, decision: ModuleReviewDecision): Promise<{ record: ModuleFormRecord }> {
  const headers = await authHeadersForActor(demoActorSasiIds.dept);
  return request(`/title-registration/cases/${caseId}/progress-report/dept-review`, { method: 'POST', headers, body: JSON.stringify({ decision }) });
}

export async function reviewProgressReportByFaculty(caseId: number, decision: ModuleReviewDecision): Promise<{ record: ModuleFormRecord }> {
  const headers = await authHeadersForActor(demoActorSasiIds.faculty);
  return request(`/title-registration/cases/${caseId}/progress-report/faculty-review`, { method: 'POST', headers, body: JSON.stringify({ decision }) });
}

export async function printProgressReport(caseId: number): Promise<{ pdfPath: string }> {
  const headers = await studentAuthHeaders();
  return request(`/title-registration/cases/${caseId}/progress-report/print`, { method: 'POST', headers });
}

export async function getLeaveOfAbsence(caseId: number): Promise<{ record: ModuleFormRecord; formData: LeaveOfAbsenceFormData }> {
  const headers = await studentAuthHeaders();
  return request(`/title-registration/cases/${caseId}/leave-of-absence`, { headers });
}

export async function patchLeaveOfAbsence(
  caseId: number,
  patch: Partial<LeaveOfAbsenceFormData>,
): Promise<{ record: ModuleFormRecord; formData: LeaveOfAbsenceFormData }> {
  const headers = await studentAuthHeaders();
  return request(`/title-registration/cases/${caseId}/leave-of-absence`, { method: 'PATCH', headers, body: JSON.stringify(patch) });
}

export async function submitLeaveOfAbsence(caseId: number): Promise<{ record: ModuleFormRecord }> {
  const headers = await studentAuthHeaders();
  return request(`/title-registration/cases/${caseId}/leave-of-absence/submit`, { method: 'POST', headers });
}

export async function reviewLeaveOfAbsenceByDept(caseId: number, decision: ModuleReviewDecision): Promise<{ record: ModuleFormRecord }> {
  const headers = await authHeadersForActor(demoActorSasiIds.dept);
  return request(`/title-registration/cases/${caseId}/leave-of-absence/dept-review`, { method: 'POST', headers, body: JSON.stringify({ decision }) });
}

export async function reviewLeaveOfAbsenceByFaculty(caseId: number, decision: ModuleReviewDecision): Promise<{ record: ModuleFormRecord }> {
  const headers = await authHeadersForActor(demoActorSasiIds.faculty);
  return request(`/title-registration/cases/${caseId}/leave-of-absence/faculty-review`, { method: 'POST', headers, body: JSON.stringify({ decision }) });
}

export async function printLeaveOfAbsence(caseId: number): Promise<{ pdfPath: string }> {
  const headers = await studentAuthHeaders();
  return request(`/title-registration/cases/${caseId}/leave-of-absence/print`, { method: 'POST', headers });
}

export async function getReadmissionRequest(caseId: number): Promise<{ record: ModuleFormRecord; formData: ReadmissionRequestFormData }> {
  const headers = await studentAuthHeaders();
  return request(`/title-registration/cases/${caseId}/readmission-request`, { headers });
}

export async function patchReadmissionRequest(
  caseId: number,
  patch: Partial<ReadmissionRequestFormData>,
): Promise<{ record: ModuleFormRecord; formData: ReadmissionRequestFormData }> {
  const headers = await studentAuthHeaders();
  return request(`/title-registration/cases/${caseId}/readmission-request`, { method: 'PATCH', headers, body: JSON.stringify(patch) });
}

export async function submitReadmissionRequest(caseId: number): Promise<{ record: ModuleFormRecord }> {
  const headers = await studentAuthHeaders();
  return request(`/title-registration/cases/${caseId}/readmission-request/submit`, { method: 'POST', headers });
}

export async function reviewReadmissionRequestByDept(caseId: number, decision: ModuleReviewDecision): Promise<{ record: ModuleFormRecord }> {
  const headers = await authHeadersForActor(demoActorSasiIds.dept);
  return request(`/title-registration/cases/${caseId}/readmission-request/dept-review`, { method: 'POST', headers, body: JSON.stringify({ decision }) });
}

export async function reviewReadmissionRequestByFaculty(caseId: number, decision: ModuleReviewDecision): Promise<{ record: ModuleFormRecord }> {
  const headers = await authHeadersForActor(demoActorSasiIds.faculty);
  return request(`/title-registration/cases/${caseId}/readmission-request/faculty-review`, { method: 'POST', headers, body: JSON.stringify({ decision }) });
}

export async function printReadmissionRequest(caseId: number): Promise<{ pdfPath: string }> {
  const headers = await studentAuthHeaders();
  return request(`/title-registration/cases/${caseId}/readmission-request/print`, { method: 'POST', headers });
}

export async function getUpgradeMscToPhd(caseId: number): Promise<{ record: ModuleFormRecord; formData: UpgradeMscToPhdFormData }> {
  const headers = await studentAuthHeaders();
  return request(`/title-registration/cases/${caseId}/upgrade-msc-to-phd`, { headers });
}

export async function patchUpgradeMscToPhd(
  caseId: number,
  patch: Partial<UpgradeMscToPhdFormData>,
): Promise<{ record: ModuleFormRecord; formData: UpgradeMscToPhdFormData }> {
  const headers = await studentAuthHeaders();
  return request(`/title-registration/cases/${caseId}/upgrade-msc-to-phd`, { method: 'PATCH', headers, body: JSON.stringify(patch) });
}

export async function submitUpgradeMscToPhd(caseId: number): Promise<{ record: ModuleFormRecord }> {
  const headers = await studentAuthHeaders();
  return request(`/title-registration/cases/${caseId}/upgrade-msc-to-phd/submit`, { method: 'POST', headers });
}

export async function reviewUpgradeMscToPhdByDept(caseId: number, decision: ModuleReviewDecision): Promise<{ record: ModuleFormRecord }> {
  const headers = await authHeadersForActor(demoActorSasiIds.dept);
  return request(`/title-registration/cases/${caseId}/upgrade-msc-to-phd/dept-review`, { method: 'POST', headers, body: JSON.stringify({ decision }) });
}

export async function reviewUpgradeMscToPhdByFaculty(caseId: number, decision: ModuleReviewDecision): Promise<{ record: ModuleFormRecord }> {
  const headers = await authHeadersForActor(demoActorSasiIds.faculty);
  return request(`/title-registration/cases/${caseId}/upgrade-msc-to-phd/faculty-review`, { method: 'POST', headers, body: JSON.stringify({ decision }) });
}

export async function printUpgradeMscToPhd(caseId: number): Promise<{ pdfPath: string }> {
  const headers = await studentAuthHeaders();
  return request(`/title-registration/cases/${caseId}/upgrade-msc-to-phd/print`, { method: 'POST', headers });
}

export async function getSupervisorSummativeReport(caseId: number): Promise<{ record: ModuleFormRecord; formData: SupervisorSummativeReportFormData }> {
  const headers = await studentAuthHeaders();
  return request(`/title-registration/cases/${caseId}/supervisor-summative-report`, { headers });
}

export async function patchSupervisorSummativeReport(
  caseId: number,
  patch: Partial<SupervisorSummativeReportFormData>,
): Promise<{ record: ModuleFormRecord; formData: SupervisorSummativeReportFormData }> {
  const headers = await authHeadersForActor(demoActorSasiIds.supervisor);
  return request(`/title-registration/cases/${caseId}/supervisor-summative-report`, { method: 'PATCH', headers, body: JSON.stringify(patch) });
}

export async function submitSupervisorSummativeReport(caseId: number): Promise<{ record: ModuleFormRecord }> {
  const headers = await authHeadersForActor(demoActorSasiIds.supervisor);
  return request(`/title-registration/cases/${caseId}/supervisor-summative-report/submit`, { method: 'POST', headers });
}

export async function reviewSupervisorSummativeReportByDept(caseId: number, decision: ModuleReviewDecision): Promise<{ record: ModuleFormRecord }> {
  const headers = await authHeadersForActor(demoActorSasiIds.dept);
  return request(`/title-registration/cases/${caseId}/supervisor-summative-report/dept-review`, { method: 'POST', headers, body: JSON.stringify({ decision }) });
}

export async function reviewSupervisorSummativeReportByFaculty(caseId: number, decision: ModuleReviewDecision): Promise<{ record: ModuleFormRecord }> {
  const headers = await authHeadersForActor(demoActorSasiIds.faculty);
  return request(`/title-registration/cases/${caseId}/supervisor-summative-report/faculty-review`, { method: 'POST', headers, body: JSON.stringify({ decision }) });
}

export async function printSupervisorSummativeReport(caseId: number): Promise<{ pdfPath: string }> {
  const headers = await studentAuthHeaders();
  return request(`/title-registration/cases/${caseId}/supervisor-summative-report/print`, { method: 'POST', headers });
}

export async function getOtherRequest(caseId: number): Promise<{ record: ModuleFormRecord; formData: OtherRequestFormData }> {
  const headers = await studentAuthHeaders();
  return request(`/title-registration/cases/${caseId}/other-request`, { headers });
}

export async function patchOtherRequest(
  caseId: number,
  patch: Partial<OtherRequestFormData>,
): Promise<{ record: ModuleFormRecord; formData: OtherRequestFormData }> {
  const headers = await studentAuthHeaders();
  return request(`/title-registration/cases/${caseId}/other-request`, { method: 'PATCH', headers, body: JSON.stringify(patch) });
}

export async function submitOtherRequest(caseId: number): Promise<{ record: ModuleFormRecord }> {
  const headers = await studentAuthHeaders();
  return request(`/title-registration/cases/${caseId}/other-request/submit`, { method: 'POST', headers });
}

export async function reviewOtherRequestByDept(caseId: number, decision: ModuleReviewDecision): Promise<{ record: ModuleFormRecord }> {
  const headers = await authHeadersForActor(demoActorSasiIds.dept);
  return request(`/title-registration/cases/${caseId}/other-request/dept-review`, { method: 'POST', headers, body: JSON.stringify({ decision }) });
}

export async function reviewOtherRequestByFaculty(caseId: number, decision: ModuleReviewDecision): Promise<{ record: ModuleFormRecord }> {
  const headers = await authHeadersForActor(demoActorSasiIds.faculty);
  return request(`/title-registration/cases/${caseId}/other-request/faculty-review`, { method: 'POST', headers, body: JSON.stringify({ decision }) });
}

export async function printOtherRequest(caseId: number): Promise<{ pdfPath: string }> {
  const headers = await studentAuthHeaders();
  return request(`/title-registration/cases/${caseId}/other-request/print`, { method: 'POST', headers });
}

export async function getDirectoryDepartments(faculty?: string): Promise<{ data: DepartmentDirectory[] }> {
  const query = faculty ? `?faculty=${encodeURIComponent(faculty)}` : '';
  const headers = await authHeadersForActor(demoActorSasiIds.supervisor);
  return request(`/directory/departments${query}`, { headers });
}

export async function getDirectoryStaff(params?: { department?: string; q?: string; internalOnly?: boolean }): Promise<{ data: StaffDirectory[] }> {
  const search = new URLSearchParams();
  if (params?.department) {
    search.set('department', params.department);
  }
  if (params?.q) {
    search.set('q', params.q);
  }
  if (params?.internalOnly) {
    search.set('internalOnly', 'true');
  }
  const query = search.toString() ? `?${search.toString()}` : '';
  const headers = await authHeadersForActor(demoActorSasiIds.supervisor);
  return request(`/directory/staff${query}`, { headers });
}

export async function getExternalAcademics(q?: string): Promise<{ data: ExternalAcademicDirectory[] }> {
  const query = q?.trim() ? `?q=${encodeURIComponent(q.trim())}` : '';
  const headers = await authHeadersForActor(demoActorSasiIds.supervisor);
  return request(`/directory/external-academics${query}`, { headers });
}

// Backward-compatible alias for legacy naming in existing modules.
export async function getExternalSupervisors(q?: string): Promise<{ data: ExternalAcademicDirectory[] }> {
  const query = q?.trim() ? `?q=${encodeURIComponent(q.trim())}` : '';
  const headers = await authHeadersForActor(demoActorSasiIds.supervisor);
  return request(`/directory/external-supervisors${query}`, { headers });
}

export async function createExternalAcademicInvite(
  caseId: number,
  role: 'supervisor' | 'admin' | 'co1' | 'co2',
  email: string,
): Promise<{ inviteId: number; token: string; inviteLink: string; expiresAt: string; deliveryStatus: 'sent' | 'queued' | 'failed' }> {
  const headers = await studentAuthHeaders();
  return request('/directory/external-academics/invite', {
    method: 'POST',
    headers,
    body: JSON.stringify({ caseId, role, email }),
  });
}

export async function getExternalAcademicInvite(token: string): Promise<ExternalAcademicInviteDetails> {
  return request(`/directory/external-academics/invites/${encodeURIComponent(token)}`);
}

export async function completeExternalAcademicInvite(
  token: string,
  payload: ExternalAcademicProfilePayload,
): Promise<{ externalAcademicId: number; caseUpdated: boolean }> {
  return request(`/directory/external-academics/invites/${encodeURIComponent(token)}/complete`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
