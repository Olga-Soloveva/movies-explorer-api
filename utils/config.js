require('dotenv').config();

const {
  PORT,
  NODE_ENV,
  JWT_SECRET,
  DATA_BASE_URL,
} = process.env;

const PORT_ENV = PORT || 3000;
const DATA_BASE = DATA_BASE_URL || 'mongodb://localhost:27017/bitfilmsdb';
const JWT_KEY = (NODE_ENV === 'production') ? JWT_SECRET : 'some-secret-key';

module.exports = {
  PORT_ENV,
  DATA_BASE,
  JWT_KEY,
};
