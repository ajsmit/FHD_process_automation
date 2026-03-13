import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable('landing_messages'))) {
    await knex.schema.createTable('landing_messages', (table) => {
      table.increments('id').primary();
      table.string('scope', 32).notNullable(); // faculty | department
      table.string('department_name', 255).nullable();
      table.text('message').notNullable();
      table.date('active_from').nullable();
      table.date('active_until').nullable();
      table.integer('created_by_user_id').nullable().references('id').inTable('users').onDelete('SET NULL');
      table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
      table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
    });
    await knex.schema.alterTable('landing_messages', (table) => {
      table.index(['scope'], 'idx_landing_messages_scope');
      table.index(['department_name'], 'idx_landing_messages_department');
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  if (await knex.schema.hasTable('landing_messages')) {
    await knex.schema.dropTable('landing_messages');
  }
}
