const express = require('express');
const { getHistoricalWeather } = require('../controllers/historyController');
const createRateLimiter = require('../utils/rateLimiter');
const { historyRateLimiterConfig } = require('../config/config');

const router = express.Router();

// Using specific config of ratelimiting for history routes 
const historyRateLimiter = createRateLimiter(historyRateLimiterConfig);

router.get('/:period', historyRateLimiter, getHistoricalWeather);

module.exports = router;
