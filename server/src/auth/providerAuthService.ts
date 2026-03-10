import type { Request } from 'express';

export type AuthProvider = 'local_password' | 'trusted_header';

export interface ProviderIdentity {
  email: string;
  sasiId: string;
  staffNumber: string;
}

export interface ProviderSourceCheck {
  allowed: boolean;
  reason: string;
}

function clean(value: string | undefined | null): string {
  return String(value ?? '').trim();
}

export function resolveAuthProvider(): AuthProvider {
  const value = clean(process.env.AUTH_PROVIDER).toLowerCase();
  if (value === 'trusted_header') {
    return 'trusted_header';
  }
  return 'local_password';
}

function headerName(envName: string, fallback: string): string {
  return clean(process.env[envName]).toLowerCase() || fallback;
}

export function parseTrustedHeaderIdentity(req: Request): ProviderIdentity {
  const emailHeader = headerName('AUTH_PROVIDER_EMAIL_HEADER', 'x-auth-user-email');
  const sasiHeader = headerName('AUTH_PROVIDER_SASI_ID_HEADER', 'x-auth-user-sasi-id');
  const staffHeader = headerName('AUTH_PROVIDER_STAFF_NUMBER_HEADER', 'x-auth-user-staff-number');

  const email = clean(req.header(emailHeader)).toLowerCase();
  const sasiId = clean(req.header(sasiHeader));
  const staffNumber = clean(req.header(staffHeader));

  return { email, sasiId, staffNumber };
}

export function verifyProviderSharedSecret(req: Request): boolean {
  const configured = clean(process.env.AUTH_PROVIDER_SHARED_SECRET);
  if (!configured) {
    return false;
  }
  const secretHeader = headerName('AUTH_PROVIDER_SECRET_HEADER', 'x-auth-provider-secret');
  const presented = clean(req.header(secretHeader));
  return presented.length > 0 && presented === configured;
}

function normalizeIp(value: string | undefined | null): string {
  const ip = clean(value).toLowerCase();
  if (ip.startsWith('::ffff:')) {
    return ip.slice('::ffff:'.length);
  }
  return ip;
}

function trustedProxyIps(): Set<string> {
  const configured = clean(process.env.AUTH_PROVIDER_TRUSTED_PROXY_IPS)
    .split(',')
    .map((value) => normalizeIp(value))
    .filter(Boolean);

  if (configured.length > 0) {
    return new Set(configured);
  }

  if ((process.env.NODE_ENV ?? 'development').trim().toLowerCase() !== 'production') {
    return new Set(['127.0.0.1', '::1']);
  }

  return new Set();
}

export function verifyProviderSourceIp(req: Request): ProviderSourceCheck {
  const trustedIps = trustedProxyIps();
  if (trustedIps.size === 0) {
    return {
      allowed: false,
      reason: 'No trusted provider source IPs configured.',
    };
  }

  const requestIp = normalizeIp(req.ip);
  if (!requestIp) {
    return { allowed: false, reason: 'Request IP was empty.' };
  }

  if (!trustedIps.has(requestIp)) {
    return { allowed: false, reason: `Request IP ${requestIp} is not trusted.` };
  }

  return { allowed: true, reason: 'ok' };
}
