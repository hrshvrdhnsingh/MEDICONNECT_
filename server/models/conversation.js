import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
    user_uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true,
    },
    doctor_uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor", 
        required: true,
    },
    // Array of chats between the user and the doctor. It contains the sender type, the message and timestamp.
    chats: [
        {
            sender: {
                type: String,
                required: true,
                enum: ["user", "doctor"], 
            },
            message: { type: String, required: true },
            timestamp: { type: Date, default: () => Date.now() },
        },
    ],
}, { timestamps: true });

// Index for faster lookups due to the 1:1 relationship
conversationSchema.index({ user: 1, doctor: 1 });

const Conversation =
    mongoose.models.Conversation || mongoose.model("Conversation", conversationSchema);

export default Conversation;