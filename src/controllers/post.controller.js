const postService = require('../services/post.service');
const { validateFields } = require('../utils/validation');

// Controller for Creating a new Post and fetching post by id
exports.createPost = async (req, res) => {
  try {
    const { userId, content, media } = req.body;
    // Basic Validation
    if (!validateFields(req, res, ["userId", "content"])) return;

    const post = await postService.createPost({ userId, content, media });
    //? Sending success response
    return res.status(201).json(post);
  } catch (err) {
    console.error(err);
    //! Sending Error 
    return res.status(500).json({ error: 'internal_error' });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const { postId } = req.body;
    // Basic Validation
    if (!validateFields(req, res, ["postId"])) return;

    const post = await postService.getPostById(postId);
    //? Sending Succes response
    if (!post) return res.status(404).json({ error: 'not_found' });

    return res.json(post);
  } catch (err) {
    console.error(err);
    //! Sending Error 
    return res.status(500).json({ error: 'internal_error' });
  }
};
