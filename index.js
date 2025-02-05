const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON requests

// Basic route to test the server
app.get('/', (req, res) => {
  res.send('VideoSDK Backend is running!');
});

// Token generation route
const generateToken = require('./generateToken');
app.get('/generate-token', (req, res) => {
  const token = generateToken();
  res.json({ token });
});

// Room creation route
const { createRoom } = require('./roomController');
app.post('/create-room', async (req, res) => {
  console.log('Request Body:', req.body); // Debugging: Log the request body

  const { roomId, roomName } = req.body;

  // Validate request body
  if (!roomId || !roomName) {
    return res.status(400).json({ success: false, error: 'roomId and roomName are required' });
  }

  const roomData = {
    roomId,
    roomName,
  };

  try {
    const room = await createRoom(roomData);
    res.json({ success: true, room });
  } catch (error) {
    console.error('Error in /create-room:', error); // Debugging: Log the error
    res.status(500).json({ success: false, error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});