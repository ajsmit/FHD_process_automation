import path from 'path';
import db from './knex';

async function main() {
  const result = await db.migrate.latest({
    directory: path.join(__dirname, 'migrations'),
  });
  const [batchNo, log] = result;
  console.log(`Applied migration batch ${batchNo}.`);
  if (log.length === 0) {
    console.log('No new migrations were applied.');
  } else {
    console.log('Migrations applied:');
    for (const name of log) {
      console.log(`- ${name}`);
    }
  }
  await db.destroy();
}

main().catch(async (error) => {
  console.error('Migration run failed:', error);
  await db.destroy();
  process.exit(1);
});
