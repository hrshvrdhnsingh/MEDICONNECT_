require("dotenv").config({ path: ".env.local" });

const express = require("express");
const http = require("http");
const { Server } = require("socket.io"); // Adds WebSocket support onto the server
const cors = require("cors");
const mongoose = require("mongoose"); 
const Conversation = require("./models/conversation");
const dbConnect = require("./utils/dbConnect"); 

const app = express();
const server = http.createServer(app); // add socket.io server instance to the express app

const io = new Server(server, { 
    cors: {
        origin: "*", 
        methods: ["GET", "POST"], 
        credentials: true,
    },
});

(async () => {
    try {
        await dbConnect(); 
        console.log("Connected to MongoDB");
    } 
    catch (err) {
        console.error("Error connecting to MongoDB:", err);
        process.exit(1); // Exit the process if the connection fails
    }
})();

// Every new client on connection over the websocket gets it's own socket object.
io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    // Join a isolated room based on user_uid and doctor_uid sent from frontend
    // Rooms are just labels(buckets) you attach sockets to, so you can broadcast to a subset of clients
    socket.on("joinRoom", async ({ user_uid, doctor_uid }) => {
        if (!user_uid || !doctor_uid) return;
        const room = `${user_uid}_${doctor_uid}`; // Every doctor-user pair will end up in the same socket.io room
        socket.join(room);
        console.log(`User joined room: ${room}`);

        // Retrieve previous conversations
        try {
            const conversation = await Conversation.findOne({ user_uid, doctor_uid });
            if (conversation) {
                socket.emit("previousMessages", conversation.chats); // Send previous messages to the client
            } else {
                socket.emit("previousMessages", []);
            }
        } 
        catch (err) {
            console.error("Error retrieving conversation:", err);
            socket.emit("previousMessages", []);
        }
    });

    // Handle new messages. new message -> save the message with timestamp for ordering -> 
    // get the room -> broadcast it to that room only
    socket.on("sendMessage", async ({ sender, message, user_uid, doctor_uid }) => {
        if (!user_uid || !doctor_uid) return;
        const room = `${user_uid}_${doctor_uid}`;
        const chatMessage = { sender, message, timestamp: new Date() };

        // Save the message to the database (upsert available)
        try {
            await Conversation.findOneAndUpdate(
                { user_uid, doctor_uid },
                { $push: { chats: chatMessage } },
                { upsert: true, new: true }
            );
        } 
        catch (err) {
            console.error("Error saving message:", err);
        }

        // Broadcast the message to the room
        io.to(room).emit("receiveMessage", chatMessage);
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected:", socket.id); // Log when a user disconnects
    });
});

app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello from Express!");
});

// Fetching the existing conversations. allows the fronted to extract entire conversations via an Http request
app.get("/api/conversations", async (req, res) => {
    const { userId, doctorId } = req.query;

    if (!userId || !doctorId) {
        return res.status(400).json({ error: "userId and doctorId are required" });
    }

    try {
        const conversation = await Conversation.findOne({ userId, doctorId });

        if (!conversation) {
            return res.status(404).json({ message: "No conversation found" });
        }

        res.json(conversation);
    } 
    catch (err) {
        console.error("Error retrieving conversation:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
