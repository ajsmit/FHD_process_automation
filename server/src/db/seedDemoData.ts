import type { Knex } from 'knex';
import fs from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';
import { hashPassword } from '../auth/passwordService';

const seedSasiStudents = [
  {
    student_number: '1234567',
    title: 'Ms',
    first_names: 'Jesse',
    last_name: 'Smith',
    email: 'jesse.smith@example.com',
    faculty: 'Natural Sciences',
    department: 'Biodiversity & Conservation Biology',
    degree_level: 'PHD',
    degree_type: 'FULL_THESIS',
    registration_type: 'FULL_TIME',
    first_enrolment_year: 2026,
    first_registration_date: '2026-01-02',
    expected_completion_date: '2029-12-15',
    thesis_title: 'Biodiversity monitoring under climate stress',
    ethics_required: 1,
    ethics_ref_number: 'ETH-2026-BCB-001',
    first_registration_semester: 1,
    supervisor_name: 'AJ Smit',
    supervisor_qualifications: 'PhD',
    co_supervisor_name: 'Tommy Bornman',
    co_supervisor_qualifications: 'PhD',
    admin_supervisor_name: 'Adriaan Engelbrecht',
    admin_supervisor_qualifications: 'PhD',
  },
  {
    student_number: '1234568',
    title: 'Mr',
    first_names: 'Liam',
    last_name: 'Naidoo',
    email: 'liam.naidoo@example.com',
    faculty: 'Natural Sciences',
    department: 'Biodiversity & Conservation Biology',
    degree_level: 'MSC',
    degree_type: 'FULL_THESIS',
    registration_type: 'FULL_TIME',
    first_enrolment_year: 2026,
    first_registration_date: '2025-12-01',
    expected_completion_date: '2027-11-30',
    thesis_title: 'Urban pollinator response to warming',
    ethics_required: 1,
    ethics_ref_number: 'ETH-2026-BCB-002',
    first_registration_semester: 1,
    supervisor_name: 'AJ Smit',
    supervisor_qualifications: 'PhD',
    co_supervisor_name: 'Tommy Bornman',
    co_supervisor_qualifications: 'PhD',
    admin_supervisor_name: 'Adriaan Engelbrecht',
    admin_supervisor_qualifications: 'PhD',
  },
  {
    student_number: '1234569',
    title: 'Ms',
    first_names: 'Aisha',
    last_name: 'Petersen',
    email: 'aisha.petersen@example.com',
    faculty: 'Natural Sciences',
    department: 'Chemistry',
    degree_level: 'MSC',
    degree_type: 'MINI_THESIS',
    registration_type: 'PART_TIME',
    first_enrolment_year: 2025,
    first_registration_date: '2025-10-15',
    expected_completion_date: '2027-12-01',
    thesis_title: 'Catalyst pathways in saline conditions',
    ethics_required: 0,
    ethics_ref_number: null,
    first_registration_semester: 2,
    supervisor_name: 'AJ Smit',
    supervisor_qualifications: 'PhD',
    co_supervisor_name: 'Tommy Bornman',
    co_supervisor_qualifications: 'PhD',
    admin_supervisor_name: 'Adriaan Engelbrecht',
    admin_supervisor_qualifications: 'PhD',
  },
  {
    student_number: '1234570',
    title: 'Mr',
    first_names: 'Sipho',
    last_name: 'Moyo',
    email: 'sipho.moyo@example.com',
    faculty: 'Natural Sciences',
    department: 'Physics',
    degree_level: 'PHD',
    degree_type: 'FULL_THESIS',
    registration_type: 'FULL_TIME',
    first_enrolment_year: 2025,
    first_registration_date: '2025-11-05',
    expected_completion_date: '2029-02-20',
    thesis_title: 'Quantum sensing in low-resource labs',
    ethics_required: 0,
    ethics_ref_number: null,
    first_registration_semester: 2,
    supervisor_name: 'AJ Smit',
    supervisor_qualifications: 'PhD',
    co_supervisor_name: 'Tommy Bornman',
    co_supervisor_qualifications: 'PhD',
    admin_supervisor_name: 'Adriaan Engelbrecht',
    admin_supervisor_qualifications: 'PhD',
  },
  {
    student_number: '1234571',
    title: 'Ms',
    first_names: 'Carla',
    last_name: 'Williams',
    email: 'carla.williams@example.com',
    faculty: 'Natural Sciences',
    department: 'Biotechnology',
    degree_level: 'MSC',
    degree_type: 'PROJECT',
    registration_type: 'PART_TIME',
    first_enrolment_year: 2026,
    first_registration_date: '2026-01-10',
    expected_completion_date: '2028-03-10',
    thesis_title: 'Microbial resilience in estuarine systems',
    ethics_required: 1,
    ethics_ref_number: 'ETH-2026-BIO-004',
    first_registration_semester: 1,
    supervisor_name: 'AJ Smit',
    supervisor_qualifications: 'PhD',
    co_supervisor_name: 'Tommy Bornman',
    co_supervisor_qualifications: 'PhD',
    admin_supervisor_name: 'Adriaan Engelbrecht',
    admin_supervisor_qualifications: 'PhD',
  },
  {
    student_number: '1234572',
    title: 'Mr',
    first_names: 'Noah',
    last_name: 'Jacobs',
    email: 'noah.jacobs@example.com',
    faculty: 'Natural Sciences',
    department: 'Biodiversity & Conservation Biology',
    degree_level: 'PHD',
    degree_type: 'FULL_THESIS',
    registration_type: 'FULL_TIME',
    first_enrolment_year: 2026,
    first_registration_date: '2025-12-20',
    expected_completion_date: '2030-01-30',
    thesis_title: 'Restoration ecology in fragmented landscapes',
    ethics_required: 1,
    ethics_ref_number: 'ETH-2026-BCB-006',
    first_registration_semester: 1,
    supervisor_name: 'AJ Smit',
    supervisor_qualifications: 'PhD',
    co_supervisor_name: 'Tommy Bornman',
    co_supervisor_qualifications: 'PhD',
    admin_supervisor_name: 'Adriaan Engelbrecht',
    admin_supervisor_qualifications: 'PhD',
  },
  {
    student_number: '1234573',
    title: 'Ms',
    first_names: 'Mila',
    last_name: 'Fortuin',
    email: 'mila.fortuin@example.com',
    faculty: 'Natural Sciences',
    department: 'Biodiversity & Conservation Biology',
    degree_level: 'MSC',
    degree_type: 'FULL_THESIS',
    registration_type: 'FULL_TIME',
    first_enrolment_year: 2026,
    first_registration_date: '2025-11-28',
    expected_completion_date: '2028-01-15',
    thesis_title: 'Mangrove nursery dynamics under salinity shifts',
    ethics_required: 0,
    ethics_ref_number: null,
    first_registration_semester: 1,
    supervisor_name: 'AJ Smit',
    supervisor_qualifications: 'PhD',
    co_supervisor_name: 'Tommy Bornman',
    co_supervisor_qualifications: 'PhD',
    admin_supervisor_name: 'Adriaan Engelbrecht',
    admin_supervisor_qualifications: 'PhD',
  },
  {
    student_number: '1234574',
    title: 'Mr',
    first_names: 'Ethan',
    last_name: 'Davids',
    email: 'ethan.davids@example.com',
    faculty: 'Natural Sciences',
    department: 'Mathematics',
    degree_level: 'MSC',
    degree_type: 'MINI_THESIS',
    registration_type: 'PART_TIME',
    registration_active: 0,
    first_enrolment_year: 2025,
    first_registration_date: '2025-09-01',
    expected_completion_date: '2027-05-30',
    thesis_title: 'Graph-theoretic models for invasive species spread',
    ethics_required: 0,
    ethics_ref_number: null,
    first_registration_semester: 2,
    supervisor_name: 'AJ Smit',
    supervisor_qualifications: 'PhD',
    co_supervisor_name: 'Tommy Bornman',
    co_supervisor_qualifications: 'PhD',
    admin_supervisor_name: 'Adriaan Engelbrecht',
    admin_supervisor_qualifications: 'PhD',
  },
  {
    student_number: '1234575',
    title: 'Ms',
    first_names: 'Riya',
    last_name: 'Moodley',
    email: 'riya.moodley@example.com',
    faculty: 'Natural Sciences',
    department: 'Biodiversity & Conservation Biology',
    degree_level: 'PHD',
    degree_type: 'FULL_THESIS',
    registration_type: 'FULL_TIME',
    first_enrolment_year: 2026,
    first_registration_date: '2026-01-12',
    expected_completion_date: '2030-04-20',
    thesis_title: 'Species occupancy modelling in fragmented fynbos',
    ethics_required: 1,
    ethics_ref_number: 'ETH-2026-BCB-009',
    first_registration_semester: 1,
    supervisor_name: 'AJ Smit',
    supervisor_qualifications: 'PhD',
    co_supervisor_name: 'Tommy Bornman',
    co_supervisor_qualifications: 'PhD',
    admin_supervisor_name: 'Adriaan Engelbrecht',
    admin_supervisor_qualifications: 'PhD',
  },
  {
    student_number: '1234576',
    title: 'Mr',
    first_names: 'Daniel',
    last_name: 'Solomons',
    email: 'daniel.solomons@example.com',
    faculty: 'Natural Sciences',
    department: 'Biodiversity & Conservation Biology',
    degree_level: 'MSC',
    degree_type: 'FULL_THESIS',
    registration_type: 'FULL_TIME',
    first_enrolment_year: 2026,
    first_registration_date: '2025-12-05',
    expected_completion_date: '2028-07-12',
    thesis_title: 'Bird diversity indices in peri-urban wetlands',
    ethics_required: 0,
    ethics_ref_number: null,
    first_registration_semester: 1,
    supervisor_name: 'AJ Smit',
    supervisor_qualifications: 'PhD',
    co_supervisor_name: 'Tommy Bornman',
    co_supervisor_qualifications: 'PhD',
    admin_supervisor_name: 'Adriaan Engelbrecht',
    admin_supervisor_qualifications: 'PhD',
  },
];

