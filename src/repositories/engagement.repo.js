import fs from 'fs/promises';
import path from 'path';
import { Mutex } from '../utils/fileMutex.js';

const DATA_PATH = path.resolve('data/engagement.json');
const mutex = new Mutex();

async function readAll() {
  try {
    const txt = await fs.readFile(DATA_PATH, 'utf8');
    return JSON.parse(txt || '{}');
  } catch (err) {
    if (err.code === 'ENOENT') return {};
    throw err;
  }
}

async function writeAll(data) {
  await mutex.lock();
  try {
    await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2));
  } finally {
    mutex.unlock();
  }
}

export async function initForPost(postId) {
  const data = await readAll();
  if (!data[postId]) {
    data[postId] = { likes: [], comments: [], shareCount: 0 };
    await writeAll(data);
  }
}

export async function addLike(postId, userId) {
  const data = await readAll();

  if (!data[postId]) data[postId] = { likes: [], comments: [], shareCount: 0 };

  if (!data[postId].likes.includes(userId)) {
    data[postId].likes.push(userId);
    await writeAll(data);
    return true;
  }
  return false;
}

export async function removeLike(postId, userId) {
  const data = await readAll();
  if (!data[postId]) return false;

  const index = data[postId].likes.indexOf(userId);
  if (index !== -1) {
    data[postId].likes.splice(index, 1);
    await writeAll(data);
    return true;
  }
  return false;
}

export async function addComment(postId, userId, text) {
  const data = await readAll();
  if (!data[postId]) data[postId] = { likes: [], comments: [], shareCount: 0 };

  const comment = {
    id: Date.now() + '-' + Math.random().toString(36).substring(2, 8),
    userId,
    text,
    timestamp: Date.now()
  };

  data[postId].comments.push(comment);
  await writeAll(data);
  return comment;
}

export async function incrementShare(postId) {
  const data = await readAll();
  if (!data[postId]) data[postId] = { likes: [], comments: [], shareCount: 0 };

  data[postId].shareCount += 1;
  await writeAll(data);

  return data[postId].shareCount;
}

export async function getEngagementCounts(postId) {
  const data = await readAll();
  const entry = data[postId] || { likes: [], comments: [], shareCount: 0 };
  return {
    likeCount: entry.likes.length,
    commentCount: entry.comments,
    shareCount: entry.shareCount
  };
}

export async function getFullEngagement(postId) {
  const data = await readAll();
  return data[postId] || { likes: [], comments: [], shareCount: 0 };
}

// Named export object (optional)
export const engagementRepo = {
  initForPost,
  addLike,
  removeLike,
  addComment,
  incrementShare,
  getEngagementCounts,
  getFullEngagement
};
