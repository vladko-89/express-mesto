const router = require('express').Router();
const { getUsers, createUser, getUserByID, updateUserInfo, updateUserAvatar } = require('../controllers/users');

router.get('/', getUsers);

router.post('/', createUser);

router.get('/:id', getUserByID);

router.patch('/me', updateUserInfo);

router.patch('/me/avatar', updateUserAvatar);

module.exports = router;