const { SERVER_ERROR_CODE, SERVER_ERROR_MESSAGE } = require('../utils/constants');

// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  const { statusCode = SERVER_ERROR_CODE, message } = err;
  res
    .status(statusCode)
    .send({ message: statusCode === SERVER_ERROR_CODE ? SERVER_ERROR_MESSAGE : message });
};
