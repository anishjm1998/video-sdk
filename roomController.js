const axios = require('axios');
const generateToken = require('./generateToken');

const createRoom = async (roomData) => {
  const token = generateToken();

  try {
    const response = await axios.post(
      'https://api.videosdk.live/v2/rooms',
      roomData,
      {
        headers: {
          Authorization: `${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error creating room:', error.response ? error.response.data : error.message);
    throw error;
  }
};

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
    console.error('Error fetching room details:', error.response ? error.response.data : error.message);
    throw error;
  }
};

const listRooms = async () => {
  const token = generateToken();

  try {
    const response = await axios.get(
      'https://api.videosdk.live/v2/rooms',
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error listing rooms:', error.response ? error.response.data : error.message);
    throw error;
  }
};

module.exports = { createRoom, fetchRoomDetails, listRooms }; // Ensure listRooms is exported