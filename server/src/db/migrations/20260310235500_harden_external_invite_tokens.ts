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
  await ensureColumn(knex, 'external_academic_profile_invites', 'token_hash', (table) => table.string('token_hash'));
  await ensureColumn(knex, 'external_academic_profile_invites', 'token_ciphertext', (table) => table.text('token_ciphertext'));

  const client = String(knex.client.config.client ?? '').toLowerCase();
  if (client.includes('sqlite')) {
    await knex.raw(
      'CREATE UNIQUE INDEX IF NOT EXISTS idx_external_invites_token_hash ON external_academic_profile_invites(token_hash)',
    );
  } else {
    await knex.schema.alterTable('external_academic_profile_invites', (table) => {
      table.unique(['token_hash'], { indexName: 'idx_external_invites_token_hash' });
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  const client = String(knex.client.config.client ?? '').toLowerCase();
  if (client.includes('sqlite')) {
    await knex.raw('DROP INDEX IF EXISTS idx_external_invites_token_hash');
  } else {
    await knex.schema.alterTable('external_academic_profile_invites', (table) => {
      table.dropUnique(['token_hash'], 'idx_external_invites_token_hash');
    });
  }

  if (await knex.schema.hasColumn('external_academic_profile_invites', 'token_ciphertext')) {
    await knex.schema.alterTable('external_academic_profile_invites', (table) => {
      table.dropColumn('token_ciphertext');
    });
  }
  if (await knex.schema.hasColumn('external_academic_profile_invites', 'token_hash')) {
    await knex.schema.alterTable('external_academic_profile_invites', (table) => {
      table.dropColumn('token_hash');
    });
  }
}
