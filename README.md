# Social Media Post Module (Node.js + Express + JSON Storage + Caching)

## 📌 Overview

This project implements a minimal backend module for a social media platform.  
It follows clean architecture, supports cursor-based pagination, likes, comments, shares, caching, concurrency safety, and readable timestamps.

---
## 📂 Folder Structure

```
src/
 ├── app.js
 ├── server.js
 ├── routes/
 │    └── index.js
 ├── controllers/
 │    ├── post.controller.js
 │    ├── feed.controller.js
 │    └── engagement.controller.js
 ├── services/
 │    ├── post.service.js
 │    ├── feed.service.js
 │    └── engagement.service.js
 ├── repositories/
 │    ├── posts.repo.js
 │    └── engagement.repo.js
 ├── cache/
 │    └── cache.service.js
 ├── utils/
 │    ├── cursor.js
 │    ├── fileMutex.js
 │    └── dateFormatter.js
data/
 ├── posts.json
 └── engagement.json
postman/
 └── PostmanCollection.json
```

## 🚀 Features

### ✅ Post Management
- Create post (text + media)
- Retrieve post with engagement data

### ✅ Feed System
- Cursor-based pagination  
- Stable ordering  
- No duplicates, no missing items  
- Supports infinite scroll

### ✅ Engagements
- Like
- Unlike
- Comment
- Share

### ✅ Caching Layer
- Feed caching
- Engagement caching
- TTL support
- Automatic invalidation
- In-memory or Redis-ready design

### ✅ Concurrency Safety
- Custom Mutex to serialize JSON file writes  
- Prevents race conditions & file corruption

### ✅ Human Readable Timestamps
Internal store:1764131678318
Returned to user as:26-Nov-2025 06:24 PM


---

## 🛠️ Tech Stack

- Node.js  
- Express.js  
- JSON file storage  
- Mutex for safe file writes  
- Custom caching  
- Redis compatible (optional upgrade)

---

## 🔄 Cursor-Based Pagination

Cursor = timestamp of last returned post.

Example:

**Request:**
```json
{
  "cursor": 1764131678318,
  "limit": 5
}
```
Condition used: timestamp < cursor
This guarantees:
 - Stable feed
 - No repeat posts
 - Works even when new posts are added

## 🚦 Caching Strategy
🔹 Feed Cache Key - feed:<cursor>:<limit>

🔹 Engagement Cache Key - eng:<postId>

🔹 Invalidation Rules - New post → clear feed cache - Like/comment/share → clear feed cache + engagement cache
