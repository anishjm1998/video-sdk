const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("VideoSDK Backend is running!");
});

const generateToken = require("./generateToken");
app.get("/generate-token", (req, res) => {
  const token = generateToken();
  res.json({ token });
});

const { createRoom, fetchRoomDetails, listRooms, deleteRoom } = require("./roomController");

app.post("/create-room", async (req, res) => {
  const { roomId, roomName } = req.body;

  if (!roomId || !roomName) {
    return res.status(400).json({ success: false, error: "roomId and roomName are required" });
  }

  const roomData = {
    roomId,
    roomName,
  };

  try {
    const room = await createRoom(roomData);
    res.json({ success: true, room });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get("/room/:roomId", async (req, res) => {
  const { roomId } = req.params;

  try {
    const roomDetails = await fetchRoomDetails(roomId);
    res.json({ success: true, roomDetails });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get("/rooms", async (req, res) => {
  try {
    const rooms = await listRooms();
    res.json({ success: true, rooms });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.delete("/room/:roomId", async (req, res) => {
  const { roomId } = req.params;

  try {
    const result = await deleteRoom(roomId);
    res.json({ success: true, result });
  } catch (error) {
    console.error("Error marking room as expired:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
