const express = require('express');
const mongoose = require('mongoose');
const { port, mongoUri } = require('./config/config');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const createRateLimiter = require('./utils/rateLimiter');
const { generalRateLimiterConfig } = require('./config/config');

const app = express();

// middleware 
app.use(bodyParser.json());

// mongo connect
mongoose.connect(mongoUri, {
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// general rate limiter for all apis
app.use(createRateLimiter(generalRateLimiterConfig));

// Use the routes
app.use('/api', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

