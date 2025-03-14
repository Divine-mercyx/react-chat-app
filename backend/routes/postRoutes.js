const { createPost, deletePost, updatePost, getPosts } = require('../controllers/postController');
const Post = require('../models/Post');
const express = require('express');
const router = express.Router();


router.post('/post/:id', createPost);
router.get('/posts', getPosts);
router.put('/post/update/:id', updatePost);
router.delete('/post/delete/:id', deletePost);

module.exports = router;