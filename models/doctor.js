import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
    {
        uid: { type: String, required: true, unique: true, trim: true },
        email: { type: String, unique: true, required: true, trim: true },
        firstName: { type: String, required: true, trim: true},
        lastName: { type: String, required: true, trim: true },
        specialization: { type: [String], default: [] },
    },
    {
        timestamps: true,
        _id: false, // Disable the default _id field. COuld do with keeping it as well but for clarity.
    }
);

// While responding to the client, use uid as the id, and remove the following so as to not expose them.
doctorSchema.set("toJSON", {
    transform: (doc, ret) => {
        ret.id = ret.uid; // Use uid as the identifier
        delete ret._id; // Remove the default _id field
        delete ret.createdAt; // hide the creation timestamp
        delete ret.updatedAt; // hide the update timestamp
        return ret;
    },
});

const Doctor = mongoose.models.Doctor || mongoose.model("Doctor", doctorSchema);

export default Doctor;
