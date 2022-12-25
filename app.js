const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');

const { PORT_ENV, DATA_BASE } = require('./utils/config');

const apiLimiter = require('./middlewares/apiLimiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const centralErrorHandler = require('./middlewares/centralErrorHandler');
const routes = require('./routes');

const app = express();
mongoose.set('strictQuery', true);

app.use(cors(
  {
    origin: '*',
    allowedHeaders: ['Content-Type', 'Authorization'],
  },
));
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(DATA_BASE);

app.use(requestLogger);
app.use(apiLimiter);
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(centralErrorHandler);

app.listen(PORT_ENV, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT_ENV}`);
});
