const BAD_REQUEST_CODE = 400;
const UNAUTHORIZED = 401;
const FORBIDDEN = 403;
const NOT_FOUND_CODE = 404;
const CONFLICT_CODE = 409;
const SERVER_ERROR_CODE = 500;

const REGEX = /^(https?:\/\/)(w{3}\.)?([\w\-._~:/?#[\]@!$&'()*+,;=]+)(#?)$/;

const BAD_REQUEST_MESSAGE = 'Переданы некорректные данные';
const UNAUTHORIZED_ERR_MESSAGE = 'Неправильные почта или пароль';
const AUTH_ERR_MESSAGE = 'Необходима авторизация';
const FORBIDDEN_ERR_MESSAGE = 'Нет прав на удаление данных других пользователей';
const NOT_FOUND_MESSAGE = 'Запрашиваемый ресурс не найден';
const CONFLICT_ERR_MESSAGE = 'Пользователь с таким email уже существует';
const SERVER_ERROR_MESSAGE = 'На сервере произошла ошибка';
const LIMIT_API_ERROR_MESSAGE = 'Превышен лимит количества запросов к серверу, попробуйте позднее';

module.exports = {
  BAD_REQUEST_CODE,
  NOT_FOUND_CODE,
  SERVER_ERROR_CODE,
  UNAUTHORIZED,
  FORBIDDEN,
  CONFLICT_CODE,
  REGEX,
  BAD_REQUEST_MESSAGE,
  UNAUTHORIZED_ERR_MESSAGE,
  AUTH_ERR_MESSAGE,
  FORBIDDEN_ERR_MESSAGE,
  SERVER_ERROR_MESSAGE,
  LIMIT_API_ERROR_MESSAGE,
  NOT_FOUND_MESSAGE,
  CONFLICT_ERR_MESSAGE,
};
