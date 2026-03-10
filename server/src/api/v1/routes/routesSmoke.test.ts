import test from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import request from 'supertest';
import apiV1Router from '../index';
import { signAuthToken } from '../../../auth/tokenService';

function makeBearer(): string {
  const token = signAuthToken({
    id: 987,
    sasiId: 'STAFF-987',
    role: 'system_admin',
    firstName: 'Route',
    lastName: 'Tester',
  });
  return `Bearer ${token}`;
}

function makeApp() {
  const app = express();
  app.use(express.json());
  app.use('/api/v1', apiV1Router);
  return app;
}

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

test('GET /api/v1/title-registration/pipeline returns 400 for invalid caseId query', async () => {
  const app = makeApp();
  const res = await request(app)
    .get('/api/v1/title-registration/pipeline?caseId=not-a-number')
    .set('authorization', makeBearer());
  assert.equal(res.status, 400);
  assert.equal(res.body.message, 'Invalid query parameters.');
});

