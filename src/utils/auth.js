import jwt from 'jsonwebtoken';

// Have to change this file this is just a placeholder

export function verifyToken(token) {
  try {
    const secret = process.env.JWT_SECRET; // Ensure this environment variable is set
    return jwt.verify(token, secret);
  } catch (error) {
    throw new Error('Invalid token');
  }
}
