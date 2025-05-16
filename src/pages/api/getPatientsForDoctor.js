import dbConnect from '../../../lib/dbConnect';
import Conversation from '../../../models/conversation';
import User from '../../../models/user';
import { adminAuth } from '../../../lib/firebaseAdmin';

export default async function handler(req, res) {
  if (req.method !== 'GET')
    return res.status(405).json({ error: 'Method not allowed' });
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ error: 'No token' });
    const { uid } = await adminAuth.verifyIdToken(token);
    await dbConnect();

    // Find all conversations for this doctor
    const conversations = await Conversation.find({ doctor_uid: uid });
    const patientUids = conversations.map((conv) => conv.user_uid);

    // Get unique patient UIDs
    const uniquePatientUids = [...new Set(patientUids)];

    // Fetch patient details
    const patients = await User.find(
      { uid: { $in: uniquePatientUids } },
      { uid: 1, fullname: 1, email: 1, _id: 0 }
    );

    res.status(200).json({ patients });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}
