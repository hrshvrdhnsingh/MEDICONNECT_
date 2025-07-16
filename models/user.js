// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        uid: { type: String, required: true, unique: true, trim: true }, 
        email: { type: String, required: true, unique:true, trim: true },
        fullname: { type: String, required: true, trim: true },
        age: Number,
        weight: Number,
        height: Number,
        diet: { type: String, enum: ["veg", "non-veg"], default: "veg" },
    },
    {
        timestamps: true,
        _id: false, // Disable the default _id field
    }
);

// Intercept every JSON conversion of a User document, and run this transform over it. This is for when some
// data needs to be sent back. We can choose here to not expose some of the fields to the clients.
userSchema.set("toJSON", {
    transform: (doc, ret) => {
        ret.id = ret.uid; // Use uid as the identifier
        delete ret._id; // Remove the default _id field
        delete ret.createdAt;     // hide the creation timestamp
        delete ret.updatedAt;     // hide the update timestamp
        return ret;
    },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
