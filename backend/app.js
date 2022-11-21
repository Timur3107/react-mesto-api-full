const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const { errorHandler } = require('./middlewares/errorHandler');
const NotFoundError = require('./errors/NotFoundError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(requestLogger);

app.use('/', require('./routes/users'));
app.use('/', require('./routes/cards'));

app.use(errorLogger);
app.use(errors());

app.use(() => {
  throw new NotFoundError('Такая страница не найдена!');
});

app.use(errorHandler);

app.listen(PORT);
