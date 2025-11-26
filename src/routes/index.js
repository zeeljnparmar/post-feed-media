const express = require('express');
const router = express.Router();

const postController = require('../controllers/post.controller.js');
const feedController = require('../controllers/feed.controller.js');
const engagementController = require('../controllers/engagment.controller.js');

// Routes to create and get post 
router.post('/posts/create', postController.createPost);
router.post('/posts/get', postController.getPostById);

// Route that manages feed
router.post('/feed', feedController.getFeed);

// Route that manages engagement
router.post('/posts/like', engagementController.likePost);
router.post('/posts/unlike', engagementController.unlikePost);
router.post('/posts/comment', engagementController.commentPost);
router.post('/posts/share', engagementController.sharePost);

module.exports = router;
