import * as crypto from 'crypto';

export function decrypt(encrypted: string): string {
  const ALGORITHM = 'aes-256-cbc';
  const keyFromEnv = process.env.AUTH_TOKEN || '';
  const key = crypto.createHash('sha256').update(keyFromEnv).digest();
  const encryptedBuffer = Buffer.from(encrypted, 'base64');
  const iv = encryptedBuffer.slice(0, 16);
  const ciphertext = encryptedBuffer.slice(16);
  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);

  let decrypted = decipher.update(ciphertext, undefined, 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
}

export function encrypt(plaintext: string): string {
  const ALGORITHM = 'aes-256-cbc';
  const keyFromEnv = process.env.AUTH_TOKEN || '';
  const key = crypto.createHash('sha256').update(keyFromEnv).digest();
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  let encrypted = cipher.update(plaintext, 'utf8');
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  const finalBuffer = Buffer.concat([iv, encrypted]);
  return finalBuffer.toString('base64');
}
