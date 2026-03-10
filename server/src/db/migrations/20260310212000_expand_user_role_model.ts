import type { Knex } from 'knex';

const expandedRoles = [
  'student',
  'supervisor',
  'dept_hd_rep',
  'dept_chairperson',
  'faculty_hd_rep',
  'system_admin',
  'admin',
] as const;

const legacyRoles = ['student', 'supervisor', 'admin'] as const;

async function remapLegacyAdminUsers(knex: Knex): Promise<void> {
  const admins = await knex('users').where({ role: 'admin' }).select('id', 'sasi_id');
  for (const admin of admins) {
    const sasiId = String(admin.sasi_id ?? '').trim();
    let mappedRole: (typeof expandedRoles)[number] = 'system_admin';
    if (sasiId) {
      const [deptRep, chair, facultyRep] = await Promise.all([
        knex('sasi_staff').where({ staff_number: sasiId, role: 'dept_fhd_rep' }).first('id'),
        knex('sasi_staff').where({ staff_number: sasiId, role: 'hod' }).first('id'),
        knex('sasi_staff').where({ staff_number: sasiId, role: 'faculty_fhd_rep' }).first('id'),
      ]);
      if (facultyRep) {
        mappedRole = 'faculty_hd_rep';
      } else if (chair) {
        mappedRole = 'dept_chairperson';
      } else if (deptRep) {
        mappedRole = 'dept_hd_rep';
      }
    }
    await knex('users').where({ id: admin.id }).update({ role: mappedRole, updated_at: knex.fn.now() });
  }
}

async function rebuildUsersTableForSqlite(knex: Knex, roles: readonly string[]): Promise<void> {
  await knex.transaction(async (trx) => {
    await trx.raw('PRAGMA foreign_keys = OFF');
    await trx.schema.createTable('users__tmp', (table) => {
      table.increments('id').primary();
      table.string('sasi_id').unique();
      table.string('first_name').notNullable();
      table.string('last_name').notNullable();
      table.string('email').notNullable().unique();
      table.enum('role', [...roles]).notNullable();
      table.string('password_hash');
      table.boolean('active').notNullable().defaultTo(true);
      table.string('staff_number');
      table.text('departments');
      table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
      table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
    });
    await trx.raw(`
      INSERT INTO users__tmp (
        id, sasi_id, first_name, last_name, email, role, password_hash, active, staff_number, departments, created_at, updated_at
      )
      SELECT
        id, sasi_id, first_name, last_name, email, role, password_hash, COALESCE(active, 1), staff_number, departments, created_at, updated_at
      FROM users
    `);
    await trx.schema.dropTable('users');
    await trx.schema.renameTable('users__tmp', 'users');
    await trx.raw('PRAGMA foreign_keys = ON');
  });
}

export async function up(knex: Knex): Promise<void> {
  const client = (knex.client.config.client ?? '').toLowerCase();

  if (client.includes('sqlite')) {
    await rebuildUsersTableForSqlite(knex, expandedRoles);
  } else if (client.includes('mysql')) {
    await knex.schema.alterTable('users', (table) => {
      table.enum('role', [...expandedRoles]).notNullable().alter();
    });
  }

  await remapLegacyAdminUsers(knex);
}

export async function down(knex: Knex): Promise<void> {
  await knex('users')
    .whereIn('role', ['dept_hd_rep', 'dept_chairperson', 'faculty_hd_rep', 'system_admin'])
    .update({ role: 'admin', updated_at: knex.fn.now() });

  const client = (knex.client.config.client ?? '').toLowerCase();
  if (client.includes('sqlite')) {
    await rebuildUsersTableForSqlite(knex, legacyRoles);
  } else if (client.includes('mysql')) {
    await knex.schema.alterTable('users', (table) => {
      table.enum('role', [...legacyRoles]).notNullable().alter();
    });
  }
}
