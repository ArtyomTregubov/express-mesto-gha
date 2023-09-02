const express = require('express');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { signupValidator, signinValidator } = require('./utils/validation_joi');
const routerUsers = require('./routes/users');
const routerCards = require('./routes/cards');
const { unknownLink, createUser, login } = require('./controllers/users');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const URI_MONGO = 'mongodb://localhost:27017/mestodb';

mongoose.connect(URI_MONGO);
// mongoose.connect('mongodb://admin:admin@127.0.0.1:27017/mestodb?authSource=admin');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);
app.post('/signin', signinValidator, login);
app.post('/signup', signupValidator, createUser);
app.use('/', routerUsers);
app.use('/', routerCards);
app.use('*', unknownLink);
app.use(errors());
app.use((err, req, res, next) => {
  let { statusCode = 500 } = err;
  const { message } = err;
  if (message === 'Неправильные почта или пароль') {
    statusCode = 401;
  } else if (err.name === 'ValidationError' || err.name === 'CastError') {
    statusCode = 400;
  }

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});
app.listen(3000);
