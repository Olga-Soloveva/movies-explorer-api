const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Превышен лимит количества запросов к серверу, попробуйте позднее',
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = apiLimiter;
