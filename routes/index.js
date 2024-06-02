const express = require('express');
const locationRoutes = require('./locationRoutes');
const weatherRoutes = require('./weatherRoutes');
const historyRoutes = require('./historyRoutes');

// Initialize router
const router = express.Router();

// routes
router.use('/locations', locationRoutes);
router.use('/weather', weatherRoutes);
router.use('/history', historyRoutes);

module.exports = router;
