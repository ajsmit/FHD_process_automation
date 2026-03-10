import crypto from 'crypto';

function resolveKey(): Buffer {
  const raw = (process.env.EXTERNAL_INVITE_TOKEN_ENCRYPTION_KEY ?? '').trim();
  if (raw) {
    if (/^[a-fA-F0-9]{64}$/.test(raw)) {
      return Buffer.from(raw, 'hex');
    }
    try {
      const decoded = Buffer.from(raw, 'base64');
      if (decoded.length === 32) {
        return decoded;
      }
    } catch {
      // fall through to error handling
    }
    throw new Error('EXTERNAL_INVITE_TOKEN_ENCRYPTION_KEY must be 32-byte base64 or 64-char hex.');
  }

  if ((process.env.NODE_ENV ?? 'development') !== 'production') {
    return crypto.createHash('sha256').update('dev-insecure-external-invite-key-change-me').digest();
  }

  throw new Error('EXTERNAL_INVITE_TOKEN_ENCRYPTION_KEY must be configured in production.');
}

export function generateInviteToken(): string {
  return crypto.randomBytes(32).toString('base64url');
}

export function hashInviteToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex');
}

export function encryptInviteToken(token: string): string {
  const key = resolveKey();
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const encrypted = Buffer.concat([cipher.update(token, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  return `${iv.toString('hex')}.${tag.toString('hex')}.${encrypted.toString('hex')}`;
}

export function decryptInviteToken(ciphertext: string): string {
  const parts = ciphertext.split('.', 3);
  if (parts.length !== 3) {
    throw new Error('Invalid invite token ciphertext format.');
  }
  const [ivHex, tagHex, encryptedHex] = parts;
  const iv = Buffer.from(ivHex, 'hex');
  const tag = Buffer.from(tagHex, 'hex');
  const encrypted = Buffer.from(encryptedHex, 'hex');
  const key = resolveKey();
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
  decipher.setAuthTag(tag);
  const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
  return decrypted.toString('utf8');
}
