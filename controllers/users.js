const User = require('../models/user');
const {
  SUCCESS_CREATE_CODE_201,
  ERROR_NOT_FOUND_CODE_404,
  getStatusError,
} = require('../const/errors_code');

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => {
      res.status(SUCCESS_CREATE_CODE_201).send({
        _id: user._id,
        name,
        about,
        avatar,
      });
    })
    .catch((err) => res.status(getStatusError(err)).send(err));
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.find({ _id: id });
    if (user.length === 0) {
      res.status(ERROR_NOT_FOUND_CODE_404).send({ message: 'Пользователь не найден' });
      return;
    }
    const { name, about, avatar } = user[0];
    res.send({ name, about, avatar });
  } catch (err) {
    res.status(getStatusError(err)).send(err);
  }
};

const updateUser = (id, params, res) => {
  User.findByIdAndUpdate(id, params, { new: true, runValidators: true })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => res.status(getStatusError(err)).send(err));
};

const updateProfileInfo = async (req, res) => {
  const { name, about } = req.body;
  updateUser(req.user._id, { name, about }, res).then((user) => {
    res.send(user);
  })
    .catch((err) => res.status(getStatusError(err)).send(err));
};

const updateAvatar = async (req, res) => {
  const { avatar } = req.body;
  updateUser(req.user._id, { avatar }, res).then((user) => {
    res.send(user);
  })
    .catch((err) => res.status(getStatusError(err)).send(err));
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({ });
    res.send(users);
  } catch (err) {
    res.status(getStatusError(err)).send(err);
  }
};

const unknownLink = (req, res) => {
  res.status(ERROR_NOT_FOUND_CODE_404).send({ message: 'Некорректный путь' });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateProfileInfo,
  updateAvatar,
  unknownLink,
};
