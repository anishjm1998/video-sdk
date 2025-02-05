const axios = require('axios');
const generateToken = require('./generateToken');

const createRoom = async (roomData) => {
  const token = generateToken(); // Generate a token

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

module.exports = { createRoom };