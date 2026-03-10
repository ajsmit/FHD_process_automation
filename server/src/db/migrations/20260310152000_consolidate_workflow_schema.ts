import type { Knex } from 'knex';

let activeKnex: Knex | null = null;

async function ensureColumn(
  tableName: string,
  columnName: string,
  add: (table: Knex.CreateTableBuilder) => void,
): Promise<void> {
  if (!activeKnex) {
    throw new Error('ensureColumn called before migration context is initialized.');
  }
  const has = await activeKnex.schema.hasColumn(tableName, columnName);
  if (!has) {
    await activeKnex.schema.alterTable(tableName, (table) => add(table));
  }
}

export async function up(knex: Knex): Promise<void> {
    activeKnex = knex;
    if (!(await knex.schema.hasTable('users'))) {
      await knex.schema.createTable('users', (table) => {
        table.increments('id').primary();
        table.string('sasi_id').unique();
        table.string('first_name').notNullable();
        table.string('last_name').notNullable();
        table.string('email').notNullable().unique();
        table.enum('role', ['student', 'supervisor', 'admin']).notNullable();
        table.timestamps(true, true);
      });
    }
  
    if (!(await knex.schema.hasTable('title_registrations'))) {
      await knex.schema.createTable('title_registrations', (table) => {
        table.increments('id').primary();
        table.integer('student_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
        table.integer('supervisor_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
        table.string('proposed_title').notNullable();
        table.text('abstract');
        table.enum('status', ['pending_approval', 'approved', 'rejected']).notNullable().defaultTo('pending_approval');
        table.timestamp('submission_date').defaultTo(knex.fn.now());
        table.timestamp('approval_date');
        table.timestamps(true, true);
      });
    }
  
    if (!(await knex.schema.hasTable('sasi_students'))) {
      await knex.schema.createTable('sasi_students', (table) => {
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
  
    if (!(await knex.schema.hasTable('sasi_staff'))) {
      await knex.schema.createTable('sasi_staff', (table) => {
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
  
    if (!(await knex.schema.hasTable('phase1_workflows'))) {
      await knex.schema.createTable('phase1_workflows', (table) => {
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
    if (await knex.schema.hasColumn('phase1_workflows', 'intention_to_submit_status')) {
      await knex.schema.alterTable('phase1_workflows', (table) => {
        table.dropColumn('intention_to_submit_status');
      });
    }
  
    if (!(await knex.schema.hasTable('generated_documents'))) {
      await knex.schema.createTable('generated_documents', (table) => {
        table.increments('id').primary();
        table.integer('workflow_id').unsigned().notNullable().references('id').inTable('phase1_workflows').onDelete('CASCADE');
        table.string('step_key').notNullable();
        table.string('source_docx').notNullable();
        table.string('output_pdf').notNullable();
        table.timestamp('generated_at').notNullable().defaultTo(knex.fn.now());
      });
    }
  
    if (!(await knex.schema.hasTable('title_registration_cases'))) {
      await knex.schema.createTable('title_registration_cases', (table) => {
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
  
    if (!(await knex.schema.hasTable('notification_queue'))) {
      await knex.schema.createTable('notification_queue', (table) => {
        table.increments('id').primary();
        table.integer('case_id').unsigned().references('id').inTable('title_registration_cases').onDelete('CASCADE');
        table.string('email_to').notNullable();
        table.string('subject').notNullable();
        table.text('body').notNullable();
        table.string('status').notNullable().defaultTo('queued');
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
      });
    }
  
    if (!(await knex.schema.hasTable('module_entries'))) {
      await knex.schema.createTable('module_entries', (table) => {
        table.increments('id').primary();
        table.integer('case_id').unsigned().notNullable().references('id').inTable('title_registration_cases').onDelete('CASCADE');
        table.string('module_name').notNullable();
        table.string('status').notNullable().defaultTo('pending');
        table.text('summary').notNullable().defaultTo('');
        table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
        table.unique(['case_id', 'module_name']);
      });
    }
  
    if (!(await knex.schema.hasTable('mou_forms'))) {
      await knex.schema.createTable('mou_forms', (table) => {
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
  
    if (!(await knex.schema.hasTable('intention_to_submit_forms'))) {
      await knex.schema.createTable('intention_to_submit_forms', (table) => {
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
  
    if (!(await knex.schema.hasTable('appoint_examiners_forms'))) {
      await knex.schema.createTable('appoint_examiners_forms', (table) => {
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
  
    if (!(await knex.schema.hasTable('change_examiners_forms'))) {
      await knex.schema.createTable('change_examiners_forms', (table) => {
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
  
    if (!(await knex.schema.hasTable('examiner_summary_cv_forms'))) {
      await knex.schema.createTable('examiner_summary_cv_forms', (table) => {
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
  
    if (!(await knex.schema.hasTable('appoint_arbiter_forms'))) {
      await knex.schema.createTable('appoint_arbiter_forms', (table) => {
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
    await ensureColumn('intention_to_submit_forms', 'pdf_path', (table) => table.string('pdf_path'));
    await ensureColumn('appoint_examiners_forms', 'pdf_path', (table) => table.string('pdf_path'));
    await ensureColumn('change_examiners_forms', 'pdf_path', (table) => table.string('pdf_path'));
    await ensureColumn('examiner_summary_cv_forms', 'pdf_path', (table) => table.string('pdf_path'));
    await ensureColumn('appoint_arbiter_forms', 'pdf_path', (table) => table.string('pdf_path'));
  
    if (!(await knex.schema.hasTable('change_title_forms'))) {
      await knex.schema.createTable('change_title_forms', (table) => {
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
  
    if (!(await knex.schema.hasTable('change_supervisor_forms'))) {
      await knex.schema.createTable('change_supervisor_forms', (table) => {
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
  
    if (!(await knex.schema.hasTable('add_co_supervisor_forms'))) {
      await knex.schema.createTable('add_co_supervisor_forms', (table) => {
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
    await ensureColumn('change_title_forms', 'pdf_path', (table) => table.string('pdf_path'));
    await ensureColumn('change_supervisor_forms', 'pdf_path', (table) => table.string('pdf_path'));
    await ensureColumn('add_co_supervisor_forms', 'pdf_path', (table) => table.string('pdf_path'));
  
    if (!(await knex.schema.hasTable('supervisor_profile_forms'))) {
      await knex.schema.createTable('supervisor_profile_forms', (table) => {
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
  
    if (!(await knex.schema.hasTable('uwc_departments'))) {
      await knex.schema.createTable('uwc_departments', (table) => {
        table.increments('id').primary();
        table.string('faculty_name').notNullable();
        table.string('department_name').notNullable();
        table.timestamps(true, true);
        table.unique(['faculty_name', 'department_name']);
      });
    }
  
    if (!(await knex.schema.hasTable('uwc_staff_directory'))) {
      await knex.schema.createTable('uwc_staff_directory', (table) => {
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
  
    if (!(await knex.schema.hasTable('external_academic_registry'))) {
      await knex.schema.createTable('external_academic_registry', (table) => {
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
      await knex.raw(
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
  
    if (await knex.schema.hasTable('external_supervisors')) {
      const legacyRows = await knex('external_supervisors').select('*');
      if (legacyRows.length > 0) {
        await knex('external_academic_registry')
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
          .merge({ updated_at: knex.fn.now() });
      }
    }
    if (!(await knex.schema.hasTable('external_academic_profile_invites'))) {
      await knex.schema.createTable('external_academic_profile_invites', (table) => {
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
}

export async function down(_knex: Knex): Promise<void> {
  // Intentionally no-op: this migration consolidates the canonical runtime schema.
}
