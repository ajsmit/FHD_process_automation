import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();

    // Inserts seed entries
    await knex("users").insert([
        { id: 1, sasi_id: '123456', first_name: 'Jesse', last_name: 'Smith', email: 'jesse.smith@example.com', role: 'student' },
        { id: 2, sasi_id: 'S98765', first_name: 'Andrea', last_name: 'Jones', email: 'andrea.jones@example.com', role: 'supervisor' }
    ]);
};
