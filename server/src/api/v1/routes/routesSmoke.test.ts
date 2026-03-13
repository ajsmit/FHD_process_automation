import test, { after, before } from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import request from 'supertest';
import apiV1Router from '../index';
import { signAuthToken } from '../../../auth/tokenService';
import db from '../../../db/knex';
import { initDb } from '../../../db/initDb';

function makeBearer(role: 'system_admin' | 'student' | 'supervisor' = 'system_admin'): string {
  const identity = role === 'student'
    ? {
      id: 123,
      sasiId: '1234567',
      role: 'student' as const,
      firstName: 'Student',
      lastName: 'Actor',
    }
    : role === 'supervisor'
      ? {
        id: 456,
        sasiId: 'STAFF-001',
        role: 'supervisor' as const,
        firstName: 'Supervisor',
        lastName: 'Actor',
      }
      : {
        id: 987,
        sasiId: 'STAFF-987',
        role: 'system_admin' as const,
        firstName: 'Route',
        lastName: 'Tester',
      };
  const token = signAuthToken({
    ...identity,
  });
  return `Bearer ${token}`;
}

function makeApp() {
  const app = express();
  app.use(express.json());
  app.use('/api/v1', apiV1Router);
  return app;
}

async function makeSeededBearer(sasiId: string): Promise<string> {
  const user = await db('users')
    .where({ sasi_id: sasiId })
    .first('id', 'sasi_id', 'role', 'first_name', 'last_name');
  assert.ok(user, `expected seeded user for ${sasiId}`);
  const token = signAuthToken({
    id: Number(user.id),
    sasiId: String(user.sasi_id),
    role: user.role,
    firstName: String(user.first_name),
    lastName: String(user.last_name),
  });
  return `Bearer ${token}`;
}

before(async () => {
  await initDb();
});

after(async () => {
  await db('landing_messages').where('message', 'like', '[route-smoke]%').delete();
  await db.destroy();
});

test('GET /api/v1/health returns 200', async () => {
  const app = makeApp();
  const res = await request(app).get('/api/v1/health');
  assert.equal(res.status, 200);
  assert.equal(res.body.status, 'UP');
});

test('POST /api/v1/auth/login returns 400 for invalid body shape', async () => {
  const app = makeApp();
  const res = await request(app)
    .post('/api/v1/auth/login')
    .send({ identifier: 'abc' });
  assert.equal(res.status, 400);
  assert.equal(res.body.message, 'Invalid request body.');
});

test('GET /api/v1/directory/staff returns 400 for invalid query with valid auth', async () => {
  const app = makeApp();
  const res = await request(app)
    .get('/api/v1/directory/staff?internalOnly=invalid')
    .set('authorization', makeBearer());
  assert.equal(res.status, 400);
  assert.equal(res.body.message, 'Invalid query parameters.');
});

test('GET /api/v1/directory/staff returns 403 for student role', async () => {
  const app = makeApp();
  const res = await request(app)
    .get('/api/v1/directory/staff')
    .set('authorization', makeBearer('student'));
  assert.equal(res.status, 403);
  assert.equal(res.body.message, 'Authenticated actor is not authorized for this route.');
});

test('GET /api/v1/sasi/students/search returns 403 for student role', async () => {
  const app = makeApp();
  const res = await request(app)
    .get('/api/v1/sasi/students/search?studentNumber=1234567')
    .set('authorization', makeBearer('student'));
  assert.equal(res.status, 403);
  assert.equal(res.body.message, 'Authenticated actor is not authorized for this route.');
});

test('GET /api/v1/title-registration/pipeline returns 400 for invalid caseId query', async () => {
  const app = makeApp();
  const res = await request(app)
    .get('/api/v1/title-registration/pipeline?caseId=not-a-number')
    .set('authorization', makeBearer());
  assert.equal(res.status, 400);
  assert.equal(res.body.message, 'Invalid query parameters.');
});

