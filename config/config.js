require('dotenv').config();

module.exports = {
  weatherApiKey: process.env.WEATHER_API_KEY,
  weatherHistoryApiKey: process.env.WEATHER_HISTORY_API_KEY,
  weatherApiUrl: 'https://api.openweathermap.org/data/2.5',
  weatherHistoryApiUrl: 'http://api.weatherapi.com/v1/history.json',
  mongoUri: process.env.MONGO_URI,
  port: process.env.PORT || 3000,
  cacheDuration: parseInt(process.env.CACHE_DURATION, 10), // in seconds
  rateLimitWindowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10),
  rateLimitMaxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS, 10),
  timeoutHistoryApi: 2000,
  timeoutRequestIntervalHistoryApi: 10,
  weatherRateLimiterConfig: { windowMs: 30 * 60 * 1000, max: 20 },
  historyRateLimiterConfig: { windowMs: 30 * 60 * 1000, max: 20 },
};
