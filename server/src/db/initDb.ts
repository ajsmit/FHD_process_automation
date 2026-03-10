import db from './knex';
import fs from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';

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

async function ensureColumn(
  tableName: string,
  columnName: string,
  add: (table: import('knex').Knex.CreateTableBuilder) => void,
): Promise<void> {
  const has = await db.schema.hasColumn(tableName, columnName);
  if (!has) {
    await db.schema.alterTable(tableName, (table) => add(table));
  }
}

export async function initDb(): Promise<void> {
  const enableDemoData = (process.env.ENABLE_DEMO_DATA ?? (process.env.NODE_ENV === 'production' ? 'false' : 'true')).trim().toLowerCase() === 'true';

  if (!(await db.schema.hasTable('users'))) {
    await db.schema.createTable('users', (table) => {
      table.increments('id').primary();
      table.string('sasi_id').unique();
      table.string('first_name').notNullable();
      table.string('last_name').notNullable();
      table.string('email').notNullable().unique();
      table.enum('role', ['student', 'supervisor', 'admin']).notNullable();
      table.timestamps(true, true);
    });
  }

  if (!(await db.schema.hasTable('title_registrations'))) {
    await db.schema.createTable('title_registrations', (table) => {
      table.increments('id').primary();
      table.integer('student_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
      table.integer('supervisor_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
      table.string('proposed_title').notNullable();
      table.text('abstract');
      table.enum('status', ['pending_approval', 'approved', 'rejected']).notNullable().defaultTo('pending_approval');
      table.timestamp('submission_date').defaultTo(db.fn.now());
      table.timestamp('approval_date');
      table.timestamps(true, true);
    });
  }

  if (!(await db.schema.hasTable('sasi_students'))) {
    await db.schema.createTable('sasi_students', (table) => {
      table.increments('id').primary();
      table.string('student_number').notNullable().unique();
      table.string('title');
      table.string('first_names').notNullable();
      table.string('last_name').notNullable();
      table.string('email');
      table.string('faculty').notNullable();
      table.string('department').notNullable();
      table.enum('degree_level', ['MSC', 'PHD']).notNullable();
      table.enum('degree_type', ['FULL_THESIS', 'MINI_THESIS', 'PROJECT']).notNullable();
      table.enum('registration_type', ['FULL_TIME', 'PART_TIME']).notNullable();
      table.boolean('registration_active').notNullable().defaultTo(true);
      table.integer('first_enrolment_year').notNullable();
      table.date('first_registration_date');
      table.integer('first_registration_semester');
      table.date('expected_completion_date');
      table.string('thesis_title');
      table.boolean('ethics_required').notNullable().defaultTo(false);
      table.string('ethics_ref_number');
      table.string('supervisor_name');
      table.string('supervisor_qualifications');
      table.string('co_supervisor_name');
      table.string('co_supervisor_qualifications');
      table.string('admin_supervisor_name');
      table.string('admin_supervisor_qualifications');
      table.timestamps(true, true);
    });
  }

  await ensureColumn('sasi_students', 'first_registration_date', (table) => table.date('first_registration_date'));
  await ensureColumn('sasi_students', 'first_registration_semester', (table) => table.integer('first_registration_semester'));
  await ensureColumn('sasi_students', 'registration_active', (table) => table.boolean('registration_active').notNullable().defaultTo(true));
  await ensureColumn('sasi_students', 'supervisor_name', (table) => table.string('supervisor_name'));
  await ensureColumn('sasi_students', 'supervisor_qualifications', (table) => table.string('supervisor_qualifications'));
  await ensureColumn('sasi_students', 'co_supervisor_name', (table) => table.string('co_supervisor_name'));
  await ensureColumn('sasi_students', 'co_supervisor_qualifications', (table) => table.string('co_supervisor_qualifications'));
  await ensureColumn('sasi_students', 'admin_supervisor_name', (table) => table.string('admin_supervisor_name'));
  await ensureColumn('sasi_students', 'admin_supervisor_qualifications', (table) => table.string('admin_supervisor_qualifications'));

  if (!(await db.schema.hasTable('sasi_staff'))) {
    await db.schema.createTable('sasi_staff', (table) => {
      table.increments('id').primary();
      table.string('staff_number').notNullable().unique();
      table.string('full_name').notNullable();
      table.string('email').notNullable().unique();
      table.string('role').notNullable();
      table.string('department').notNullable();
      table.string('highest_qualification');
      table.timestamps(true, true);
    });
  }
  await ensureColumn('sasi_staff', 'highest_qualification', (table) => table.string('highest_qualification'));

  if (!(await db.schema.hasTable('phase1_workflows'))) {
    await db.schema.createTable('phase1_workflows', (table) => {
      table.increments('id').primary();
      table.integer('sasi_student_id').unsigned().notNullable().references('id').inTable('sasi_students').onDelete('CASCADE');
      table.enum('mou_status', ['pending', 'completed']).notNullable().defaultTo('pending');
      table.enum('title_registration_status', ['pending', 'completed']).notNullable().defaultTo('pending');
      table.enum('supervisor_profile_status', ['pending', 'completed']).notNullable().defaultTo('pending');
      table.enum('examiners_status', ['pending', 'completed']).notNullable().defaultTo('pending');
      table.string('last_blocker');
      table.timestamps(true, true);
      table.unique(['sasi_student_id']);
    });
  }
  if (await db.schema.hasColumn('phase1_workflows', 'intention_to_submit_status')) {
    await db.schema.alterTable('phase1_workflows', (table) => {
      table.dropColumn('intention_to_submit_status');
    });
  }

  if (!(await db.schema.hasTable('generated_documents'))) {
    await db.schema.createTable('generated_documents', (table) => {
      table.increments('id').primary();
      table.integer('workflow_id').unsigned().notNullable().references('id').inTable('phase1_workflows').onDelete('CASCADE');
      table.string('step_key').notNullable();
      table.string('source_docx').notNullable();
      table.string('output_pdf').notNullable();
      table.timestamp('generated_at').notNullable().defaultTo(db.fn.now());
    });
  }

  if (!(await db.schema.hasTable('title_registration_cases'))) {
    await db.schema.createTable('title_registration_cases', (table) => {
      table.increments('id').primary();
      table.integer('sasi_student_id').unsigned().notNullable().references('id').inTable('sasi_students').onDelete('CASCADE');
      table.string('case_status').notNullable().defaultTo('awaiting_student_vetting');
      table.text('form_data_json').notNullable();
      table.float('completion_percent').notNullable().defaultTo(0);
      table.string('pdf_path');
      table.timestamp('student_vetted_at');
      table.timestamp('supervisor_reviewed_at');
      table.timestamp('dept_reviewed_at');
      table.timestamp('faculty_reviewed_at');
      table.timestamp('sent_to_faculty_at');
      table.timestamp('last_reminder_at');
      table.text('last_comments');
      table.timestamps(true, true);
      table.unique(['sasi_student_id']);
    });
  }

  if (!(await db.schema.hasTable('notification_queue'))) {
    await db.schema.createTable('notification_queue', (table) => {
      table.increments('id').primary();
      table.integer('case_id').unsigned().references('id').inTable('title_registration_cases').onDelete('CASCADE');
      table.string('email_to').notNullable();
      table.string('subject').notNullable();
      table.text('body').notNullable();
      table.string('status').notNullable().defaultTo('queued');
      table.timestamp('created_at').notNullable().defaultTo(db.fn.now());
    });
  }

  if (!(await db.schema.hasTable('module_entries'))) {
    await db.schema.createTable('module_entries', (table) => {
      table.increments('id').primary();
      table.integer('case_id').unsigned().notNullable().references('id').inTable('title_registration_cases').onDelete('CASCADE');
      table.string('module_name').notNullable();
      table.string('status').notNullable().defaultTo('pending');
      table.text('summary').notNullable().defaultTo('');
      table.timestamp('updated_at').notNullable().defaultTo(db.fn.now());
      table.unique(['case_id', 'module_name']);
    });
  }

  if (!(await db.schema.hasTable('mou_forms'))) {
    await db.schema.createTable('mou_forms', (table) => {
      table.increments('id').primary();
      table.integer('case_id').unsigned().notNullable().references('id').inTable('title_registration_cases').onDelete('CASCADE');
      table.text('form_data_json').notNullable();
      table.float('completion_percent').notNullable().defaultTo(0);
      table.string('status').notNullable().defaultTo('draft');
      table.string('pdf_path');
      table.timestamp('submitted_at');
      table.timestamps(true, true);
      table.unique(['case_id']);
    });
  }

  if (!(await db.schema.hasTable('intention_to_submit_forms'))) {
    await db.schema.createTable('intention_to_submit_forms', (table) => {
      table.increments('id').primary();
      table.integer('case_id').unsigned().notNullable().references('id').inTable('title_registration_cases').onDelete('CASCADE');
      table.text('form_data_json').notNullable();
      table.float('completion_percent').notNullable().defaultTo(0);
      table.string('status').notNullable().defaultTo('draft');
      table.timestamp('submitted_at');
      table.timestamps(true, true);
      table.unique(['case_id']);
    });
  }

  if (!(await db.schema.hasTable('appoint_examiners_forms'))) {
    await db.schema.createTable('appoint_examiners_forms', (table) => {
      table.increments('id').primary();
      table.integer('case_id').unsigned().notNullable().references('id').inTable('title_registration_cases').onDelete('CASCADE');
      table.text('form_data_json').notNullable();
      table.float('completion_percent').notNullable().defaultTo(0);
      table.string('status').notNullable().defaultTo('draft');
      table.timestamp('submitted_at');
      table.timestamps(true, true);
      table.unique(['case_id']);
    });
  }

  if (!(await db.schema.hasTable('change_examiners_forms'))) {
    await db.schema.createTable('change_examiners_forms', (table) => {
      table.increments('id').primary();
      table.integer('case_id').unsigned().notNullable().references('id').inTable('title_registration_cases').onDelete('CASCADE');
      table.text('form_data_json').notNullable();
      table.float('completion_percent').notNullable().defaultTo(0);
      table.string('status').notNullable().defaultTo('draft');
      table.timestamp('submitted_at');
      table.timestamps(true, true);
      table.unique(['case_id']);
    });
  }

  if (!(await db.schema.hasTable('examiner_summary_cv_forms'))) {
    await db.schema.createTable('examiner_summary_cv_forms', (table) => {
      table.increments('id').primary();
      table.integer('case_id').unsigned().notNullable().references('id').inTable('title_registration_cases').onDelete('CASCADE');
      table.text('form_data_json').notNullable();
      table.float('completion_percent').notNullable().defaultTo(0);
      table.string('status').notNullable().defaultTo('draft');
      table.timestamp('submitted_at');
      table.timestamps(true, true);
      table.unique(['case_id']);
    });
  }

  if (!(await db.schema.hasTable('appoint_arbiter_forms'))) {
    await db.schema.createTable('appoint_arbiter_forms', (table) => {
      table.increments('id').primary();
      table.integer('case_id').unsigned().notNullable().references('id').inTable('title_registration_cases').onDelete('CASCADE');
      table.text('form_data_json').notNullable();
      table.float('completion_percent').notNullable().defaultTo(0);
      table.string('status').notNullable().defaultTo('draft');
      table.timestamp('submitted_at');
      table.timestamps(true, true);
      table.unique(['case_id']);
    });
  }

  if (!(await db.schema.hasTable('supervisor_profile_forms'))) {
    await db.schema.createTable('supervisor_profile_forms', (table) => {
      table.increments('id').primary();
      table.integer('case_id').unsigned().notNullable().references('id').inTable('title_registration_cases').onDelete('CASCADE');
      table.string('role').notNullable();
      table.string('person_name').notNullable();
      table.string('person_title').notNullable().defaultTo('');
      table.string('qualifications').notNullable().defaultTo('');
      table.string('is_internal').notNullable().defaultTo('Yes');
      table.string('external_address').notNullable().defaultTo('');
      table.string('contact_email').notNullable().defaultTo('');
      table.integer('publication_count');
      table.text('recent_publications_json').notNullable().defaultTo('[]');
      table.text('contribution_motivation').notNullable().defaultTo('');
      table.string('new_to_department').notNullable().defaultTo('No');
      table.string('cv_attached').notNullable().defaultTo('No');
      table.string('cv_file_path').notNullable().defaultTo('');
      table.string('status').notNullable().defaultTo('draft');
      table.timestamp('requested_at');
      table.timestamp('submitted_at');
      table.timestamp('last_reminder_at');
      table.timestamps(true, true);
      table.unique(['case_id', 'role', 'person_name']);
    });
  }
  await ensureColumn('supervisor_profile_forms', 'cv_file_path', (table) => table.string('cv_file_path').notNullable().defaultTo(''));

  if (!(await db.schema.hasTable('uwc_departments'))) {
    await db.schema.createTable('uwc_departments', (table) => {
      table.increments('id').primary();
      table.string('faculty_name').notNullable();
      table.string('department_name').notNullable();
      table.timestamps(true, true);
      table.unique(['faculty_name', 'department_name']);
    });
  }

  if (!(await db.schema.hasTable('uwc_staff_directory'))) {
    await db.schema.createTable('uwc_staff_directory', (table) => {
      table.increments('id').primary();
      table.string('staff_number');
      table.string('staff_name').notNullable().unique();
      table.string('staff_title');
      table.string('first_name');
      table.string('last_name');
      table.string('email');
      table.string('phone');
      table.string('position_title');
      table.string('highest_qualification');
      table.string('employee_type');
      table.string('faculty_role');
      table.string('office_location');
      table.string('campus');
      table.string('orcid');
      table.string('google_scholar_url');
      table.string('scopus_id');
      table.string('research_specialisations');
      table.boolean('is_nrf_rated').notNullable().defaultTo(false);
      table.string('nrf_rating');
      table.boolean('available_as_supervisor').notNullable().defaultTo(true);
      table.boolean('available_as_co_supervisor').notNullable().defaultTo(true);
      table.boolean('available_as_examiner').notNullable().defaultTo(true);
      table.boolean('available_as_arbiter').notNullable().defaultTo(true);
      table.boolean('can_serve_as_chair').notNullable().defaultTo(false);
      table.boolean('can_sign_hod_delegate').notNullable().defaultTo(false);
      table.integer('max_supervision_load').notNullable().defaultTo(0);
      table.integer('current_supervision_load').notNullable().defaultTo(0);
      table.integer('max_examiner_load').notNullable().defaultTo(0);
      table.integer('current_examiner_load').notNullable().defaultTo(0);
      table.text('availability_notes').notNullable().defaultTo('');
      table.boolean('active_status').notNullable().defaultTo(true);
      table.string('faculty_name').notNullable();
      table.string('department_name').notNullable();
      table.boolean('is_internal').notNullable().defaultTo(true);
      table.timestamps(true, true);
    });
  }
  await ensureColumn('uwc_staff_directory', 'staff_number', (table) => table.string('staff_number'));
  await ensureColumn('uwc_staff_directory', 'staff_title', (table) => table.string('staff_title'));
  await ensureColumn('uwc_staff_directory', 'first_name', (table) => table.string('first_name'));
  await ensureColumn('uwc_staff_directory', 'last_name', (table) => table.string('last_name'));
  await ensureColumn('uwc_staff_directory', 'email', (table) => table.string('email'));
  await ensureColumn('uwc_staff_directory', 'phone', (table) => table.string('phone'));
  await ensureColumn('uwc_staff_directory', 'employee_type', (table) => table.string('employee_type'));
  await ensureColumn('uwc_staff_directory', 'faculty_role', (table) => table.string('faculty_role'));
  await ensureColumn('uwc_staff_directory', 'office_location', (table) => table.string('office_location'));
  await ensureColumn('uwc_staff_directory', 'campus', (table) => table.string('campus'));
  await ensureColumn('uwc_staff_directory', 'orcid', (table) => table.string('orcid'));
  await ensureColumn('uwc_staff_directory', 'google_scholar_url', (table) => table.string('google_scholar_url'));
  await ensureColumn('uwc_staff_directory', 'scopus_id', (table) => table.string('scopus_id'));
  await ensureColumn('uwc_staff_directory', 'research_specialisations', (table) => table.string('research_specialisations'));
  await ensureColumn('uwc_staff_directory', 'is_nrf_rated', (table) => table.boolean('is_nrf_rated').notNullable().defaultTo(false));
  await ensureColumn('uwc_staff_directory', 'nrf_rating', (table) => table.string('nrf_rating'));
  await ensureColumn('uwc_staff_directory', 'available_as_supervisor', (table) => table.boolean('available_as_supervisor').notNullable().defaultTo(true));
  await ensureColumn('uwc_staff_directory', 'available_as_co_supervisor', (table) => table.boolean('available_as_co_supervisor').notNullable().defaultTo(true));
  await ensureColumn('uwc_staff_directory', 'available_as_examiner', (table) => table.boolean('available_as_examiner').notNullable().defaultTo(true));
  await ensureColumn('uwc_staff_directory', 'available_as_arbiter', (table) => table.boolean('available_as_arbiter').notNullable().defaultTo(true));
  await ensureColumn('uwc_staff_directory', 'can_serve_as_chair', (table) => table.boolean('can_serve_as_chair').notNullable().defaultTo(false));
  await ensureColumn('uwc_staff_directory', 'can_sign_hod_delegate', (table) => table.boolean('can_sign_hod_delegate').notNullable().defaultTo(false));
  await ensureColumn('uwc_staff_directory', 'max_supervision_load', (table) => table.integer('max_supervision_load').notNullable().defaultTo(0));
  await ensureColumn('uwc_staff_directory', 'current_supervision_load', (table) => table.integer('current_supervision_load').notNullable().defaultTo(0));
  await ensureColumn('uwc_staff_directory', 'max_examiner_load', (table) => table.integer('max_examiner_load').notNullable().defaultTo(0));
  await ensureColumn('uwc_staff_directory', 'current_examiner_load', (table) => table.integer('current_examiner_load').notNullable().defaultTo(0));
  await ensureColumn('uwc_staff_directory', 'availability_notes', (table) => table.text('availability_notes').notNullable().defaultTo(''));
  await ensureColumn('uwc_staff_directory', 'active_status', (table) => table.boolean('active_status').notNullable().defaultTo(true));

  if (!(await db.schema.hasTable('external_academic_registry'))) {
    await db.schema.createTable('external_academic_registry', (table) => {
      table.increments('id').primary();
      table.string('title').notNullable().defaultTo('');
      table.string('first_name').notNullable();
      table.string('middle_names').notNullable().defaultTo('');
      table.string('preferred_name').notNullable().defaultTo('');
      table.string('last_name').notNullable();
      table.string('full_name').notNullable();
      table.string('normalized_full_name').notNullable().unique();
      table.string('unique_identifier_type').notNullable().defaultTo('');
      table.string('unique_identifier_value').notNullable().defaultTo('');
      table.string('normalized_unique_identifier').unique();
      table.string('highest_qualification').notNullable().defaultTo('');
      table.string('email').notNullable().defaultTo('');
      table.string('alternate_email').notNullable().defaultTo('');
      table.string('preferred_contact_method').notNullable().defaultTo('');
      table.string('address').notNullable().defaultTo('');
      table.string('city').notNullable().defaultTo('');
      table.string('province_state').notNullable().defaultTo('');
      table.string('postal_code').notNullable().defaultTo('');
      table.string('affiliation_institution').notNullable().defaultTo('');
      table.string('affiliation_department').notNullable().defaultTo('');
      table.string('affiliation_position_title').notNullable().defaultTo('');
      table.string('country').notNullable().defaultTo('');
      table.string('phone').notNullable().defaultTo('');
      table.string('orcid').notNullable().defaultTo('');
      table.string('website_url').notNullable().defaultTo('');
      table.string('google_scholar_url').notNullable().defaultTo('');
      table.string('scopus_id').notNullable().defaultTo('');
      table.string('expertise_keywords').notNullable().defaultTo('');
      table.boolean('eligible_as_supervisor').notNullable().defaultTo(true);
      table.boolean('eligible_as_examiner').notNullable().defaultTo(true);
      table.boolean('eligible_as_arbiter').notNullable().defaultTo(true);
      table.boolean('eligible_for_masters').notNullable().defaultTo(true);
      table.boolean('eligible_for_phd').notNullable().defaultTo(true);
      table.boolean('is_international').notNullable().defaultTo(false);
      table.boolean('is_former_uwc_staff').notNullable().defaultTo(false);
      table.boolean('is_former_uwc_student').notNullable().defaultTo(false);
      table.date('cv_last_received_on');
      table.string('cv_file_path').notNullable().defaultTo('');
      table.date('last_appointed_supervisor_on');
      table.date('last_appointed_examiner_on');
      table.date('last_appointed_arbiter_on');
      table.integer('max_active_assignments').notNullable().defaultTo(0);
      table.integer('current_active_assignments').notNullable().defaultTo(0);
      table.text('conflict_of_interest_notes').notNullable().defaultTo('');
      table.boolean('active_status').notNullable().defaultTo(true);
      table.text('notes').notNullable().defaultTo('');
      table.timestamps(true, true);
    });
  }

  await ensureColumn('external_academic_registry', 'title', (table) => table.string('title').notNullable().defaultTo(''));
  await ensureColumn('external_academic_registry', 'first_name', (table) => table.string('first_name').notNullable().defaultTo(''));
  await ensureColumn('external_academic_registry', 'middle_names', (table) => table.string('middle_names').notNullable().defaultTo(''));
  await ensureColumn('external_academic_registry', 'preferred_name', (table) => table.string('preferred_name').notNullable().defaultTo(''));
  await ensureColumn('external_academic_registry', 'last_name', (table) => table.string('last_name').notNullable().defaultTo(''));
  await ensureColumn('external_academic_registry', 'full_name', (table) => table.string('full_name').notNullable().defaultTo(''));
  await ensureColumn('external_academic_registry', 'normalized_full_name', (table) => table.string('normalized_full_name').notNullable().defaultTo(''));
  await ensureColumn('external_academic_registry', 'unique_identifier_type', (table) => table.string('unique_identifier_type').notNullable().defaultTo(''));
  await ensureColumn('external_academic_registry', 'unique_identifier_value', (table) => table.string('unique_identifier_value').notNullable().defaultTo(''));
  await ensureColumn('external_academic_registry', 'normalized_unique_identifier', (table) => table.string('normalized_unique_identifier'));
  try {
    await db.raw(
      'CREATE UNIQUE INDEX IF NOT EXISTS idx_external_academic_registry_normalized_unique_identifier ON external_academic_registry(normalized_unique_identifier)',
    );
  } catch {
    // Best-effort index creation for existing databases.
  }
  await ensureColumn('external_academic_registry', 'highest_qualification', (table) => table.string('highest_qualification').notNullable().defaultTo(''));
  await ensureColumn('external_academic_registry', 'email', (table) => table.string('email').notNullable().defaultTo(''));
  await ensureColumn('external_academic_registry', 'alternate_email', (table) => table.string('alternate_email').notNullable().defaultTo(''));
  await ensureColumn('external_academic_registry', 'preferred_contact_method', (table) => table.string('preferred_contact_method').notNullable().defaultTo(''));
  await ensureColumn('external_academic_registry', 'address', (table) => table.string('address').notNullable().defaultTo(''));
  await ensureColumn('external_academic_registry', 'city', (table) => table.string('city').notNullable().defaultTo(''));
  await ensureColumn('external_academic_registry', 'province_state', (table) => table.string('province_state').notNullable().defaultTo(''));
  await ensureColumn('external_academic_registry', 'postal_code', (table) => table.string('postal_code').notNullable().defaultTo(''));
  await ensureColumn('external_academic_registry', 'affiliation_institution', (table) => table.string('affiliation_institution').notNullable().defaultTo(''));
  await ensureColumn('external_academic_registry', 'affiliation_department', (table) => table.string('affiliation_department').notNullable().defaultTo(''));
  await ensureColumn('external_academic_registry', 'affiliation_position_title', (table) =>
    table.string('affiliation_position_title').notNullable().defaultTo(''));
  await ensureColumn('external_academic_registry', 'country', (table) => table.string('country').notNullable().defaultTo(''));
  await ensureColumn('external_academic_registry', 'phone', (table) => table.string('phone').notNullable().defaultTo(''));
  await ensureColumn('external_academic_registry', 'orcid', (table) => table.string('orcid').notNullable().defaultTo(''));
  await ensureColumn('external_academic_registry', 'website_url', (table) => table.string('website_url').notNullable().defaultTo(''));
  await ensureColumn('external_academic_registry', 'google_scholar_url', (table) => table.string('google_scholar_url').notNullable().defaultTo(''));
  await ensureColumn('external_academic_registry', 'scopus_id', (table) => table.string('scopus_id').notNullable().defaultTo(''));
  await ensureColumn('external_academic_registry', 'expertise_keywords', (table) => table.string('expertise_keywords').notNullable().defaultTo(''));
  await ensureColumn('external_academic_registry', 'eligible_as_supervisor', (table) => table.boolean('eligible_as_supervisor').notNullable().defaultTo(true));
  await ensureColumn('external_academic_registry', 'eligible_as_examiner', (table) => table.boolean('eligible_as_examiner').notNullable().defaultTo(true));
  await ensureColumn('external_academic_registry', 'eligible_as_arbiter', (table) => table.boolean('eligible_as_arbiter').notNullable().defaultTo(true));
  await ensureColumn('external_academic_registry', 'eligible_for_masters', (table) => table.boolean('eligible_for_masters').notNullable().defaultTo(true));
  await ensureColumn('external_academic_registry', 'eligible_for_phd', (table) => table.boolean('eligible_for_phd').notNullable().defaultTo(true));
  await ensureColumn('external_academic_registry', 'is_international', (table) => table.boolean('is_international').notNullable().defaultTo(false));
  await ensureColumn('external_academic_registry', 'is_former_uwc_staff', (table) => table.boolean('is_former_uwc_staff').notNullable().defaultTo(false));
  await ensureColumn('external_academic_registry', 'is_former_uwc_student', (table) => table.boolean('is_former_uwc_student').notNullable().defaultTo(false));
  await ensureColumn('external_academic_registry', 'cv_last_received_on', (table) => table.date('cv_last_received_on'));
  await ensureColumn('external_academic_registry', 'cv_file_path', (table) => table.string('cv_file_path').notNullable().defaultTo(''));
  await ensureColumn('external_academic_registry', 'last_appointed_supervisor_on', (table) => table.date('last_appointed_supervisor_on'));
  await ensureColumn('external_academic_registry', 'last_appointed_examiner_on', (table) => table.date('last_appointed_examiner_on'));
  await ensureColumn('external_academic_registry', 'last_appointed_arbiter_on', (table) => table.date('last_appointed_arbiter_on'));
  await ensureColumn('external_academic_registry', 'max_active_assignments', (table) => table.integer('max_active_assignments').notNullable().defaultTo(0));
  await ensureColumn('external_academic_registry', 'current_active_assignments', (table) =>
    table.integer('current_active_assignments').notNullable().defaultTo(0));
  await ensureColumn('external_academic_registry', 'conflict_of_interest_notes', (table) =>
    table.text('conflict_of_interest_notes').notNullable().defaultTo(''));
  await ensureColumn('external_academic_registry', 'active_status', (table) => table.boolean('active_status').notNullable().defaultTo(true));
  await ensureColumn('external_academic_registry', 'notes', (table) => table.text('notes').notNullable().defaultTo(''));

  if (await db.schema.hasTable('external_supervisors')) {
    const legacyRows = await db('external_supervisors').select('*');
    if (legacyRows.length > 0) {
      await db('external_academic_registry')
        .insert(
          legacyRows.map((row) => ({
            title: String(row.title ?? ''),
            first_name: String(row.first_name ?? ''),
            last_name: String(row.last_name ?? ''),
            full_name: String(row.full_name ?? ''),
            normalized_full_name: String(row.normalized_full_name ?? ''),
            unique_identifier_type: '',
            unique_identifier_value: '',
            normalized_unique_identifier: null,
            highest_qualification: String(row.highest_qualification ?? ''),
            email: String(row.email ?? ''),
            address: String(row.address ?? ''),
          })),
        )
        .onConflict('normalized_full_name')
        .merge({ updated_at: db.fn.now() });
    }
  }

  if (enableDemoData) {
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

  if (!(await db.schema.hasTable('external_academic_profile_invites'))) {
    await db.schema.createTable('external_academic_profile_invites', (table) => {
      table.increments('id').primary();
      table.integer('case_id').unsigned().references('id').inTable('title_registration_cases').onDelete('CASCADE');
      table.string('role').notNullable();
      table.string('email').notNullable();
      table.string('token').notNullable().unique();
      table.string('status').notNullable().defaultTo('pending');
      table.timestamp('expires_at');
      table.timestamp('completed_at');
      table.integer('external_academic_id').unsigned().references('id').inTable('external_academic_registry').onDelete('SET NULL');
      table.timestamps(true, true);
    });
  }

  if (enableDemoData) {
    const demoUsers = [
      { sasi_id: '1234567', first_name: 'Jesse', last_name: 'Smith', email: 'jesse.smith@example.com', role: 'student' as const },
      { sasi_id: 'STAFF-001', first_name: 'AJ', last_name: 'Smit', email: 'aj.smit@example.com', role: 'supervisor' as const },
      { sasi_id: 'STAFF-003', first_name: 'Adriaan', last_name: 'Engelbrecht', email: 'adriaan.engelbrecht@example.com', role: 'admin' as const },
      { sasi_id: 'STAFF-004', first_name: 'Natalie', last_name: 'Isaacs', email: 'natalie.isaacs@example.com', role: 'admin' as const },
      { sasi_id: 'STAFF-005', first_name: 'Anusha', last_name: 'Rajkaran', email: 'anusha.rajkaran@example.com', role: 'admin' as const },
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
            updated_at: db.fn.now(),
          });
      } else {
        await db('users').insert(user);
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
