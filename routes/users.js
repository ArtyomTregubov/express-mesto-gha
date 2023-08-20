const router = require('express').Router();
const {
  createUser, getUser, getUsers, updateProfileInfo, updateAvatar, unknownLink
} = require('../controllers/users');

router.get('/users', getUsers);

router.get('/users/:id', getUser);

router.post('/users', createUser);

router.patch('/users/me', updateProfileInfo);

router.patch('/users/me/avatar', updateAvatar);

router.get('*', unknownLink);

module.exports = router;
