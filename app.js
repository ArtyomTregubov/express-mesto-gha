const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');

const limiter = require('./utils/limiter');
const routers = require('./routes');
const handleError = require('./errors/handleError');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const URI_MONGO = 'mongodb://localhost:27017/mestodb';

mongoose.connect(URI_MONGO);
// mongoose.connect('mongodb://admin:admin@127.0.0.1:27017/mestodb?authSource=admin');

app.use(limiter);
app.use(routers);
app.use(errors());
app.use(handleError);
app.listen(3000);
