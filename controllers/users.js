const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const NotFoundError404 = require('../errors/notFoundError404');
const ConflictError409 = require('../errors/conflictError409');
const UnauthorizedError401 = require("../errors/unauthorizedError401");

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
      .then((user) => res.send(user))
      .catch(next));
};

const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ _id: id });
    if (!user) { next(new NotFoundError404('Пользователь не найден')); return; }
    res.send(user);
  } catch (err) {
    next(err);
  }
};

const getProfile = (req, res, next) => {
  User.findOne({ _id: req.user._id })
    .then((user) => res.send(user))
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
      res.cookie('token', token, { httpOnly: true, secure: true, maxAge: 604800 }).send({ token });
    })
    .catch(next(new UnauthorizedError401('Необходима авторизация')));
};

const updateUser = (id, params, res, next) => User.findByIdAndUpdate(id, params, { new: true, runValidators: true })
  .then((user) => res.send(user))
  .catch(next);

const updateProfileInfo = async (req, res, next) => {
  const { name, about } = req.body;
  updateUser(req.user._id, { name, about }, res, next).then((user) => res.send(user))
    .catch(next);
};

const updateAvatar = async (req, res, next) => {
  const { avatar } = req.body;
  updateUser(req.user._id, { avatar }, res, next).then((user) => res.send(user))
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
