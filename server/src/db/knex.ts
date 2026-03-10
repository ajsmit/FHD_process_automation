import knex from 'knex';
import knexConfig from './knexConfig';

const env = (process.env.NODE_ENV ?? 'development').trim();
const selected = knexConfig[env] ?? knexConfig.development;
const db = knex(selected);

export default db;