test('GET /api/v1/title-registration/sasi/:studentNumber/check returns 400 for non-7-digit student number', async () => {
  const app = makeApp();
  const res = await request(app)
    .get('/api/v1/title-registration/sasi/12345678/check')
    .set('authorization', makeBearer('student'));
  assert.equal(res.status, 400);
  assert.equal(res.body.message, 'Invalid route parameters.');
});

test('GET /api/v1/title-registration/faculty-calendar returns 200 for authenticated actor', async () => {
  const app = makeApp();
  const res = await request(app)
    .get('/api/v1/title-registration/faculty-calendar?year=2026')
    .set('authorization', makeBearer('student'));
  assert.equal(res.status, 200);
  assert.ok(res.body.calendar);
  assert.equal(typeof res.body.calendar.academicYear, 'number');
});

test('PATCH /api/v1/title-registration/faculty-calendar/:year rejects unauthorized student actor', async () => {
  const app = makeApp();
  const res = await request(app)
    .patch('/api/v1/title-registration/faculty-calendar/2026')
    .set('authorization', makeBearer('student'))
    .send({ publishedNotice: '[route-smoke] unauthorized update attempt' });
  assert.equal(res.status, 403);
  assert.match(String(res.body.message ?? ''), /only faculty\/system administrators/i);
});

test('PATCH /api/v1/title-registration/faculty-calendar/:year returns 400 for invalid date payload', async () => {
  const app = makeApp();
  const facultyBearer = await makeSeededBearer('STAFF-004');
  const res = await request(app)
    .patch('/api/v1/title-registration/faculty-calendar/2026')
    .set('authorization', facultyBearer)
    .send({ progressReportDeadline: '2026/11/30' });
  assert.equal(res.status, 400);
  assert.equal(res.body.message, 'Invalid request body.');
});

test('GET /api/v1/title-registration/landing-messages returns 400 for invalid caseId query', async () => {
  const app = makeApp();
  const res = await request(app)
    .get('/api/v1/title-registration/landing-messages?caseId=bad')
    .set('authorization', makeBearer('student'));
  assert.equal(res.status, 400);
  assert.equal(res.body.message, 'Invalid query parameters.');
});

test('GET /api/v1/title-registration/landing-messages/manage returns 200 for faculty actor', async () => {
  const app = makeApp();
  const facultyBearer = await makeSeededBearer('STAFF-004');
  const res = await request(app)
    .get('/api/v1/title-registration/landing-messages/manage')
    .set('authorization', facultyBearer);
  assert.equal(res.status, 200);
  assert.ok(Array.isArray(res.body.data));
});

test('POST + PATCH /api/v1/title-registration/landing-messages works for faculty actor', async () => {
  const app = makeApp();
  const facultyBearer = await makeSeededBearer('STAFF-004');
  const createRes = await request(app)
    .post('/api/v1/title-registration/landing-messages')
    .set('authorization', facultyBearer)
    .send({
      scope: 'faculty',
      message: '[route-smoke] policy bulletin create',
    });
  assert.equal(createRes.status, 201);
  assert.ok(createRes.body.message?.id);

  const messageId = Number(createRes.body.message.id);
  const patchRes = await request(app)
    .patch(`/api/v1/title-registration/landing-messages/${messageId}`)
    .set('authorization', facultyBearer)
    .send({
      message: '[route-smoke] policy bulletin updated',
    });
  assert.equal(patchRes.status, 200);
  assert.equal(patchRes.body.message.message, '[route-smoke] policy bulletin updated');
});

test('POST /api/v1/title-registration/landing-messages rejects student actor', async () => {
  const app = makeApp();
  const res = await request(app)
    .post('/api/v1/title-registration/landing-messages')
    .set('authorization', makeBearer('student'))
    .send({
      scope: 'faculty',
      message: '[route-smoke] unauthorized publish attempt',
    });
  assert.equal(res.status, 403);
  assert.match(String(res.body.message ?? ''), /not authorized|only faculty\/system administrators/i);
});
