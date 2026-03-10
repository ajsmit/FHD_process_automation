import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('title_registrations', (table) => {
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


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('title_registrations');
}
