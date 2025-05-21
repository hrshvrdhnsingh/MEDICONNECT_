import dbConnect from '../../../lib/dbConnect';
import Doctor from '../../../models/doctor';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  await dbConnect();
  const doctors = await Doctor.find({}, { uid: 1, firstName: 1, lastName: 1, email: 1, specialization: 1,  _id: 0 });
  res.status(200).json({ doctors });
}
