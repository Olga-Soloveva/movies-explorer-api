const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_KEY } = require('../utils/config');

const UnauthorizedError = require('../errors/unauthorized-err');
const BadRequestError = require('../errors/bad-request-err');
const ServerError = require('../errors/server-err');
const NotFoundError = require('../errors/not-found-err');
const ConflictError = require('../errors/conflict-err');

const {
  NOT_FOUND_MESSAGE,
  SERVER_ERROR_MESSAGE,
  BAD_REQUEST_MESSAGE,
  UNAUTHORIZED_ERR_MESSAGE,
  CONFLICT_ERR_MESSAGE,
} = require('../utils/constants');

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send(user))
    .catch(() => next(new ServerError(SERVER_ERROR_MESSAGE)));
};

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    {
      new: true,
      runValidators: true,
    },
  )
    // eslint-disable-next-line consistent-return
    .then((user) => {
      if (!user) {
        next(new NotFoundError(NOT_FOUND_MESSAGE));
      } else {
        return res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(BAD_REQUEST_MESSAGE));
      } else {
        next(new ServerError(SERVER_ERROR_MESSAGE));
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError(UNAUTHORIZED_ERR_MESSAGE);
      } else {
        return bcrypt.compare(password, user.password)
          // eslint-disable-next-line consistent-return
          .then((matched) => {
            if (!matched) {
              next(new UnauthorizedError(UNAUTHORIZED_ERR_MESSAGE));
            } else {
              const token = jwt.sign({ _id: user._id }, JWT_KEY);
              return res.send({ token, message: 'Авторизация прошла успешно' });
            }
          });
      }
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    email,
    password,
    name,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    }))
    .then((user) => {
      // eslint-disable-next-line no-param-reassign
      user.password = undefined;
      const token = jwt.sign({ _id: user._id }, JWT_KEY);
      res.send({ token, user });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(CONFLICT_ERR_MESSAGE));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError(BAD_REQUEST_MESSAGE));
      } else {
        next(new ServerError(SERVER_ERROR_MESSAGE));
      }
    });
};
