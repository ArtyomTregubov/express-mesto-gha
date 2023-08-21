const express = require('express');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routerUsers = require('./routes/users');
const routerCards = require('./routes/cards');
const { unknownLink } = require('./controllers/users');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const URI_MONGO = 'mongodb://localhost:27017/mestodb';

mongoose.connect(URI_MONGO);
// mongoose.connect('mongodb://admin:admin@127.0.0.1:27017/mestodb?authSource=admin');

app.use((req, res, next) => {
  req.user = {
    _id: '64e0a30776df3d30e45511ba',
  };
  next();
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);
app.use('/', routerUsers);
app.use('/', routerCards);
app.use('*', unknownLink);
app.listen(3000);
