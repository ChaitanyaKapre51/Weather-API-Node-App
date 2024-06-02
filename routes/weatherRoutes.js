const express = require('express');
const { getWeatherByCoordinates } = require('../controllers/weatherController');
const createRateLimiter = require('../utils/rateLimiter');
const { weatherRateLimiterConfig } = require('../config/config');

const router = express.Router();

// Using specific config of ratelimiting for weather routes 
const weatherRateLimiter = createRateLimiter(weatherRateLimiterConfig);

router.get('/:location_id', weatherRateLimiter, getWeatherByCoordinates);

module.exports = router;
