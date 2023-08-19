const User = require('../models/user');
const {
  SUCCESS_CREATE_CODE_201,
  ERROR_CODE_400,
  ERROR_NOT_FOUND_CODE_404,
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
    .catch((err) => {
      res.status(ERROR_CODE_400).send(err);
    });
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const users = await User.find({ _id: id });
    res.send(users);
  } catch (err) {
    res.status(ERROR_NOT_FOUND_CODE_404).send(err);
  }
};

const updateUser = (id, params, res) => {
  User.findByIdAndUpdate(id, params, { new: true })
    .then((user) => {
      res.status(SUCCESS_CREATE_CODE_201).send(user);
    })
    .catch((err) => {
      res.status(ERROR_CODE_400).send(err);
    });
};

const updateProfileInfo = async (req, res) => {
  const { _id, name, about } = req.query;
  updateUser(_id, { name, about }, res);
};

const updateAvatar = async (req, res) => {
  const { _id, avatar } = req.query;
  updateUser(_id, { avatar }, res);
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({ });
    res.send(users);
  } catch (err) {
    res.status(ERROR_CODE_400).send(err);
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateProfileInfo,
  updateAvatar,
};
