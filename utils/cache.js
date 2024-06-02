const NodeCache = require('node-cache');
const { cacheDuration } = require('../config/config');

// Initialize Node Cache
const cache = new NodeCache({ stdTTL: cacheDuration });

// Get Value by key
const getCache = (key) => cache.get(key);

// Set Value against key with ttl (time to live)
const setCache = (key, value, ttl) => {
  const success = cache.set(key, value, ttl);
  if (!success) {
    console.error('Failed to set cache');
  }
  return success;
};

module.exports = {
  getCache,
  setCache,
};
