import db from '../db/knex';

export interface TitleRegistrationPayload {
    student_id: number;
    supervisor_id: number;
    proposed_title: string;
    abstract?: string;
}

export const create = async (payload: TitleRegistrationPayload) => {
    const [id] = await db('title_registrations').insert(payload);
    return getById(id);
};

export const getById = async (id: number) => {
    return db('title_registrations').where({ id }).first();
};

export const getAll = async () => {
    return db('title_registrations').select('*');
};
