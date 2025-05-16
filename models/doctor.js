import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema(
  {
    uid: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    specialization: { type: [String], default: [] },
  },
  {
    timestamps: true,
    _id: false, // Disable the default _id field
  }
);

doctorSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret.uid; // Use uid as the identifier
    delete ret._id; // Remove the default _id field
    return ret;
  },
});

const Doctor = mongoose.models.Doctor || mongoose.model('Doctor', doctorSchema);

export default Doctor;
