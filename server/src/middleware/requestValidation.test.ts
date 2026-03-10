import test from 'node:test';
import assert from 'node:assert/strict';
import type { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { validateBody, validateParams, validateQuery } from './requestValidation';

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

test('validateBody passes and normalizes valid body payload', () => {
  const middleware = validateBody(z.object({ identifier: z.string().trim().min(1) }));
  const req = { body: { identifier: '  abc  ' } } as Request;
  const res = makeResCapture();
  let nextCalled = false;
  const next: NextFunction = () => { nextCalled = true; };

  middleware(req, res, next);

  assert.equal(nextCalled, true);
  assert.equal(req.body.identifier, 'abc');
  assert.equal(res.statusCodeCaptured, 200);
});

test('validateBody returns 400 on invalid payload', () => {
  const middleware = validateBody(z.object({ identifier: z.string().min(1) }));
  const req = { body: {} } as Request;
  const res = makeResCapture();
  let nextCalled = false;
  const next: NextFunction = () => { nextCalled = true; };

  middleware(req, res, next);

  assert.equal(nextCalled, false);
  assert.equal(res.statusCodeCaptured, 400);
  assert.equal((res.bodyCaptured as { message: string }).message, 'Invalid request body.');
});

test('validateParams returns 400 on invalid route params', () => {
  const middleware = validateParams(z.object({ caseId: z.string().regex(/^\d+$/) }));
  const req = { params: { caseId: 'abc' } } as unknown as Request;
  const res = makeResCapture();
  let nextCalled = false;
  const next: NextFunction = () => { nextCalled = true; };

  middleware(req, res, next);

  assert.equal(nextCalled, false);
  assert.equal(res.statusCodeCaptured, 400);
  assert.equal((res.bodyCaptured as { message: string }).message, 'Invalid route parameters.');
});

test('validateQuery returns 400 on invalid query parameters', () => {
  const middleware = validateQuery(z.object({ internalOnly: z.enum(['true', 'false']).optional() }));
  const req = { query: { internalOnly: 'yes' } } as unknown as Request;
  const res = makeResCapture();
  let nextCalled = false;
  const next: NextFunction = () => { nextCalled = true; };

  middleware(req, res, next);

  assert.equal(nextCalled, false);
  assert.equal(res.statusCodeCaptured, 400);
  assert.equal((res.bodyCaptured as { message: string }).message, 'Invalid query parameters.');
});
