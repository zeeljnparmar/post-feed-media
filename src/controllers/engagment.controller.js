import * as engagementService from '../services/engagement.service.js';
import { validateFields } from '../utils/validation.js';

// Handles LIKE action for a post.
export const likePost = async (req, res) => {
  try {

    if (!validateFields(req, res, ["postId", "userId"])) return;
    const { postId, userId } = req.body;
    const result = await engagementService.like(postId, userId);
    return res.json(result);
  } catch (err) {
    console.error("Error in likePost:", err);
    return res.status(500).json({ error: 'Unable to like' });
  }
};

// Handles UNLIKE action.
export const unlikePost = async (req, res) => {
  try {
    if (!validateFields(req, res, ["postId", "userId"])) return;
    const { postId, userId } = req.body;
    const result = await engagementService.unlike(postId, userId);
    return res.status(201).json(result);
  } catch (err) {
    console.error("Error in unlikePost:", err);
    return res.status(500).json({ error: 'internal_error' });
  }
};

//Handles adding a comment to a post.
export const commentPost = async (req, res) => {
  try {
    if (!validateFields(req, res, ["postId", "userId", "text"])) return;

    const { postId, userId, text } = req.body;
    const comment = await engagementService.comment(postId, userId, text);

    return res.status(201).json(comment);

  } catch (err) {
    console.error("Error in commentPost:", err);
    return res.status(500).json({ error: 'Unable to add comment' });
  }
};

// Handles share action of a post
export const sharePost = async (req, res) => {
  try {
    if (!validateFields(req, res, ["postId", "userId"])) return;

    const { postId } = req.body;
    const result = await engagementService.share(postId);
    return res.json(result);
  } catch (err) {
    console.error("Error in sharePost:", err);
    return res.status(500).json({ error: 'Unable to Share post' });
  }
};
