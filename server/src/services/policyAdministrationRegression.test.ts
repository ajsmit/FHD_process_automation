import test, { after, before } from 'node:test';
import assert from 'node:assert/strict';
import db from '../db/knex';
import { initDb } from '../db/initDb';
import {
  createLandingMessage,
  listLandingMessages,
  listManagedLandingMessages,
  updateLandingMessage,
  type LandingMessageInput,
} from './landingMessagesService';
import {
  getFacultyProcessCalendar,
  updateFacultyProcessCalendar,
} from './facultyProcessCalendarService';
import type { Role } from '../auth/tokenService';

interface Actor {
  id: number;
  role: Role;
}

const TEST_PREFIX = '[policy-regression]';

async function resolveActor(sasiId: string): Promise<Actor> {
  const row = await db('users')
    .where({ sasi_id: sasiId })
    .first('id', 'role');
  assert.ok(row, `expected seeded user for ${sasiId}`);
  return { id: Number(row.id), role: row.role as Role };
}

async function createMessage(actor: Actor, input: LandingMessageInput): Promise<number> {
  const created = await createLandingMessage(actor, input);
  return created.id;
}

before(async () => {
  await initDb();
});

after(async () => {
  await db('landing_messages')
    .where('message', 'like', `${TEST_PREFIX}%`)
    .delete();
  await db.destroy();
});

test('faculty calendar can be updated and read back for an explicit academic year', async () => {
  const facultyActor = await resolveActor('STAFF-004');
  const year = 2098;
  const updated = await updateFacultyProcessCalendar(
    year,
    {
      rottSubmissionDeadline: '2098-03-31',
      progressReportDeadline: '2098-11-30',
      intentionToSubmitDeadline: '2098-08-31',
      appointExaminersDeadline: '2098-09-30',
      publishedNotice: `${TEST_PREFIX} Faculty calendar for deterministic regression checks.`,
    },
    facultyActor.id,
  );

  assert.equal(updated.academicYear, year);
  assert.equal(updated.rottSubmissionDeadline, '2098-03-31');
  assert.equal(updated.progressReportDeadline, '2098-11-30');
  assert.equal(updated.intentionToSubmitDeadline, '2098-08-31');
  assert.equal(updated.appointExaminersDeadline, '2098-09-30');
  assert.match(String(updated.publishedNotice ?? ''), /^\[policy-regression]/);

  const roundTrip = await getFacultyProcessCalendar(year);
  assert.equal(roundTrip.academicYear, year);
  assert.equal(roundTrip.rottSubmissionDeadline, '2098-03-31');
  assert.equal(roundTrip.progressReportDeadline, '2098-11-30');
});

test('landing message permissions and department scoping are enforced', async () => {
  const facultyActor = await resolveActor('STAFF-004');
  const deptActor = await resolveActor('STAFF-003');

  const facultyMessageId = await createMessage(facultyActor, {
    scope: 'faculty',
    message: `${TEST_PREFIX} Faculty bulletin`,
  });

  await assert.rejects(
    () => createLandingMessage(deptActor, {
      scope: 'faculty',
      message: `${TEST_PREFIX} Dept actor should not publish faculty bulletin`,
    }),
    /not authorized to publish Faculty landing messages/i,
  );

  const deptMessageId = await createMessage(deptActor, {
    scope: 'department',
    departmentName: 'Biodiversity & Conservation Biology',
    message: `${TEST_PREFIX} Department bulletin`,
  });

  await assert.rejects(
    () => createLandingMessage(deptActor, {
      scope: 'department',
      departmentName: 'Physics',
      message: `${TEST_PREFIX} Unauthorized department bulletin`,
    }),
    /assigned departments/i,
  );

  const bcbLanding = await listLandingMessages('Biodiversity & Conservation Biology');
  assert.ok(bcbLanding.some((entry) => entry.id === facultyMessageId));
  assert.ok(bcbLanding.some((entry) => entry.id === deptMessageId));

  const physicsLanding = await listLandingMessages('Physics');
  assert.ok(physicsLanding.some((entry) => entry.id === facultyMessageId));
  assert.ok(!physicsLanding.some((entry) => entry.id === deptMessageId));

  const deptManaged = await listManagedLandingMessages(deptActor);
  assert.ok(deptManaged.some((entry) => entry.id === deptMessageId));
  assert.ok(!deptManaged.some((entry) => entry.id === facultyMessageId));

  const chemistryMessageId = await createMessage(facultyActor, {
    scope: 'department',
    departmentName: 'Chemistry',
    message: `${TEST_PREFIX} Chemistry bulletin`,
  });

  await assert.rejects(
    () => updateLandingMessage(deptActor, chemistryMessageId, {
      message: `${TEST_PREFIX} Unauthorized edit attempt`,
    }),
    /assigned departments/i,
  );

  const updatedFacultyMessage = await updateLandingMessage(facultyActor, facultyMessageId, {
    message: `${TEST_PREFIX} Faculty bulletin (updated)`,
  });
  assert.match(updatedFacultyMessage.message, /\(updated\)$/);
});
