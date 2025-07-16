import { adminAuth } from "../../../lib/firebaseAdmin";
import connectDB from "../../../lib/dbConnect";
import Doctor from "../../../models/doctor";
import User from "../../../models/user"; // import user model for checking

export default async function handler(req, res) {
    if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

    const token = req.headers.authorization?.split("Bearer ")[1];
    if (!token) return res.status(401).json({ error: "No token provided" });

    try {
        const decoded = await adminAuth.verifyIdToken(token);
        await connectDB();

        const { firstName, lastName, specialization } = req.body;
        const email = decoded.email;

        // Check if this email already exists in User
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: "Email already registered as a user" });
        }

        const doctor = await Doctor.findOneAndUpdate(
            { uid: decoded.uid },
            {
                firstName,
                lastName,
                email,
                specialization,
                uid: decoded.uid,
            },
            { upsert: true, new: true }
        );

        return res.status(200).json({ message: "Doctor data saved", doctor });
    } 
    catch (err) {
        console.error("Error saving doctor:", err);
        return res.status(401).json({ error: "Invalid token or DB error" });
    }
}
