const express = require('express');
const http = require('http');
const { Server } = require('socket.io'); // Importing socket.io for real-time communication
const cors = require('cors'); // Importing CORS middleware for handling cross-origin requests

const app = express();
const server = http.createServer(app); // Creating an HTTP server using Express
const io = new Server(server, {
  cors: {
    origin: '*', // Allow all origins for CORS
    methods: ['GET', 'POST'], // Allow GET and POST methods
    credentials: true, // Allow credentials
  },
});

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id); // Log when a user connects

  // Handle incoming messages from clients
  // socket.on('message', (data) => {
  //   console.log('Message received:', data); // Log the received message
  //   io.emit('message', data); // Broadcast the message to all connected clients
  // });

  // // Handle disconnection of users
  // socket.on('disconnect', () => {
  //   console.log('A user disconnected:', socket.id); // Log when a user disconnects
  // });
});

app.use(cors()); // Use CORS middleware to handle cross-origin requests

app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
