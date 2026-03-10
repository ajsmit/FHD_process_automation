import db from '../db/knex';

export interface DepartmentDirectoryRow {
  id: number;
  faculty_name: string;
  department_name: string;
}

export interface StaffDirectoryRow {
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

export interface ExternalAcademicDirectoryRow {
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

export async function listDepartments(faculty?: string): Promise<DepartmentDirectoryRow[]> {
  const query = db<DepartmentDirectoryRow>('uwc_departments').select('*').orderBy(['faculty_name', 'department_name']);
  if (faculty) {
    query.where('faculty_name', 'like', `%${faculty.trim()}%`);
  }
  return query;
}

export async function listStaff(params: { department?: string; q?: string; internalOnly?: boolean }): Promise<StaffDirectoryRow[]> {
  const query = db<StaffDirectoryRow>('uwc_staff_directory').select('*').orderBy('staff_name', 'asc');

  if (params.department) {
    query.where('department_name', 'like', `%${params.department.trim()}%`);
  }

  if (params.q) {
    query.where((builder) => {
      builder
        .where('staff_name', 'like', `%${params.q?.trim()}%`)
        .orWhere('position_title', 'like', `%${params.q?.trim()}%`)
        .orWhere('highest_qualification', 'like', `%${params.q?.trim()}%`)
        .orWhere('research_specialisations', 'like', `%${params.q?.trim()}%`)
        .orWhere('faculty_role', 'like', `%${params.q?.trim()}%`);
    });
  }

  if (params.internalOnly) {
    query.where({ is_internal: 1 });
  }

  return query.limit(200);
}

export async function listExternalAcademics(q?: string): Promise<ExternalAcademicDirectoryRow[]> {
  const query = db<ExternalAcademicDirectoryRow>('external_academic_registry')
    .select('*')
    .orderBy(['last_name', 'first_name']);

  if (q?.trim()) {
    query.where((builder) => {
      builder
        .where('full_name', 'like', `%${q.trim()}%`)
        .orWhere('last_name', 'like', `%${q.trim()}%`)
        .orWhere('email', 'like', `%${q.trim()}%`)
        .orWhere('alternate_email', 'like', `%${q.trim()}%`)
        .orWhere('unique_identifier_value', 'like', `%${q.trim()}%`)
        .orWhere('highest_qualification', 'like', `%${q.trim()}%`)
        .orWhere('affiliation_institution', 'like', `%${q.trim()}%`)
        .orWhere('affiliation_department', 'like', `%${q.trim()}%`)
        .orWhere('affiliation_position_title', 'like', `%${q.trim()}%`)
        .orWhere('expertise_keywords', 'like', `%${q.trim()}%`)
        .orWhere('country', 'like', `%${q.trim()}%`)
        .orWhere('orcid', 'like', `%${q.trim()}%`);
    });
  }

  return query.limit(500);
}
