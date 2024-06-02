const express = require('express');
const {
  getLocations,
  getLocation,
  createLocation,
  updateLocation,
  deleteLocation,
} = require('../controllers/locationController');
const createRateLimiter = require('../utils/rateLimiter');
const { generalRateLimiterConfig } = require('../config/config');

const router = express.Router();

// Using generic config of rate limiter
const generalRateLimiter = createRateLimiter(generalRateLimiterConfig);

router.get('/', generalRateLimiter, getLocations);
router.post('/', generalRateLimiter, createLocation);
router.get('/:location_id', generalRateLimiter, getLocation);
router.put('/:location_id', generalRateLimiter, updateLocation);
router.delete('/:location_id', generalRateLimiter, deleteLocation);

module.exports = router;
