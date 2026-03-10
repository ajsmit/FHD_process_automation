import test from 'node:test';
import assert from 'node:assert/strict';
import type { NextFunction, Request, Response } from 'express';
import { requireAuth } from './auth';
import { signAuthToken } from '../auth/tokenService';

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

test('requireAuth attaches authUser and calls next for valid bearer token', () => {
  const token = signAuthToken({
    id: 123,
    sasiId: 'STAFF-123',
    role: 'system_admin',
    firstName: 'Auth',
    lastName: 'Tester',
  });
  const req = {
    ip: '127.0.0.1',
    method: 'GET',
    originalUrl: '/api/v1/protected',
    header(name: string): string | undefined {
      return name.toLowerCase() === 'authorization' ? `Bearer ${token}` : undefined;
    },
    get(): string {
      return 'node-test';
    },
  } as unknown as Request;
  const res = makeResCapture();
  let nextCalled = false;
  const next: NextFunction = () => {
    nextCalled = true;
  };

  requireAuth(req, res, next);

  assert.equal(nextCalled, true);
  assert.equal(req.authUser?.id, 123);
  assert.equal(req.authUser?.sasiId, 'STAFF-123');
  assert.equal(res.statusCodeCaptured, 200);
});