const seedStaff = [
  { staff_number: 'STAFF-001', full_name: 'AJ Smit', email: 'aj.smit@example.com', role: 'supervisor', department: 'Biodiversity & Conservation Biology', highest_qualification: 'PhD' },
  { staff_number: 'STAFF-002', full_name: 'Tommy Bornman', email: 'tommy.bornman@example.com', role: 'co_supervisor', department: 'Biodiversity & Conservation Biology', highest_qualification: 'PhD' },
  { staff_number: 'STAFF-003', full_name: 'Adriaan Engelbrecht', email: 'adriaan.engelbrecht@example.com', role: 'dept_fhd_rep', department: 'Biodiversity & Conservation Biology', highest_qualification: 'PhD' },
  { staff_number: 'STAFF-004', full_name: 'Natalie Isaacs', email: 'natalie.isaacs@example.com', role: 'faculty_fhd_rep', department: 'Faculty Office', highest_qualification: 'PhD' },
  { staff_number: 'STAFF-005', full_name: 'Anusha Rajkaran', email: 'anusha.rajkaran@example.com', role: 'hod', department: 'Biodiversity & Conservation Biology', highest_qualification: 'PhD' },
  { staff_number: 'STAFF-006', full_name: 'Jordan Petersen', email: 'jordan.petersen@example.com', role: 'dept_fhd_rep', department: 'Chemistry', highest_qualification: 'PhD' },
  { staff_number: 'STAFF-007', full_name: 'Palesa Nene', email: 'palesa.nene@example.com', role: 'dept_fhd_rep', department: 'Physics', highest_qualification: 'PhD' },
];

