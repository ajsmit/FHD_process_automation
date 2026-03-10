import test from 'node:test';
import assert from 'node:assert/strict';
import { retryWithBackoff, settleAll } from './resilience';

test('retryWithBackoff retries transient failures and eventually succeeds', async () => {
  let attempts = 0;
  const result = await retryWithBackoff(async () => {
    attempts += 1;
    if (attempts < 3) {
      throw new Error('temporary failure');
    }
    return 'ok';
  }, {
    maxAttempts: 3,
    initialDelayMs: 1,
    maxDelayMs: 2,
    shouldRetry: () => true,
  });

  assert.equal(result, 'ok');
  assert.equal(attempts, 3);
});

test('retryWithBackoff does not retry when shouldRetry blocks retries', async () => {
  let attempts = 0;
  await assert.rejects(
    retryWithBackoff(async () => {
      attempts += 1;
      throw new Error('fatal');
    }, {
      maxAttempts: 3,
      initialDelayMs: 1,
      shouldRetry: () => false,
    }),
    /fatal/,
  );
  assert.equal(attempts, 1);
});

test('settleAll returns fulfilled and rejected results without failing fast', async () => {
  const results = await settleAll([
    Promise.resolve('first'),
    Promise.reject(new Error('boom')),
    Promise.resolve('third'),
  ]);

  assert.equal(results.length, 3);
  assert.equal(results[0].ok, true);
  if (results[0].ok) {
    assert.equal(results[0].value, 'first');
  }
  assert.equal(results[1].ok, false);
  assert.equal(results[2].ok, true);
});
