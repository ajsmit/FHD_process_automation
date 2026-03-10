export interface RetryOptions {
  maxAttempts?: number;
  initialDelayMs?: number;
  backoffMultiplier?: number;
  maxDelayMs?: number;
  shouldRetry?: (error: unknown) => boolean;
  onRetry?: (error: unknown, attempt: number, delayMs: number) => void;
}

export interface SettledSuccess<T> {
  ok: true;
  value: T;
}

export interface SettledFailure {
  ok: false;
  reason: unknown;
}

export type SettledResult<T> = SettledSuccess<T> | SettledFailure;

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export async function retryWithBackoff<T>(
  operation: () => Promise<T>,
  options: RetryOptions = {},
): Promise<T> {
  const maxAttempts = Math.max(1, options.maxAttempts ?? 3);
  const initialDelayMs = Math.max(0, options.initialDelayMs ?? 50);
  const backoffMultiplier = Math.max(1, options.backoffMultiplier ?? 2);
  const maxDelayMs = Math.max(initialDelayMs, options.maxDelayMs ?? 500);
  const shouldRetry = options.shouldRetry ?? (() => true);
  let delayMs = initialDelayMs;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      return await operation();
    } catch (error) {
      const hasRetriesLeft = attempt < maxAttempts;
      if (!hasRetriesLeft || !shouldRetry(error)) {
        throw error;
      }
      options.onRetry?.(error, attempt, delayMs);
      await wait(delayMs);
      delayMs = Math.min(maxDelayMs, delayMs * backoffMultiplier);
    }
  }

  throw new Error('Retry execution reached an unreachable state.');
}

export async function settleAll<T>(tasks: Array<Promise<T>>): Promise<Array<SettledResult<T>>> {
  return Promise.all(
    tasks.map(async (task) => {
      try {
        const value = await task;
        return { ok: true, value } as SettledSuccess<T>;
      } catch (reason) {
        return { ok: false, reason } as SettledFailure;
      }
    }),
  );
}

export function isTransientDatabaseError(error: unknown): boolean {
  const message = error instanceof Error ? error.message.toLowerCase() : String(error ?? '').toLowerCase();
  const transientPatterns = [
    'timeout',
    'timed out',
    'too many connections',
    'deadlock',
    'connection',
    'econnreset',
    'econnrefused',
    'database is locked',
    'sqlstate[40001]',
  ];
  return transientPatterns.some((pattern) => message.includes(pattern));
}
