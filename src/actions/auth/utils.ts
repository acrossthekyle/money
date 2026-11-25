import crypto from 'crypto';

const MFA_SECRET = process.env.MFA_SECRET!;
const MFA_USERNAME = process.env.MFA_USERNAME!;

export function generate(): string {
  return crypto.randomInt(100000, 1000000).toString();
};

export function hash(code: string): string {
  return crypto
    .createHmac('sha256', MFA_SECRET)
    .update(`${MFA_USERNAME.toLowerCase().trim()}:${code}`)
    .digest('hex');
};

export function verify(code: string, hashed: string): boolean {
  const submitted = Buffer.from(hash(code), 'hex');
  const stored = Buffer.from(hashed, 'hex');

  if (submitted.length !== stored.length) {
    return false;
  }

  return crypto.timingSafeEqual(submitted, stored);
};
