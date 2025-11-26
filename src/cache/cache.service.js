// Module for in-memory cache designed to mimic basic Redis behavior.
class CacheService {
  constructor() {

    //? Main key-value storage map
    this.store = new Map();

    //? track feed moment to delete on update or add
    this.feedKeys = new Set();

  }

  _now() { return Date.now(); }
  //? Create a key 
  set(key, value, ttl = 0) {
    const entry = {
      value,
      //? storing TTL
      expiresAt: ttl > 0 ? this._now() + ttl : null
    };
    //? Storing Cache 
    this.store.set(key, entry);

    //? Track feed for fast invalidation
    if (key.startsWith('feed:')) this.feedKeys.add(key);
  }

  //? Fetching Values for key cache
  get(key) {
    const e = this.store.get(key);
    if (!e) return null;

    //? Check if key is expired
    if (e.expiresAt && e.expiresAt < this._now()) {
      
      //? Delete if expires
      this.store.delete(key);

      //? If it was a feed key, remove from feedKey tracker too
      if (key.startsWith('feed:')) this.feedKeys.delete(key);

      return null;
    }
    //? If cache is hit
    return e.value;
  }

  //? Deleting key From Cache
  del(key) {
    this.store.delete(key);
    if (key.startsWith('feed:')) this.feedKeys.delete(key);
  }

  //? Clear only keys related to feed
  clearAllFeeds() {
    for (const k of Array.from(this.feedKeys)) {
      this.store.delete(k);
      this.feedKeys.delete(k);
    }
  }

  //? Clearing every key
  clearAll() {
    this.store.clear();
    this.feedKeys.clear();
  }
}

//? Exporting instance like Redis
export const cache = new CacheService();
export default cache;
