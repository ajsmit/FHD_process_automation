export type CaseStatus =
  | 'awaiting_student_vetting'
  | 'awaiting_supervisor_review'
  | 'returned_by_supervisor'
  | 'awaiting_dept_fhd_review'
  | 'awaiting_chairperson_signature'
  | 'awaiting_dept_fhd_send_to_faculty'
  | 'returned_by_dept_fhd'
  | 'sent_to_faculty_fhd'
  | 'returned_by_faculty_fhd'
  | 'approved';

export type ReviewDecision = 'vetted' | 'insufficient';

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

export interface TitleRegistrationCase {
  id: number;
  case_status: CaseStatus;
  completion_percent: number;
  pdf_path: string | null;
  last_comments: string | null;
  sent_to_faculty_at: string | null;
  updated_at: string;
}

export interface FormData {
  'Student Title': string;
  'Student First-Name': string;
  'Student Surname': string;
  'Student Number': string;
  Department: string;
  Degree: string;
  'Date of first title registration on SASI': string;
  'Student registration active on SASI': 'Yes' | 'No';
  'PhD by traditional thesis format': boolean;
  'PhD by publication': boolean;
  'Masters Full-thesis': boolean;
  'Masters Mini thesis': boolean;
  'Masters by publication': boolean;
  Supervisor: string;
  'Supervisor Title': string;
  'Supervisor Qualifications': string;
  'Supervisor is UWC-internal': 'Yes' | 'No';
  'Supervisor External Lookup Id': string;
  'Supervisor External First Name': string;
  'Supervisor External Surname': string;
  'Supervisor External Address': string;
  'Supervisor External Email': string;
  'Administrative Supervisor same as Supervisor': 'Yes' | 'No';
  'Administrative Supervisor (Nominal Role)': string;
  'Administrative Supervisor Qualifications (Nominal Role)': string;
  'Administrative Supervisor is UWC-internal': 'Yes' | 'No';
  'Administrative Supervisor External Lookup Id': string;
  'Administrative Supervisor External Title': string;
  'Administrative Supervisor External First Name': string;
  'Administrative Supervisor External Surname': string;
  'Administrative Supervisor External Address': string;
  'Administrative Supervisor External Email': string;
  'Has Co-supervisor?': 'Yes' | 'No';
  'Co-supervisor': string;
  'Co-supervisor Title': string;
  'Co-supervisor Qualifications': string;
  'Co-supervisor is UWC-internal': 'Yes' | 'No';
  'Co-supervisor External Lookup Id': string;
  'Co-supervisor External First Name': string;
  'Co-supervisor External Surname': string;
  'Co-supervisor External Address': string;
  'Co-supervisor External Email': string;
  'Second Co-supervisor': string;
  'Second Co-supervisor Title': string;
  'Second Co-supervisor Qualifications': string;
  'Second Co-supervisor is UWC-internal': 'Yes' | 'No';
  'Second Co-supervisor External Lookup Id': string;
  'Second Co-supervisor External First Name': string;
  'Second Co-supervisor External Surname': string;
  'Second Co-supervisor External Address': string;
  'Second Co-supervisor External Email': string;
  'Thesis title': string;
  'Key words': string;
  'Does this project need Ethics clearance?': 'Yes' | 'No';
  'Ethics clearance reference number': string;
  'Date on which ethics clearance was issued': string;
  'Has the MOU been submitted?': 'Yes' | 'No';
  'Year first registered': string;
  'Semester first registered': string;
  'Initial thesis title for upgrade from Masters to Doctoral': string;
  Abstract: string;
  'PhD proposal link (5-10 pages incl. timeframes)': string;
}

