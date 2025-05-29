// pages/api/check-user-or-doctor.js
import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/user';
import Doctor from '../../../models/doctor';
import cookie from 'cookie';

export default async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      // Set cookies server-side
      const { token, uid, type } = req.body;
      if (!token || !uid || !type)
        return res.status(400).json({ error: 'Missing fields' });
      res.setHeader('Set-Cookie', [
        cookie.serialize('token', token, { path: '/', httpOnly: false }),
        cookie.serialize('user_uid', uid, { path: '/', httpOnly: false }),
        cookie.serialize('userType', type, { path: '/', httpOnly: false }),
      ]);
      return res.status(200).json({ success: true });
    }
    if (req.method !== 'GET') return res.status(405).end();

    const uid = req.query.uid;
    if (!uid) return res.status(400).json({ error: 'Missing uid' });

    await dbConnect();

    const userExists = await User.exists({ uid });
    const doctorExists = await Doctor.exists({ uid });

    return res.status(200).json({
      exists: Boolean(userExists || doctorExists),
      type: userExists ? 'user' : doctorExists ? 'doctor' : null,
    });
  } catch (error) {
    console.error('Error in check-user-or-doctor:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
