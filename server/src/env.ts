import { LOGGER } from './logging';

// Throws on bad tokens
export function getJwtSecrets(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    process.exit(1);
  }
  return secret!;
}

export function getSalt(): string {
  const salt = process.env.PASSWORD_SALT;
  if (!salt) {
    LOGGER.error('Missing Password salt');
    process.exit(1);
  }
  return salt!;
}
