const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');
const {
  getUsers, updateProfileInfo, updateAvatar, getProfile,
} = require('../controllers/users');

router.get('/users', auth, getUsers);

router.get('/users/me', auth, getProfile);

// router.get('/users/:id', auth, getUser);

router.patch('/users/me', auth, updateProfileInfo);

router.patch('/users/me/avatar', auth, updateAvatar);

module.exports = router;
