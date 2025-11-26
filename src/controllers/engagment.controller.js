const engagementService = require('../services/engagement.service');
const { validateFields } = require('../utils/validation');

// Controlls to handle LIKE, UNLIKE, COMMENT and SHARE of post
// This handles flow when a user likes a post

exports.likePost = async (req, res) => {
  try {
    const { postId, userId } = req.body;
    // Basic input validation
    if (!validateFields(req, res, ["postId", "userId"])) return;

    const result = await engagementService.like(postId, userId);
    //? Sending Succes response
    return res.json(result);

  } catch (err) {
    console.error(err);
    //! Sending Error 
    return res.status(500).json({ error: 'internal_error' });
  }
};

exports.unlikePost = async (req, res) => {
  try {
    const { postId, userId } = req.body;
    // Basic input validation
    if (!validateFields(req, res, ["postId", "userId"])) return;    

    const result = await engagementService.unlike(postId, userId);
    //? Sending Succes response
    return res.status(201).json(result);

  } catch (err) {
    console.error(err);
    //! Sending Error 
    return res.status(500).json({ error: 'internal_error' });
  }
};

exports.commentPost = async (req, res) => {
  try {
    const { postId, userId, text } = req.body;
    // Basic input validation
    if (!validateFields(req, res, ["postId", "userId", "text"])) return;

    const comment = await engagementService.comment(postId, userId, text);
    //? Sending Succes response
    return res.status(201).json(comment);

  } catch (err) {
    console.error(err);
    //! Sending Error 
    return res.status(500).json({ error: 'internal_error' });
  }
};

exports.sharePost = async (req, res) => {
  try {
    const { postId, userId } = req.body;
    // Basic input validation
    if (!validateFields(req, res, ["postId", "userId"])) return;

    const result = await engagementService.share(postId);
    //? Sending Succes response
    return res.json(result);

  } catch (err) {
    console.error(err);
    //! Sending Error 
    return res.status(500).json({ error: 'internal_error' });
  }
};
