// utils/auth.js
import jwt from 'jsonwebtoken';

export function verifyToken(token) {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT secret is not defined in environment variables.');
  }

  try {
    return jwt.verify(token, secret);
  } catch (error) {
    console.error('JWT verification failed:', error.message);
    throw new Error('Invalid or expired token');
  }
}
