const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const generateToken = () => {
  const apiKey = process.env.VIDEO_SDK_API_KEY;
  const secretKey = process.env.VIDEO_SDK_SECRET_KEY;

  const options = {
    expiresIn: '24h', 
    algorithm: 'HS256',
  };

  const payload = {
    apikey: apiKey,
    permissions: ['allow_join', 'allow_mod'], 
  };

  const token = jwt.sign(payload, secretKey, options);
  return token;
};

module.exports = generateToken;