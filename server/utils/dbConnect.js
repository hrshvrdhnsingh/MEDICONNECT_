// import mongoose from 'mongoose';
const mongoose = require("mongoose");

let isConnected = false;

async function dbConnect() {
    if (isConnected) return;

    const MONGODB_URI = process.env.NEXT_PUBLIC_MONGO_URI;

    if (!MONGODB_URI) {
        throw new Error("Please define MONGODB_URI in .env.local");
    }

    try {
        await mongoose.connect(MONGODB_URI, {
            dbName: "mediconnect-db",
        });
        isConnected = true;
        console.log("MongoDB connected");
    } 
    catch (err) {
        console.error(err);
        throw err;
    }
}

module.exports = dbConnect;
