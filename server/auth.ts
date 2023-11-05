import jwt from 'jsonwebtoken';
import { JwtObject } from './types';

export function signJwt(obj: JwtObject): string {
  const secret = getJwtSecret();
  return jwt.sign(obj, secret, {
    expiresIn: '15d',
  });
}

// Throws one of VerifyErrors on bad tokens
export function verifyJwt(token: string): JwtObject {
  return jwt.verify(token, getJwtSecret()) as JwtObject;
}

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.log('Missing JWT secret');
    process.exit(1);
  }

  return secret;
}