function parseStaffName(rawName: string): { title: string; firstName: string; lastName: string; cleanName: string } {
  const trimmed = rawName.trim().replace(/\s+/g, ' ');
  const clean = trimmed.split(' - ')[0].trim();
  const parts = clean.split(' ');

  const titleCandidates = ['Professor', 'Prof', 'Prof.', 'Associate', 'Dr', 'Ms', 'Mr', 'Mrs'];
  let title = '';
  let startIndex = 0;
  if (parts.length > 0 && titleCandidates.includes(parts[0])) {
    title = parts[0];
    startIndex = 1;
    if (parts[0] === 'Associate' && parts[1]?.startsWith('Prof')) {
      title = 'Associate Prof.';
      startIndex = 2;
    }
  }

  const core = parts.slice(startIndex);
  const firstName = core[0] ?? '';
  const lastName = core.slice(1).join(' ') || '';
  const cleanName = [firstName, lastName].filter(Boolean).join(' ').trim() || clean;
  return { title, firstName, lastName, cleanName };
}

function findHeaderIndex(header: string[], candidates: string[], fallback: number): number {
  const lowered = header.map((col) => col.trim().toLowerCase());
  for (const candidate of candidates) {
    const idx = lowered.indexOf(candidate);
    if (idx !== -1) {
      return idx;
    }
  }
  return fallback;
}

