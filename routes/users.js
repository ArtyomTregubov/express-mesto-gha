const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  getUser, getUsers, updateProfileInfo, updateAvatar, getProfile,
} = require('../controllers/users');
const { userIdValidator, userMeValidator } = require('../utils/validation_joi');

router.get('/', auth, getUsers);

router.get('/me', auth, getProfile);

router.get('/:id', userIdValidator, auth, getUser);

router.patch('/me', userMeValidator, auth, updateProfileInfo);

router.patch('/me/avatar', auth, updateAvatar);

module.exports = router;
