const express = require('express');
const { getAllUsers, loginUser, signupUser, deleteUser } = require('../controllers/userController');
const Post = require('../models/Post');
const router = express.Router();

router.get('/', getAllUsers);
router.post('/signup', signupUser);
router.post('/login', loginUser);
router.delete('/delete/:id', deleteUser);


module.exports = router;