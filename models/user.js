// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true }, // Ensure uid is unique
  email: { type: String, required: true },
  fullname: { type: String, required: true },
  age: Number,
  weight: Number,
  height: Number,
  diet: { type: String, enum: ['veg', 'non-veg'] },
}, { 
  timestamps: true,
  _id: false // Disable the default _id field
});

userSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret.uid; // Use uid as the identifier
    delete ret._id; // Remove the default _id field
    return ret;
  },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
