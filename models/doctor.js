import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },  
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  specialization: { type: [String], default: [] },  
}, { timestamps: true });

doctorSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret._id = ret._id.toString();
    return ret;
  },
});

const Doctor = mongoose.models.Doctor || mongoose.model('Doctor', doctorSchema);

export default Doctor;
