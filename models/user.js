// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  uid: { type: String, required: true },
  email: { type: String, required: true },
  fullname: {type: String, required: true },
  age: Number,
  weight: Number,
  height: Number,
  diet: { type: String, enum: ['veg', 'non-veg'] },
}, { timestamps: true });

userSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret._id = ret._id.toString(); // Convert _id to string
    return ret;
  },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
