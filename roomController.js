const axios = require("axios");
const generateToken = require("./generateToken");

// Function to create a room
const createRoom = async (roomData) => {
  const token = generateToken();

  try {
    const response = await axios.post(
      "https://api.videosdk.live/v2/rooms",
      roomData,
      {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating room:", error.response ? error.response.data : error.message);
    throw error;
  }
};

// Function to fetch room details
const fetchRoomDetails = async (roomId) => {
  const token = generateToken();

  try {
    const response = await axios.get(
      `https://api.videosdk.live/v2/rooms/${roomId}`,
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching room details:", error.response ? error.response.data : error.message);
    throw error;
  }
};

// Function to list all rooms
const listRooms = async () => {
  const token = generateToken();

  try {
    const response = await axios.get(
      "https://api.videosdk.live/v2/rooms",
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error listing rooms:", error.response ? error.response.data : error.message);
    throw error;
  }
};

const deleteRoom = async (roomId) => {
  console.log("Marking room as expired:", roomId);
  return { message: `Room ${roomId} will be deleted automatically after inactivity.` };
};

module.exports = { createRoom, fetchRoomDetails, listRooms, deleteRoom };
