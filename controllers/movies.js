const Movie = require('../models/movie');

const BadRequestError = require('../errors/bad-request-err');
const ServerError = require('../errors/server-err');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner: req.user._id,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при сохранении фильма'));
      } else {
        next(new ServerError('На сервере произошла ошибка'));
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        next(new NotFoundError('Фильм с указанным id не найден'));
        return;
      }
      if (req.user._id !== movie.owner._id.toString()) {
        next(new ForbiddenError('Нет прав на удаление фильма других пользователей'));
        return;
      }
      // eslint-disable-next-line consistent-return
      return movie;
    })
    .then((movie) => {
      Movie.findByIdAndRemove(movie.id)
        .then((movieDelete) => res.send(movieDelete));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Передан некорректный id фильма'));
      } else {
        next(new ServerError('На сервере произошла ошибка'));
      }
    });
};
