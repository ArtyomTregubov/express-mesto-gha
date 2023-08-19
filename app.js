const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routerUsers = require('./routes/users');
const routerCards = require('./routes/cards');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const URI_MONGO = 'mongodb://localhost:27017/mestodb'

// mongoose.connect(URI_MONGO);
mongoose.connect('mongodb://admin:admin@127.0.0.1:27017/mestodb?authSource=admin');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('MongoDB connection success!');
});

const req = {};

app.use((req, res, next) => {
  req.user = {
    _id: '64e0a30776df3d30e45511ba'
  };

  next();
});

app.use('/', routerUsers);
app.use('/cards', routerCards);

app.listen(3000);
