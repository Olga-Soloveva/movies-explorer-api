const rateLimit = require('express-rate-limit');
const { LIMIT_API_ERROR_MESSAGE } = require('../utils/constants');

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: LIMIT_API_ERROR_MESSAGE,
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = apiLimiter;
