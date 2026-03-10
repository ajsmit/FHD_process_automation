import path from 'path';
import db from './knex';
import { seedDemoData } from './seedDemoData';

export async function initDb(): Promise<void> {
  await db.migrate.latest({
    directory: path.join(__dirname, 'migrations'),
  });

  await seedDemoData(db);
}
