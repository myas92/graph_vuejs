const express = require('express');
const router = express.Router();
const { getUsers,
    insertUser,
    deleteAllUsers,
    getUsersByLabel,
    searchUser,
    getUsersWithRelations,
    deleteUserById,
} = require('../controller/user.controller');

router.get('/label', getUsersByLabel)
router.get('/relation', getUsersWithRelations)
router.get('/search', searchUser)
router.post('/', insertUser)
router.get('/', getUsers)
router.delete('/:elementId', deleteUserById)
router.delete('/', deleteAllUsers)


module.exports = router;