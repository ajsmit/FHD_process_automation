import crypto from 'crypto';

const SCRYPT_KEYLEN = 64;
const SCRYPT_N = 16384;
const SCRYPT_R = 8;
const SCRYPT_P = 1;

function toBase64(value: Buffer): string {
  return value.toString('base64');
}

function fromBase64(value: string): Buffer {
  return Buffer.from(value, 'base64');
}

export async function hashPassword(password: string): Promise<string> {
  const normalized = password.trim();
  if (!normalized) {
    throw new Error('Password is required.');
  }

  const salt = crypto.randomBytes(16);
  const derived = await new Promise<Buffer>((resolve, reject) => {
    crypto.scrypt(
      normalized,
      salt,
      SCRYPT_KEYLEN,
      { N: SCRYPT_N, r: SCRYPT_R, p: SCRYPT_P },
      (error, key) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(key as Buffer);
      },
    );
  });

  return `scrypt$${SCRYPT_N}$${SCRYPT_R}$${SCRYPT_P}$${toBase64(salt)}$${toBase64(derived)}`;
}

export async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
  const parts = storedHash.split('$');
  if (parts.length !== 6 || parts[0] !== 'scrypt') {
    return false;
  }

  const n = Number.parseInt(parts[1], 10);
  const r = Number.parseInt(parts[2], 10);
  const p = Number.parseInt(parts[3], 10);
  const salt = fromBase64(parts[4]);
  const expected = fromBase64(parts[5]);
  if (!Number.isFinite(n) || !Number.isFinite(r) || !Number.isFinite(p)) {
    return false;
  }

  const normalized = password.trim();
  if (!normalized) {
    return false;
  }

  const derived = await new Promise<Buffer>((resolve, reject) => {
    crypto.scrypt(
      normalized,
      salt,
      expected.length,
      { N: n, r, p },
      (error, key) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(key as Buffer);
      },
    );
  });

  if (derived.length !== expected.length) {
    return false;
  }
  return crypto.timingSafeEqual(derived, expected);
}
