import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable('supervisor_summative_report_forms'))) {
    await knex.schema.createTable('supervisor_summative_report_forms', (table) => {
      table.increments('id').primary();
      table.integer('case_id').notNullable().references('id').inTable('title_registration_cases').onDelete('CASCADE');
      table.text('form_data_json').notNullable();
      table.integer('completion_percent').notNullable().defaultTo(0);
      table.string('status').notNullable().defaultTo('draft');
      table.timestamp('submitted_at').nullable();
      table.string('pdf_path').nullable();
      table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
      table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
      table.unique(['case_id']);
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  if (await knex.schema.hasTable('supervisor_summative_report_forms')) {
    await knex.schema.dropTable('supervisor_summative_report_forms');
  }
}
