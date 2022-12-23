const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../utils/config');
const {
  AUTH_ERR_MESSAGE,
} = require('../utils/constants');

const UnauthorizedError = require('../errors/unauthorized-err');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    next(new UnauthorizedError(AUTH_ERR_MESSAGE));
    return;
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_KEY);
  } catch (err) {
    next(new UnauthorizedError(AUTH_ERR_MESSAGE));
  }

  req.user = payload;
  next();
};
