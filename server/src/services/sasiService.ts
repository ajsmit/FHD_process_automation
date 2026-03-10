import db from '../db/knex';

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
  supervisor_name: string | null;
  supervisor_qualifications: string | null;
  co_supervisor_name: string | null;
  co_supervisor_qualifications: string | null;
  admin_supervisor_name: string | null;
  admin_supervisor_qualifications: string | null;
}

interface SearchParams {
  studentNumber?: string;
  firstName?: string;
  lastName?: string;
}

type SasiProvider = 'local' | 'api';

function currentProvider(): SasiProvider {
  return (process.env.SASI_PROVIDER?.trim().toLowerCase() === 'api' ? 'api' : 'local');
}

function sasiApiBase(): string {
  return (process.env.SASI_API_ENDPOINT ?? '').trim().replace(/\/$/, '');
}

function sasiApiKey(): string {
  return (process.env.SASI_API_KEY ?? '').trim();
}

function normalizeStudentPayload(input: Record<string, unknown>): SasiStudent {
  const getStr = (key: string): string => String(input[key] ?? '');
  const getOptStr = (key: string): string | null => {
    const value = input[key];
    return value === undefined || value === null || String(value).trim() === '' ? null : String(value);
  };
  const getInt = (key: string, fallback = 0): number => {
    const parsed = Number.parseInt(String(input[key] ?? ''), 10);
    return Number.isFinite(parsed) ? parsed : fallback;
  };
  return {
    id: getInt('id'),
    student_number: getStr('student_number'),
    title: getOptStr('title'),
    first_names: getStr('first_names'),
    last_name: getStr('last_name'),
    email: getOptStr('email'),
    faculty: getStr('faculty'),
    department: getStr('department'),
    degree_level: (getStr('degree_level') as 'MSC' | 'PHD') || 'MSC',
    degree_type: (getStr('degree_type') as 'FULL_THESIS' | 'MINI_THESIS' | 'PROJECT') || 'FULL_THESIS',
    registration_type: (getStr('registration_type') as 'FULL_TIME' | 'PART_TIME') || 'FULL_TIME',
    registration_active: getInt('registration_active', 0),
    first_enrolment_year: getInt('first_enrolment_year'),
    first_registration_date: getOptStr('first_registration_date'),
    first_registration_semester: (() => {
      const raw = input.first_registration_semester;
      if (raw === undefined || raw === null || String(raw).trim() === '') return null;
      const parsed = Number.parseInt(String(raw), 10);
      return Number.isFinite(parsed) ? parsed : null;
    })(),
    expected_completion_date: getOptStr('expected_completion_date'),
    thesis_title: getOptStr('thesis_title'),
    ethics_required: getInt('ethics_required', 0),
    ethics_ref_number: getOptStr('ethics_ref_number'),
    supervisor_name: getOptStr('supervisor_name'),
    supervisor_qualifications: getOptStr('supervisor_qualifications'),
    co_supervisor_name: getOptStr('co_supervisor_name'),
    co_supervisor_qualifications: getOptStr('co_supervisor_qualifications'),
    admin_supervisor_name: getOptStr('admin_supervisor_name'),
    admin_supervisor_qualifications: getOptStr('admin_supervisor_qualifications'),
  };
}

async function fetchFromSasiApi(path: string): Promise<unknown> {
  const base = sasiApiBase();
  if (!base) {
    throw new Error('SASI_API_ENDPOINT is required when SASI_PROVIDER=api');
  }
  const key = sasiApiKey();
  const response = await fetch(`${base}${path}`, {
    headers: {
      ...(key ? { Authorization: `Bearer ${key}` } : {}),
      Accept: 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error(`SASI API request failed (${response.status})`);
  }
  return response.json();
}

async function searchStudentsApi(params: SearchParams): Promise<SasiStudent[]> {
  const search = new URLSearchParams();
  if (params.studentNumber) search.set('student_number', params.studentNumber.trim());
  if (params.firstName) search.set('first_name', params.firstName.trim());
  if (params.lastName) search.set('last_name', params.lastName.trim());
  const payload = await fetchFromSasiApi(`/students${search.toString() ? `?${search.toString()}` : ''}`);
  const rows = Array.isArray(payload) ? payload : ((payload as { data?: unknown })?.data ?? []);
  if (!Array.isArray(rows)) {
    return [];
  }
  return rows.map((row) => normalizeStudentPayload(row as Record<string, unknown>));
}

async function getStudentByNumberApi(studentNumber: string): Promise<SasiStudent | undefined> {
  const payload = await fetchFromSasiApi(`/students/${encodeURIComponent(studentNumber.trim())}`);
  const row = (payload as { data?: unknown })?.data ?? payload;
  if (!row || typeof row !== 'object') {
    return undefined;
  }
  return normalizeStudentPayload(row as Record<string, unknown>);
}

export async function searchStudents(params: SearchParams): Promise<SasiStudent[]> {
  if (currentProvider() === 'api') {
    return searchStudentsApi(params);
  }
  const query = db<SasiStudent>('sasi_students').select('*');

  if (params.studentNumber) {
    query.where('student_number', params.studentNumber.trim());
    return query;
  }

  if (params.firstName) {
    query.where('first_names', 'like', `%${params.firstName.trim()}%`);
  }

  if (params.lastName) {
    query.where('last_name', 'like', `%${params.lastName.trim()}%`);
  }

  return query.limit(20);
}

export async function getStudentByNumber(studentNumber: string): Promise<SasiStudent | undefined> {
  if (currentProvider() === 'api') {
    return getStudentByNumberApi(studentNumber);
  }
  return db<SasiStudent>('sasi_students').where({ student_number: studentNumber }).first();
}
