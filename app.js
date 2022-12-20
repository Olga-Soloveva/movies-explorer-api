require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
// const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('cors');
const centralErrorHandler = require('./middlewares/centralErrorHandler');
const routes = require('./routes');

const { PORT = 3000 } = process.env;

const app = express();
mongoose.set('strictQuery', true);

app.use(cors(
  {
    origin: '*',
    allowedHeaders: ['Content-Type', 'Authorization'],
  },
));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/bitfilmsdb');

// app.use(requestLogger);

app.use(routes);

// app.use(errorLogger);

app.use(errors());

app.use(centralErrorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
