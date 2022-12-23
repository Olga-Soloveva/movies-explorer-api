const NotFoundError = require('../errors/not-found-err');
const { NOT_FOUND_MESSAGE } = require('../utils/constants');

module.exports.notFoundController = (req, res, next) => {
  next(new NotFoundError(NOT_FOUND_MESSAGE));
};
