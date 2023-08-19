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
    const user = await User.find({ _id: id });
    if (user.length === 0) {
      res.status(ERROR_NOT_FOUND_CODE_404).send({ message: 'Пользователь не найден' });
      return;
    }
    const { name, about, avatar } = user[0];
    res.send({ name, about, avatar });
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(ERROR_CODE_400).send(err);
      return;
    }
    res.status(ERROR_NOT_FOUND_CODE_404).send(err);
  }
};

const updateUser = (id, params, res) => {
  User.findByIdAndUpdate(id, params, { new: true })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.status(ERROR_CODE_400).send(err);
    });
};

const updateProfileInfo = async (req, res) => {
  const { name, about } = req.body;
  updateUser(req.user._id, { name, about }, res);
};

const updateAvatar = async (req, res) => {
  const { avatar } = req.body;
  updateUser(req.user._id, { avatar }, res);
};

// const updateProfileInfo = (req, res, next) => {
//   const { name, about } = req.body;
//   const { _id } = req.user;
//
//   User.findByIdAndUpdate(_id, { name, about }, { new: true, runValidators: true })
//     .then((user) => {
//       if (!user) {
//         throw new Error({message: "User not found"});
//       }
//
//       res.send({ data: user });
//     })
//     .catch((err) => {
//       if (err.name === 'ValidationError') {
//         next(new Error({message: "Incorrect data"}));
//       } else {
//         next(err);
//       }
//     });
// };
//
// // Обновление аватара
// const updateAvatar = (req, res, next) => {
//   const { avatar } = req.body;
//   const { _id } = req.user;
//
//   User.findByIdAndUpdate(_id, { avatar }, { new: true, runValidators: true })
//     .then((user) => {
//       if (!user) {
//         throw new Error({message: "User not found"});
//       }
//
//       res.send({ data: user });
//     })
//     .catch(next);
// };


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
