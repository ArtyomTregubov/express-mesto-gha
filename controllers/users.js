const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const NotFoundError404 = require('../errors/not-found-error-404');
const ConflictError409 = require('../errors/conflict-error-409');
const {
  SUCCESS_CREATE_CODE_201,
  ERROR_NOT_FOUND_CODE_404,
} = require('../utils/errors_code');

const createUser = async (req, res, next) => {
  const {
    name, about, avatar, password, email,
  } = req.body;
  const checkedUser = await User.findOne({ email });
  if (checkedUser) { next(new ConflictError409('Пользователь существует')); return; }
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    })
      .then((err, user) => {
        res.status(SUCCESS_CREATE_CODE_201).send({
          _id: user._id,
          name,
          about,
          avatar,
          email,
        });
      })
      .catch(next));
};

const getUser = async (req, res, next) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(ERROR_NOT_FOUND_CODE_404).send({ message: 'Пользователь не найден' });
      return;
    }
    const { name, about, avatar } = user;
    res.send({ name, about, avatar });
  } catch (err) {
    next(err);
  }
};

const getProfile = (req, res, next) => {
  User.findOne({ _id: req.user._id })
    .then((user) => {
      if (!user) {
        throw new NotFoundError404('Нет пользователя с таким id');
      }
      res.send(user);
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        'some-secret-key',
        { expiresIn: '7d' },
      );
      res.cookie('jwt', token, { httpOnly: true, secure: true, maxAge: 604800 });
      res.send({ token });
    })
    .catch(next);
};

const updateUser = (id, params, res, next) => {
  User.findByIdAndUpdate(id, params, { new: true, runValidators: true })
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};

const updateProfileInfo = async (req, res, next) => {
  const { name, about } = req.body;
  updateUser(req.user._id, { name, about }, res, next).then((user) => {
    res.send(user);
  })
    .catch(next);
};

const updateAvatar = async (req, res, next) => {
  const { avatar } = req.body;
  updateUser(req.user._id, { avatar }, res, next).then((user) => {
    res.send(user);
  })
    .catch(next);
};

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({ });
    res.send(users);
  } catch (err) {
    next(err);
  }
};

const unknownLink = () => {
  throw new NotFoundError404('Некорректный путь');
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateProfileInfo,
  updateAvatar,
  unknownLink,
  getProfile,
  login,
};
