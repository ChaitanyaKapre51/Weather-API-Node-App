const rateLimit = require('express-rate-limit');

// Initialize ratelimiter through config
const createRateLimiter = (config) => rateLimit({
  windowMs: config?.windowMs,
  max: config?.max,
  message: config?.message || 'Too many requests, please try again later.',
  headers: config?.headers !== undefined ? options.headers : true, 
});

module.exports = createRateLimiter;