export interface SupervisorProfileForm {
  id: number;
  case_id: number;
  role: 'supervisor' | 'co_supervisor' | 'admin_supervisor';
  person_name: string;
  person_title: string;
  qualifications: string;
  is_internal: 'Yes' | 'No';
  external_address: string;
  contact_email: string;
  publication_count: number | null;
  recent_publications_json: string;
  contribution_motivation: string;
  new_to_department: 'Yes' | 'No';
  cv_attached: 'Yes' | 'No';
  cv_file_path: string;
  status: 'draft' | 'requested' | 'completed' | 'inactive';
  requested_at: string | null;
  submitted_at: string | null;
  last_reminder_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface MouFormRecord {
  id: number;
  case_id: number;
  completion_percent: number;
  status: 'draft' | 'completed';
  pdf_path: string | null;
  submitted_at: string | null;
  updated_at: string;
}

export interface MouFormData {
  'Student Full Name': string;
  'Student Number': string;
  Degree: string;
  Department: string;
  'First Year of Registration': string;
  'Study Mode': 'FULL TIME' | 'PART-TIME';
  'Expected Date of Completion': string;
  'Thesis Title': string;
  'Brief Description of Project (<200 words)': string;
  'Principal Supervisor': string;
  'Principal Supervisor Highest Qualifications': string;
  'Principal Supervisor Main Responsibilities': string;
  'Co-supervisor(s)': string;
  'Co-supervisor Highest Qualifications': string;
  'Co-supervisor Main Responsibilities': string;
  'Supervisor Availability Arrangements': string;
  'Student Leave Entitlement Per Annum': string;
  'Student Extended Research Away from UWC Arrangements': string;
  'Prescribed Courses/Workshops': string;
  'Time Allocation': string;
  'Space Allocation': string;
  'Computer Facilities': string;
  'Financial Arrangements for Project': string;
  'Publication Issues': string;
  'Data Ownership': string;
  'Supervisor-Student Meetings': string;
  'Progress Reports': string;
  'Study Outputs': string;
  'Research Visits/Conferences': string;
  'Other Duties': string;
  'Other Expectations': string;
  'Other Issues Relevant to Study': string;
  'Student Signature Confirmed': 'Yes' | 'No';
  'Supervisor Signature Confirmed': 'Yes' | 'No';
  'Co-supervisor Signature Confirmed': 'Yes' | 'No';
  'Dept Chair/PG Coord Signature Confirmed': 'Yes' | 'No';
}

export interface ModuleFormRecord {
  id: number;
  case_id: number;
  completion_percent: number;
  status: 'draft' | 'submitted';
  submitted_at: string | null;
  updated_at: string;
}

export interface IntentionToSubmitFormData {
  'Student Full Name': string;
  'Student Number': string;
  Department: string;
  Degree: string;
  Supervisor: string;
  'Co-supervisor(s)': string;
  'Thesis title': string;
  'Year of first enrolment': string;
  'Submission type': '' | 'Mini thesis' | 'Project' | 'Full thesis';
  'Intended submission date': string;
  'Student declaration': string;
  'Student signature date': string;
  'Supervisor approval status': 'Pending' | 'Approved' | 'Not approved';
  'Co-supervisor approval status': 'Not applicable' | 'Pending' | 'Approved' | 'Not approved';
  'Department PG coordinator approval status': 'Pending' | 'Approved' | 'Not approved';
  'Non-approval motivation': string;
}

export interface AppointExaminersFormData {
  'Student Full Name': string;
  'Student Number': string;
  'Faculty and Department': string;
  Degree: string;
  Supervisor: string;
  'Co-supervisor(s)': string;
  'Thesis title': string;
  'Year of first enrolment': string;
  'Title already registered': 'Yes' | 'No';
  'Concurrent title-change declaration': string;
  'Examiner 1 Name': string;
  'Examiner 1 Type': '' | 'Internal' | 'External' | 'International';
  'Examiner 1 Affiliation': string;
  'Examiner 1 Motivation': string;
  'Examiner 1 CV received': 'Yes' | 'No';
  'Examiner 1 Conflict disclosure': string;
  'Examiner 2 Name': string;
  'Examiner 2 Type': '' | 'Internal' | 'External' | 'International';
  'Examiner 2 Affiliation': string;
  'Examiner 2 Motivation': string;
  'Examiner 2 CV received': 'Yes' | 'No';
  'Examiner 2 Conflict disclosure': string;
  'Examiner 3 Name': string;
  'Examiner 3 Type': '' | 'Internal' | 'External' | 'International';
  'Examiner 3 Affiliation': string;
  'Examiner 3 Motivation': string;
  'Examiner 3 CV received': 'Yes' | 'No';
  'Examiner 3 Conflict disclosure': string;
}

export interface ChangeExaminersFormData {
  'Student Full Name': string;
  'Student Number': string;
  'Thesis title': string;
  'Current examiner panel summary': string;
  'Change motivation': string;
  'Replacement Examiner 1 Name': string;
  'Replacement Examiner 1 Type': '' | 'Internal' | 'External' | 'International';
  'Replacement Examiner 1 Affiliation': string;
  'Replacement Examiner 1 Motivation': string;
  'Replacement Examiner 2 Name': string;
  'Replacement Examiner 2 Type': '' | 'Internal' | 'External' | 'International';
  'Replacement Examiner 2 Affiliation': string;
  'Replacement Examiner 2 Motivation': string;
}

export interface ExaminerSummaryCvFormData {
  'Student Full Name': string;
  'Student Number': string;
  'Thesis title': string;
  'Examiner panel summary': string;
  'Summary CV packet status': 'Pending' | 'Complete';
  'Compiled by': string;
  'Compilation date': string;
  Notes: string;
}

export interface AppointArbiterFormData {
  'Student Full Name': string;
  'Student Number': string;
  'Thesis title': string;
  'Examiner panel summary': string;
  'Arbiter Name': string;
  'Arbiter Type': '' | 'Internal' | 'External' | 'International';
  'Arbiter Affiliation': string;
  'Arbiter Motivation': string;
  'Arbiter CV received': 'Yes' | 'No';
  'Arbiter conflict disclosure': string;
}

interface AuthUser {
  id: number;
  sasiId: string;
  role: 'student' | 'supervisor' | 'admin';
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

const tokenCacheByActor = new Map<string, string>();

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

export async function checkSasi(studentNumber: string): Promise<{
  eligible: boolean;
  reasons: string[];
  student?: SasiStudent;
  caseRecord?: TitleRegistrationCase;
  formData?: FormData;
}> {
  return request(`/title-registration/sasi/${studentNumber}/check`);
}

export async function patchForm(caseId: number, patch: Partial<FormData>): Promise<{ case: TitleRegistrationCase; formData: FormData }> {
  const headers = await authHeadersForActor(demoActorSasiIds.student);
  return request(`/title-registration/cases/${caseId}/form`, { method: 'PATCH', headers, body: JSON.stringify(patch) });
}

export async function generatePrintPdf(caseId: number): Promise<{ pdfPath: string }> {
  const headers = await authHeadersForActor(demoActorSasiIds.student);
  return request(`/title-registration/cases/${caseId}/print`, { method: 'POST', headers });
}

export async function studentVet(caseId: number): Promise<{ case: TitleRegistrationCase }> {
  const headers = await authHeadersForActor(demoActorSasiIds.student);
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
  const headers = await authHeadersForActor(demoActorSasiIds.student);
  return request('/title-registration/pipeline', { headers });
}

export async function getTasks(): Promise<{ data: Array<Record<string, unknown>> }> {
  const headers = await authHeadersForActor(demoActorSasiIds.student);
  return request('/title-registration/tasks', { headers });
}

export async function getToDo(): Promise<{ data: Array<Record<string, unknown>> }> {
  const headers = await authHeadersForActor(demoActorSasiIds.student);
  return request('/title-registration/to-do', { headers });
}

export async function getPeople(): Promise<{ data: Array<Record<string, unknown>> }> {
  const headers = await authHeadersForActor(demoActorSasiIds.student);
  return request('/title-registration/people', { headers });
}

export async function getNotifications(caseId?: number): Promise<{ data: Array<Record<string, unknown>> }> {
  const query = typeof caseId === 'number' ? `?caseId=${caseId}` : '';
  const headers = await authHeadersForActor(demoActorSasiIds.student);
  return request(`/title-registration/notifications${query}`, { headers });
}

export async function getSupervisorProfiles(caseId: number): Promise<{ data: SupervisorProfileForm[] }> {
  const headers = await authHeadersForActor(demoActorSasiIds.student);
  return request(`/title-registration/cases/${caseId}/supervisor-profiles`, { headers });
}

export async function getExternalInviteStatuses(caseId: number): Promise<{ data: ExternalInviteStatus[] }> {
  const headers = await authHeadersForActor(demoActorSasiIds.student);
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
  const headers = await authHeadersForActor(demoActorSasiIds.student);
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
  const headers = await authHeadersForActor(demoActorSasiIds.student);
  return request(`/title-registration/cases/${caseId}/mou`, { headers });
}

export async function patchMou(caseId: number, patch: Partial<MouFormData>): Promise<{ record: MouFormRecord; formData: MouFormData }> {
  const headers = await authHeadersForActor(demoActorSasiIds.student);
  return request(`/title-registration/cases/${caseId}/mou`, { method: 'PATCH', headers, body: JSON.stringify(patch) });
}

export async function completeMou(caseId: number): Promise<{ record: MouFormRecord }> {
  const headers = await authHeadersForActor(demoActorSasiIds.student);
  return request(`/title-registration/cases/${caseId}/mou/complete`, { method: 'POST', headers });
}

export async function printMou(caseId: number): Promise<{ pdfPath: string }> {
  const headers = await authHeadersForActor(demoActorSasiIds.student);
  return request(`/title-registration/cases/${caseId}/mou/print`, { method: 'POST', headers });
}

export async function getIntentionToSubmit(caseId: number): Promise<{ record: ModuleFormRecord; formData: IntentionToSubmitFormData }> {
  const headers = await authHeadersForActor(demoActorSasiIds.student);
  return request(`/title-registration/cases/${caseId}/intention-to-submit`, { headers });
}

export async function patchIntentionToSubmit(
  caseId: number,
  patch: Partial<IntentionToSubmitFormData>,
): Promise<{ record: ModuleFormRecord; formData: IntentionToSubmitFormData }> {
  const headers = await authHeadersForActor(demoActorSasiIds.student);
  return request(`/title-registration/cases/${caseId}/intention-to-submit`, { method: 'PATCH', headers, body: JSON.stringify(patch) });
}

export async function submitIntentionToSubmit(caseId: number): Promise<{ record: ModuleFormRecord }> {
  const headers = await authHeadersForActor(demoActorSasiIds.student);
  return request(`/title-registration/cases/${caseId}/intention-to-submit/submit`, { method: 'POST', headers });
}

export async function getAppointExaminers(caseId: number): Promise<{ record: ModuleFormRecord; formData: AppointExaminersFormData }> {
  const headers = await authHeadersForActor(demoActorSasiIds.student);
  return request(`/title-registration/cases/${caseId}/appoint-examiners`, { headers });
}

export async function patchAppointExaminers(
  caseId: number,
  patch: Partial<AppointExaminersFormData>,
): Promise<{ record: ModuleFormRecord; formData: AppointExaminersFormData }> {
  const headers = await authHeadersForActor(demoActorSasiIds.student);
  return request(`/title-registration/cases/${caseId}/appoint-examiners`, { method: 'PATCH', headers, body: JSON.stringify(patch) });
}

export async function submitAppointExaminers(caseId: number): Promise<{ record: ModuleFormRecord }> {
  const headers = await authHeadersForActor(demoActorSasiIds.student);
  return request(`/title-registration/cases/${caseId}/appoint-examiners/submit`, { method: 'POST', headers });
}

export async function getChangeExaminers(caseId: number): Promise<{ record: ModuleFormRecord; formData: ChangeExaminersFormData }> {
  const headers = await authHeadersForActor(demoActorSasiIds.student);
  return request(`/title-registration/cases/${caseId}/change-examiners`, { headers });
}

export async function patchChangeExaminers(
  caseId: number,
  patch: Partial<ChangeExaminersFormData>,
): Promise<{ record: ModuleFormRecord; formData: ChangeExaminersFormData }> {
  const headers = await authHeadersForActor(demoActorSasiIds.student);
  return request(`/title-registration/cases/${caseId}/change-examiners`, { method: 'PATCH', headers, body: JSON.stringify(patch) });
}

export async function submitChangeExaminers(caseId: number): Promise<{ record: ModuleFormRecord }> {
  const headers = await authHeadersForActor(demoActorSasiIds.student);
  return request(`/title-registration/cases/${caseId}/change-examiners/submit`, { method: 'POST', headers });
}

export async function getExaminerSummaryCv(caseId: number): Promise<{ record: ModuleFormRecord; formData: ExaminerSummaryCvFormData }> {
  const headers = await authHeadersForActor(demoActorSasiIds.student);
  return request(`/title-registration/cases/${caseId}/examiner-summary-cv`, { headers });
}

export async function patchExaminerSummaryCv(
  caseId: number,
  patch: Partial<ExaminerSummaryCvFormData>,
): Promise<{ record: ModuleFormRecord; formData: ExaminerSummaryCvFormData }> {
  const headers = await authHeadersForActor(demoActorSasiIds.student);
  return request(`/title-registration/cases/${caseId}/examiner-summary-cv`, { method: 'PATCH', headers, body: JSON.stringify(patch) });
}

export async function submitExaminerSummaryCv(caseId: number): Promise<{ record: ModuleFormRecord }> {
  const headers = await authHeadersForActor(demoActorSasiIds.student);
  return request(`/title-registration/cases/${caseId}/examiner-summary-cv/submit`, { method: 'POST', headers });
}

export async function getAppointArbiter(caseId: number): Promise<{ record: ModuleFormRecord; formData: AppointArbiterFormData }> {
  const headers = await authHeadersForActor(demoActorSasiIds.student);
  return request(`/title-registration/cases/${caseId}/appoint-arbiter`, { headers });
}

export async function patchAppointArbiter(
  caseId: number,
  patch: Partial<AppointArbiterFormData>,
): Promise<{ record: ModuleFormRecord; formData: AppointArbiterFormData }> {
  const headers = await authHeadersForActor(demoActorSasiIds.student);
  return request(`/title-registration/cases/${caseId}/appoint-arbiter`, { method: 'PATCH', headers, body: JSON.stringify(patch) });
}

export async function submitAppointArbiter(caseId: number): Promise<{ record: ModuleFormRecord }> {
  const headers = await authHeadersForActor(demoActorSasiIds.student);
  return request(`/title-registration/cases/${caseId}/appoint-arbiter/submit`, { method: 'POST', headers });
}

export async function getDirectoryDepartments(faculty?: string): Promise<{ data: DepartmentDirectory[] }> {
  const query = faculty ? `?faculty=${encodeURIComponent(faculty)}` : '';
  return request(`/directory/departments${query}`);
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
  return request(`/directory/staff${query}`);
}

export async function getExternalAcademics(q?: string): Promise<{ data: ExternalAcademicDirectory[] }> {
  const query = q?.trim() ? `?q=${encodeURIComponent(q.trim())}` : '';
  return request(`/directory/external-academics${query}`);
}

// Backward-compatible alias for legacy naming in existing modules.
export async function getExternalSupervisors(q?: string): Promise<{ data: ExternalAcademicDirectory[] }> {
  const query = q?.trim() ? `?q=${encodeURIComponent(q.trim())}` : '';
  return request(`/directory/external-supervisors${query}`);
}

export async function createExternalAcademicInvite(
  caseId: number,
  role: 'supervisor' | 'admin' | 'co1' | 'co2',
  email: string,
): Promise<{ inviteId: number; token: string; inviteLink: string; expiresAt: string; deliveryStatus: 'sent' | 'queued' | 'failed' }> {
  return request('/directory/external-academics/invite', {
    method: 'POST',
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
