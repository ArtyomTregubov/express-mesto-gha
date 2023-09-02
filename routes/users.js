const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');
const {
  getUser, getUsers, updateProfileInfo, updateAvatar, getProfile,
} = require('../controllers/users');

router.get('/', auth, getUsers);

router.get('/me', auth, getProfile);

router.get('/:id', auth, getUser);

router.patch('/me', auth, updateProfileInfo);

router.patch('/me/avatar', auth, updateAvatar);

module.exports = router;
