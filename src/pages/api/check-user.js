// pages/api/check-user.js
import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/user";

export default async function handler(req, res) {
    if (req.method !== "GET") return res.status(405).end();
    const uid = req.query.uid;
    
    if (!uid) return res.status(400).json({ error: "Missing uid" });
    await dbConnect();

    const exists = await User.exists({ uid });
    return res.status(200).json({ exists: Boolean(exists) });
}
