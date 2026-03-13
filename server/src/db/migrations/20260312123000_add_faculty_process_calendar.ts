import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable('faculty_process_calendar'))) {
    await knex.schema.createTable('faculty_process_calendar', (table) => {
      table.increments('id').primary();
      table.integer('academic_year').notNullable().unique();
      table.date('rott_submission_deadline').nullable();
      table.date('progress_report_deadline').nullable();
      table.date('intention_to_submit_deadline').nullable();
      table.date('appoint_examiners_deadline').nullable();
      table.text('published_notice').nullable();
      table.integer('updated_by_user_id').nullable().references('id').inTable('users').onDelete('SET NULL');
      table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
      table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  if (await knex.schema.hasTable('faculty_process_calendar')) {
    await knex.schema.dropTable('faculty_process_calendar');
  }
}
