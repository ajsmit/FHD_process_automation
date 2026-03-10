import { resolveAuthProvider } from './providerAuthService';

function clean(value: string | undefined | null): string {
  return String(value ?? '').trim();
}

function isTruthy(value: string | undefined | null): boolean {
  const normalized = clean(value).toLowerCase();
  return normalized === 'true' || normalized === '1' || normalized === 'yes';
}

export function validateAuthStartupGuardrails(): void {
  const nodeEnv = clean(process.env.NODE_ENV).toLowerCase() || 'development';
  const isProduction = nodeEnv === 'production';
  if (!isProduction) {
    return;
  }

  const provider = resolveAuthProvider();
  if (isTruthy(process.env.ENABLE_DEV_AUTH)) {
    throw new Error('ENABLE_DEV_AUTH=true is not permitted in production.');
  }

  if (provider === 'trusted_header') {
    if (!clean(process.env.AUTH_PROVIDER_SHARED_SECRET)) {
      throw new Error('AUTH_PROVIDER_SHARED_SECRET must be configured in production when AUTH_PROVIDER=trusted_header.');
    }
    if (!clean(process.env.AUTH_PROVIDER_TRUSTED_PROXY_IPS)) {
      throw new Error('AUTH_PROVIDER_TRUSTED_PROXY_IPS must be configured in production when AUTH_PROVIDER=trusted_header.');
    }
  }
}
