import * as postService from '../services/post.service.js';
import { validateFields } from '../utils/validation.js';

export const createPost = async (req, res) => {
  try {
    // Validate input
    if (!validateFields(req, res, ["userId", "content","media"])) return;
    const { userId, content, media } = req.body;    
    const post = await postService.createPost({ userId, content, media });
    return res.status(201).json({message:"Post create",data:post});
  } catch (err) {
    console.error("Error in createPost:", err);
    return res.status(400).json({ error: 'Error Creating Post' });
  }
};

export const getPostById = async (req, res) => {
  try {
    // Validate input
    if (!validateFields(req, res, ["postId"])) return;
    const { postId } = req.body;
    const post = await postService.getPostById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post Not Found' });
    }
    return res.json(post);

  } catch (err) {
    console.error("Error in getPostById:", err);
    return res.status(500).json({ error: 'internal_error' });
  }
};
