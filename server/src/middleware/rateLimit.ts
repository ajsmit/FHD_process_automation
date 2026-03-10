import type { RequestHandler } from 'express';

interface RateLimitOptions {
  windowMs: number;
  maxRequests: number;
  message: string;
  keyPrefix: string;
}

interface Bucket {
  count: number;
  windowStart: number;
}

const buckets = new Map<string, Bucket>();

function resolveClientKey(reqIp: string | undefined): string {
  return (reqIp ?? 'unknown').trim() || 'unknown';
}

export function createRateLimit(options: RateLimitOptions): RequestHandler {
  const { windowMs, maxRequests, message, keyPrefix } = options;

  return (req, res, next): void => {
    const now = Date.now();
    const clientKey = resolveClientKey(req.ip);
    const key = `${keyPrefix}:${clientKey}`;
    const current = buckets.get(key);

    if (!current || now - current.windowStart >= windowMs) {
      buckets.set(key, { count: 1, windowStart: now });
      next();
      return;
    }

    current.count += 1;
    if (current.count > maxRequests) {
      const retryAfterSeconds = Math.max(1, Math.ceil((current.windowStart + windowMs - now) / 1000));
      res.setHeader('Retry-After', String(retryAfterSeconds));
      res.status(429).json({ message });
      return;
    }

    next();
  };
}
