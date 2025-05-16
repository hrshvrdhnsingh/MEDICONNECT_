import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema(
  {
    user_uid: {
      type: String, // Reference the uid field of the User collection
      ref: 'user', // Match the actual collection name in lowercase
      required: true,
    },
    doctor_uid: {
      type: String, // Reference the uid field of the Doctor collection
      ref: 'doctor', // Match the actual collection name in lowercase
      required: true,
    },
    chats: [
      {
        sender: {
          type: String,
          required: true,
          enum: ['user', 'doctor'], // Restrict sender to either 'user' or 'doctor'
        },
        message: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const Conversation =
  mongoose.models.Conversation ||
  mongoose.model('Conversation', conversationSchema);

export default Conversation;
