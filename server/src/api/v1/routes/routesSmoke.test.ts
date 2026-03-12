import test, { after } from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import request from 'supertest';
import apiV1Router from '../index';
import { signAuthToken } from '../../../auth/tokenService';
import db from '../../../db/knex';

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

after(async () => {
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
