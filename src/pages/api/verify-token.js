// pages/api/verify-token.js
import { adminAuth } from '../../../lib/firebaseAdmin';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const token = req.headers.authorization?.split('Bearer ')[1] || req.body.token;
  if (!token) return res.status(401).json({ error: 'No token provided' });

  try {
    const decoded = await adminAuth.verifyIdToken(token);
    // console.log('Token verified:', decoded);
    return res.status(200).json({ valid: true, uid: decoded.uid, email: decoded.email });
  } catch {
      return res.status(401).json({ valid: false, error: 'Invalid token' });
  }
}
