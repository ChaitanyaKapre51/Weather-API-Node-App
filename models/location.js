const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
});

// Define a compound index on name, latitude, and longitude fields
locationSchema.index({ name: 1, latitude: 1, longitude: 1 }, { unique: true });

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
