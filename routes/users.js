const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  getUser, getUsers, updateProfileInfo, updateAvatar, getProfile,
} = require('../controllers/users');
const { userIdValidator, userMeValidator, userMeAvatarValidator } = require('../utils/userValidationJoi');

router.get('/', auth, getUsers);

router.get('/me', auth, getProfile);

router.get('/:id', userIdValidator, auth, getUser);

router.patch('/me', userMeValidator, auth, updateProfileInfo);

router.patch('/me/avatar', userMeAvatarValidator, auth, updateAvatar);

module.exports = router;
