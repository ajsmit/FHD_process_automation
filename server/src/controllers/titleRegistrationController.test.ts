import test, { after, afterEach, before } from 'node:test';
import assert from 'node:assert/strict';
import type { Request, Response } from 'express';
import db from '../db/knex';
import { initDb } from '../db/initDb';
import {
  createTitleRegistration,
  getAllTitleRegistrations,
  getTitleRegistrationById,
} from './titleRegistrationController';

const createdRegistrationIds: number[] = [];

function makeResCapture(): Response & { statusCodeCaptured: number; bodyCaptured: unknown } {
  type CapturedResponse = Response & { statusCodeCaptured: number; bodyCaptured: unknown };
  const capture = {
    statusCodeCaptured: 200,
    bodyCaptured: undefined as unknown,
    status(this: CapturedResponse, code: number): CapturedResponse {
      this.statusCodeCaptured = code;
      return this;
    },
    json(this: CapturedResponse, body: unknown): CapturedResponse {
      this.bodyCaptured = body;
      return this;
    },
  } as unknown as CapturedResponse;
  return capture;
}

before(async () => {
  await initDb();
});

afterEach(async () => {
  while (createdRegistrationIds.length > 0) {
    const id = createdRegistrationIds.pop()!;
    await db('title_registrations').where({ id }).delete();
  }
});

after(async () => {
  await db.destroy();
});

test('createTitleRegistration returns 201 with created registration', async () => {
  const student = await db('users')
    .where({ role: 'student' })
    .first('id');
  const supervisor = await db('users')
    .where({ role: 'supervisor' })
    .first('id');
  assert.ok(student && supervisor, 'expected seeded student and supervisor users');

  const req = {
    body: {
      student_id: student.id,
      supervisor_id: supervisor.id,
      proposed_title: `Controller smoke title ${Date.now()}`,
      abstract: 'Controller smoke abstract',
    },
  } as Request;
  const res = makeResCapture();

  await createTitleRegistration(req, res);

  assert.equal(res.statusCodeCaptured, 201);
  const created = res.bodyCaptured as { id?: number };
  assert.ok(typeof created.id === 'number');
  createdRegistrationIds.push(created.id!);
});

test('createTitleRegistration returns 400 when required fields are missing', async () => {
  const req = {
    body: {
      student_id: 1,
      proposed_title: 'Missing supervisor id',
    },
  } as Request;
  const res = makeResCapture();

  await createTitleRegistration(req, res);

  assert.equal(res.statusCodeCaptured, 400);
});

test('getTitleRegistrationById returns 404 for missing record', async () => {
  const req = { params: { id: '999999999' } } as unknown as Request;
  const res = makeResCapture();

  await getTitleRegistrationById(req, res);

  assert.equal(res.statusCodeCaptured, 404);
});

test('getAllTitleRegistrations returns 200 with array payload', async () => {
  const req = {} as Request;
  const res = makeResCapture();

  await getAllTitleRegistrations(req, res);

  assert.equal(res.statusCodeCaptured, 200);
  assert.equal(Array.isArray(res.bodyCaptured), true);
});

