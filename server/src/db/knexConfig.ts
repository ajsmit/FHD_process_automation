import path from 'path';
import type { Knex } from 'knex';

function toNumber(value: string | undefined, fallback: number): number {
  const parsed = Number.parseInt(String(value ?? ''), 10);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function buildConfig(): Knex.Config {
  const dbClient = (process.env.DB_CLIENT ?? 'sqlite3').trim();

  if (dbClient === 'mysql2') {
    const connectionString = process.env.DATABASE_URL?.trim();
    if (connectionString) {
      return {
        client: 'mysql2',
        connection: connectionString,
        pool: {
          min: toNumber(process.env.DB_POOL_MIN, 2),
          max: toNumber(process.env.DB_POOL_MAX, 10),
        },
      };
    }

    return {
      client: 'mysql2',
      connection: {
        host: process.env.DB_HOST ?? '127.0.0.1',
        port: toNumber(process.env.DB_PORT, 3306),
        user: process.env.DB_USER ?? 'root',
        password: process.env.DB_PASSWORD ?? '',
        database: process.env.DB_NAME ?? 'fhd_process_automation',
      },
      pool: {
        min: toNumber(process.env.DB_POOL_MIN, 2),
        max: toNumber(process.env.DB_POOL_MAX, 10),
      },
    };
  }

  return {
    client: 'sqlite3',
    connection: {
      filename: process.env.SQLITE_FILE?.trim() || path.join(__dirname, '../../dev.sqlite3'),
    },
    useNullAsDefault: true,
  };
}

const resolved = buildConfig();
const knexConfig: Record<string, Knex.Config> = {
  development: resolved,
  test: resolved,
  production: resolved,
};

export default knexConfig;
