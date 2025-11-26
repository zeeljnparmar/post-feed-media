const engagementRepo = require('../repositories/engagement.repo.js');
const postsRepo = require('../repositories/post.repo.js');
const cache = require('../cache/cache.service');

async function like(postId, userId) {
  const post = await postsRepo.getPostById(postId);
  if (!post) throw new Error('post_not_found');
  const changed = await engagementRepo.addLike(postId, userId);
  // update cache for this post
  cache.del(`eng:${postId}`);
  // conservative: clear feed caches so counts stay consistent
  cache.clearAllFeeds();
  return { postId, liked: changed };
}

async function unlike(postId, userId) {
  const post = await postsRepo.getPostById(postId);
  if (!post) throw new Error('post_not_found');
  const changed = await engagementRepo.removeLike(postId, userId);
  // update cache for this post
  cache.del(`eng:${postId}`);
  // conservative: clear feed caches so counts stay consistent
  cache.clearAllFeeds();
  return { postId, liked: !changed ? false : true };
}

async function comment(postId, userId, text) {
  const post = await postsRepo.getPostById(postId);
  if (!post) throw new Error('post_not_found');
  const comment = await engagementRepo.addComment(postId, userId, text);
  // update cache for this post
  cache.del(`eng:${postId}`);
  // conservative: clear feed caches so counts stay consistent
  cache.clearAllFeeds();
  return comment;
}

async function share(postId, userId) {
  const post = await postsRepo.getPostById(postId);
  if (!post) throw new Error('post_not_found');
  const count = await engagementRepo.incrementShare(postId);
  // update cache for this post
  cache.del(`eng:${postId}`);
  // conservative: clear feed caches so counts stay consistent
  cache.clearAllFeeds();
  return { postId, shareCount: count };
}

module.exports = {
  like,
  unlike,
  comment,
  share
};
