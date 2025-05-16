import { adminAuth } from '../../../lib/firebaseAdmin';
import connectDB from '../../../lib/dbConnect';
import User from '../../../models/user';
import Doctor from '../../../models/doctor'; // import doctor model for checking

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const token = req.headers.authorization?.split('Bearer ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });

  try {
    const decoded = await adminAuth.verifyIdToken(token);
    await connectDB();

    const { fullname, age, weight, diet, height } = req.body;

    // Check if this email already exists in Doctor
    const existingDoctor = await Doctor.findOne({ email: decoded.email });
    if (existingDoctor) {
      return res.status(409).json({ error: 'Email already registered as a doctor' });
    }

    const user = await User.findOneAndUpdate(
      { uid: decoded.uid },
      {
        fullname,
        email: decoded.email,
        age,
        weight,
        diet,
        height,
        uid: decoded.uid,
      },
      { upsert: true, new: true }
    );

    return res.status(200).json({ message: 'User data saved', user });
  } catch (err) {
    console.error('Error saving user:', err);
    return res.status(401).json({ error: 'Invalid token or DB error' });
  }
}
