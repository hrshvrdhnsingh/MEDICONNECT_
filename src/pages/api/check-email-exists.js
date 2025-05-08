// pages/api/check-email.js
import { dbConnect } from '../../../lib/dbConnect'; // your DB connection
import User from '../../../models/user';
import Doctor from '../../../models/doctor';
import { verifyToken } from '@/utils/auth'; // your JWT verification utility

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    const decoded = verifyToken(token);
    const email = decoded.email;

    await dbConnect();

    const user = await User.findOne({ email });
    const doctor = await Doctor.findOne({ email });

    const exists = !!(user || doctor);
    return res.status(200).json({ exists });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
