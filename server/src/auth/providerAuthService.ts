import type { Request } from 'express';

export type AuthProvider = 'local_password' | 'trusted_header';

export interface ProviderIdentity {
  email: string;
  sasiId: string;
  staffNumber: string;
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