function composeRawStaffName(title: string, name: string): string {
  const cleanName = name.trim();
  const cleanTitle = title.trim();
  if (!cleanTitle) {
    return cleanName;
  }
  if (new RegExp(`^${cleanTitle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i').test(cleanName)) {
    return cleanName;
  }
  if (/^(prof\.?|associate\s+prof\.?|dr|mr|ms|mrs|professor)\b/i.test(cleanName)) {
    return cleanName;
  }
  return `${cleanTitle} ${cleanName}`.replace(/\s+/g, ' ').trim();
}

function parseCsvRows(content: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < content.length; i += 1) {
    const ch = content[i];
    const next = content[i + 1];

    if (ch === '"' && inQuotes && next === '"') {
      field += '"';
      i += 1;
      continue;
    }

    if (ch === '"') {
      inQuotes = !inQuotes;
      continue;
    }

    if (ch === ',' && !inQuotes) {
      row.push(field.trim());
      field = '';
      continue;
    }

    if ((ch === '\n' || ch === '\r') && !inQuotes) {
      if (ch === '\r' && next === '\n') {
        i += 1;
      }
      row.push(field.trim());
      field = '';
      if (row.some((col) => col.length > 0)) {
        rows.push(row);
      }
      row = [];
      continue;
    }

    field += ch;
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field.trim());
    if (row.some((col) => col.length > 0)) {
      rows.push(row);
    }
  }

  return rows;
}

function resolveRepoRootForCsv(): string {
  const candidates = [
    path.resolve(process.cwd()),
    path.resolve(process.cwd(), '..'),
    path.resolve(__dirname, '../../..'),
  ];
  for (const candidate of candidates) {
    if (existsSync(path.join(candidate, 'uwc_natural_sciences_departments.csv'))) {
      return candidate;
    }
  }
  return path.resolve(process.cwd());
}


export async function seedDemoData(db: Knex): Promise<void> {
  const enableDemoData = (process.env.ENABLE_DEMO_DATA ?? (process.env.NODE_ENV === 'production' ? 'false' : 'true')).trim().toLowerCase() === 'true';
  if (!enableDemoData) {
    return;
  }

  {
    const seedExternalAcademics = [
      {
        title: 'Prof',
        first_name: 'Bunny',
        last_name: 'Boo',
        full_name: 'Prof Bunny Boo',
        normalized_full_name: 'bunny boo',
        unique_identifier_type: 'SA_ID',
        unique_identifier_value: '7801015009087',
        normalized_unique_identifier: 'SA_ID:7801015009087',
        highest_qualification: 'PhD/Doctorate',
        email: 'bunny.boo@gmail.com',
        address: '94 Bay View Lodge, 94 Main Rd, Muizenberg',
        affiliation_institution: 'University of Cape Town',
        affiliation_department: 'Biological Sciences',
        country: 'South Africa',
        phone: '',
        orcid: '',
        expertise_keywords: 'Biodiversity, Marine Ecology, Conservation',
        eligible_as_supervisor: true,
        eligible_as_examiner: true,
        eligible_as_arbiter: true,
        is_international: false,
        is_former_uwc_staff: false,
        is_former_uwc_student: false,
        cv_last_received_on: null,
        cv_file_path: '',
        notes: '',
      },
      {
        title: 'Dr',
        first_name: 'Amelia',
        last_name: 'Grant',
        full_name: 'Dr Amelia Grant',
        normalized_full_name: 'amelia grant',
        unique_identifier_type: 'PASSPORT',
        unique_identifier_value: 'UK-55682911',
        normalized_unique_identifier: 'PASSPORT:UK55682911',
        highest_qualification: 'PhD',
        email: 'amelia.grant@example.org',
        address: 'School of Earth Sciences, University of Oxford',
        affiliation_institution: 'University of Oxford',
        affiliation_department: 'Earth Sciences',
        country: 'United Kingdom',
        phone: '',
        orcid: '',
        expertise_keywords: 'Climate, Hydrology, Environmental Modelling',
        eligible_as_supervisor: true,
        eligible_as_examiner: true,
        eligible_as_arbiter: true,
        is_international: true,
        is_former_uwc_staff: false,
        is_former_uwc_student: false,
        cv_last_received_on: null,
        cv_file_path: '',
        notes: '',
      },
    ];
    await db('external_academic_registry').insert(seedExternalAcademics).onConflict('normalized_full_name').merge();
  }
  {
    const demoPasswordHash = await hashPassword(process.env.DEMO_USER_PASSWORD ?? 'ChangeMe123!');
    const demoUsers = [
      {
        sasi_id: '1234567',
        first_name: 'Jesse',
        last_name: 'Smith',
        email: 'jesse.smith@example.com',
        role: 'student' as const,
        staff_number: null,
        departments: null,
        active: true,
      },
      {
        sasi_id: 'STAFF-001',
        first_name: 'AJ',
        last_name: 'Smit',
        email: 'aj.smit@example.com',
        role: 'supervisor' as const,
        staff_number: 'STAFF-001',
        departments: null,
        active: true,
      },
      {
        sasi_id: 'STAFF-003',
        first_name: 'Adriaan',
        last_name: 'Engelbrecht',
        email: 'adriaan.engelbrecht@example.com',
        role: 'dept_hd_rep' as const,
        staff_number: 'STAFF-003',
        departments: JSON.stringify(['Biodiversity & Conservation Biology']),
        active: true,
      },
      {
        sasi_id: 'STAFF-004',
        first_name: 'Natalie',
        last_name: 'Isaacs',
        email: 'natalie.isaacs@example.com',
        role: 'faculty_hd_rep' as const,
        staff_number: 'STAFF-004',
        departments: null,
        active: true,
      },
      {
        sasi_id: 'STAFF-005',
        first_name: 'Anusha',
        last_name: 'Rajkaran',
        email: 'anusha.rajkaran@example.com',
        role: 'dept_chairperson' as const,
        staff_number: 'STAFF-005',
        departments: JSON.stringify(['Biodiversity & Conservation Biology']),
        active: true,
      },
    ];

    for (const user of demoUsers) {
      const existing = await db('users')
        .where({ sasi_id: user.sasi_id })
        .orWhere({ email: user.email })
        .first();
      if (existing?.id) {
        await db('users')
          .where({ id: existing.id })
          .update({
            sasi_id: user.sasi_id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            role: user.role,
            staff_number: user.staff_number,
            departments: user.departments,
            password_hash: demoPasswordHash,
            active: user.active,
            updated_at: db.fn.now(),
          });
      } else {
        await db('users').insert({
          ...user,
          password_hash: demoPasswordHash,
        });
      }
    }

    await db('sasi_staff').insert(seedStaff).onConflict('staff_number').merge();
    const normalizedSeedStudents = seedSasiStudents.map((row) => ({
      ...row,
      registration_active: row.registration_active ?? 1,
    }));
    await db('sasi_students').insert(normalizedSeedStudents).onConflict('student_number').merge();

    const repoRoot = resolveRepoRootForCsv();
    const departmentsCsvPath = path.join(repoRoot, 'uwc_natural_sciences_departments.csv');
    const staffCsvPath = path.join(repoRoot, 'uwc_bcb_academic_staff_highest_qualification.csv');

    if (existsSync(departmentsCsvPath)) {
      const raw = await fs.readFile(departmentsCsvPath, 'utf-8');
      const rows = parseCsvRows(raw);
      const dataRows = rows.slice(1).filter((r) => r.length >= 2);
      if (dataRows.length > 0) {
        await db('uwc_departments')
          .insert(
            dataRows.map((r) => ({
              faculty_name: r[0],
              department_name: r[1],
            })),
          )
          .onConflict(['faculty_name', 'department_name'])
          .ignore();
      }
    }

    if (existsSync(staffCsvPath)) {
      const raw = await fs.readFile(staffCsvPath, 'utf-8');
      const rows = parseCsvRows(raw);
      const header = rows[0] ?? [];
      const dataRows = rows.slice(1).filter((r) => r.some((value) => value.trim().length > 0));
      if (dataRows.length > 0) {
        const titleIndex = findHeaderIndex(header, ['title'], 0);
        const nameIndex = findHeaderIndex(header, ['staff name', 'name'], 0);
        const positionIndex = findHeaderIndex(header, ['position', 'position title'], 1);
        const qualificationIndex = findHeaderIndex(header, ['highest qualification', 'qualification'], 2);
        const normalizedRows = dataRows
          .map((row) => {
            const rawName = composeRawStaffName(row[titleIndex] ?? '', row[nameIndex] ?? '');
            const parsed = parseStaffName(rawName);
            return {
              staff_name: parsed.cleanName,
              staff_title: parsed.title,
              first_name: parsed.firstName,
              last_name: parsed.lastName,
              position_title: row[positionIndex] ?? '',
              highest_qualification: row[qualificationIndex] ?? '',
              faculty_name: 'Faculty of Natural Sciences',
              department_name: 'Department of Biodiversity and Conservation Biology',
              is_internal: 1,
            };
          })
          .filter((row) => row.staff_name.trim().length > 0);

        await db('uwc_staff_directory')
          .where({
            faculty_name: 'Faculty of Natural Sciences',
            department_name: 'Department of Biodiversity and Conservation Biology',
            is_internal: 1,
          })
          .del();

        await db('uwc_staff_directory')
          .insert(normalizedRows)
          .onConflict('staff_name')
          .merge();
      }
    }
  }
}
