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

---

## 🛠️ Setup & Installation

### 1️⃣ Install Dependencies
Run inside the project directory: npm install


### 2️⃣ Start the Server : npm run start
Server will be available at:3000


---

## 📬 API Usage (Body-Only, No Params)

### 1. Create Post  
`POST /api/posts/create`
```json
{
  "userId": 101,
  "content": "Hello World!",
  "media": ["https://img.com/1.jpg"]
}
```
### 2. Get Post
`POST /api/posts/get`
```json
{
  "postId": "uuid-here"
}
```
### 3.Feed (cursor pagination)
`POST /api/feed`
```json
{
  "limit": 5,
  "cursor": null
}
```
### 4.Like
`POST /api/posts/like`
```json
{
  "postId": "uuid-here",
  "userId": 101
}
```
### 5.Unlike
`POST /api/posts/unlike`
```json
{
  "postId": "uuid-here",
  "userId": 101
}
```
### 6.Comment
`POST /api/posts/comment`
```json
{
  "postId": "uuid-here",
  "userId": 101,
  "text": "Nice post!"
}
```
### 7.Share
`POST /api/posts/share`
```json
{
  "postId": "uuid-here",
  "userId": 101
}
```
## Postman Collection exists on 
```text
postman/PostmanCollection.json
Contains:
All endpoints
Sample bodies
Ready to test
```

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

## 🚦caching_strategy:
```
  cache_keys:
    feed_cache_key: "feed:<cursor>:<limit>"
    engagement_cache_key: "eng:<postId>"

  invalidation_rules:
    new_post:
      - "clear_feed_cache"
    engagement_update:   # like / unlike / comment / share
      - "clear_feed_cache"
      - "clear_engagement_cache_for_post"

  why_this_strategy_works:
    - "Ensures users always see the latest engagement numbers"
    - "Prevents stale feed pages"
    - "Keeps caching flexible and safe"
    - "Mirrors strategies used by Instagram / Twitter style feeds"
```
    
## 🧩Assumptions
```
User authentication is not implemented (mock userId used)
Data is stored in JSON files (no database required for this task)
Media is passed as URLs (no file upload in this version)
Engagement operations are idempotent per user
Cursor is based on timestamp (ms), ensuring stable pagination
Cache is in-memory but easily replaceable with Redis
```
