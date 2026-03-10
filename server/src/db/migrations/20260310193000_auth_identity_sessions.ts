import type { Knex } from 'knex';

async function ensureColumn(
  knex: Knex,
  tableName: string,
  columnName: string,
  add: (table: Knex.CreateTableBuilder) => void,
): Promise<void> {
  const has = await knex.schema.hasColumn(tableName, columnName);
  if (!has) {
    await knex.schema.alterTable(tableName, (table) => add(table));
  }
}

export async function up(knex: Knex): Promise<void> {
  await ensureColumn(knex, 'users', 'password_hash', (table) => table.string('password_hash'));
  await ensureColumn(knex, 'users', 'active', (table) => table.boolean('active').notNullable().defaultTo(true));
  await ensureColumn(knex, 'users', 'staff_number', (table) => table.string('staff_number'));
  await ensureColumn(knex, 'users', 'departments', (table) => table.text('departments'));

  if (!(await knex.schema.hasTable('auth_refresh_tokens'))) {
    await knex.schema.createTable('auth_refresh_tokens', (table) => {
      table.increments('id').primary();
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
      table.string('token_hash').notNullable().unique();
      table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
      table.timestamp('expires_at').notNullable();
      table.timestamp('revoked_at');
      table.integer('replaced_by_token_id').unsigned().references('id').inTable('auth_refresh_tokens').onDelete('SET NULL');
      table.timestamp('last_used_at');
      table.string('created_by_ip').notNullable().defaultTo('');
      table.string('created_by_user_agent').notNullable().defaultTo('');
      table.string('revoked_reason').notNullable().defaultTo('');
    });
    await knex.schema.alterTable('auth_refresh_tokens', (table) => {
      table.index(['user_id'], 'idx_auth_refresh_tokens_user');
      table.index(['expires_at'], 'idx_auth_refresh_tokens_expires_at');
      table.index(['revoked_at'], 'idx_auth_refresh_tokens_revoked_at');
    });
  }

  if (!(await knex.schema.hasTable('auth_audit_events'))) {
    await knex.schema.createTable('auth_audit_events', (table) => {
      table.increments('id').primary();
      table.string('event_type').notNullable();
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('SET NULL');
      table.string('actor_sasi_id').notNullable().defaultTo('');
      table.string('route').notNullable().defaultTo('');
      table.string('method').notNullable().defaultTo('');
      table.string('ip_address').notNullable().defaultTo('');
      table.string('user_agent').notNullable().defaultTo('');
      table.text('details_json').notNullable().defaultTo('{}');
      table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    });
    await knex.schema.alterTable('auth_audit_events', (table) => {
      table.index(['created_at'], 'idx_auth_audit_events_created_at');
      table.index(['event_type'], 'idx_auth_audit_events_event_type');
      table.index(['user_id'], 'idx_auth_audit_events_user_id');
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  if (await knex.schema.hasTable('auth_audit_events')) {
    await knex.schema.dropTable('auth_audit_events');
  }
  if (await knex.schema.hasTable('auth_refresh_tokens')) {
    await knex.schema.dropTable('auth_refresh_tokens');
  }
}
