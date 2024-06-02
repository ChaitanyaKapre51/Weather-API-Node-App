const {
  getAllLocations,
  getLocationById,
  createLocationByReq,
  updateLocationById,
  deleteLocationById} = require('../services/locationServices/locationService');

// getLocations: Returns all location in db
const getLocations = async (_, res) => {
  try {
    const locations = await getAllLocations();
    res.json(locations);
  } catch (error) {
    res.status(500).send(
      `Failed to get all locations, error : ${error}`
      );
  }
};

// getLocation: Returns locaiton by id
const getLocation = async (req, res) => {
  try {
    const locationId = req.params?.location_id;
    if(!locationId){
      res.status(400).send("Empty location id passed");
    }
    const location = await getLocationById(locationId);
    res.json(location);
  } catch (error) {
    res.status(error?.code || 500).send(
      `Failed to get location, error: ${error?.message || error}`
      );
  }
};

// createLocation: Creates location object
const createLocation = async (req, res) => {
  try {
    const { name, latitude, longitude } = req?.body;
    if (!name || typeof latitude !== 'number' || typeof longitude !== 'number') {
      return res.status(400).send(`Invalid location data: ${req?.body}`);
    }
    const newLocation = await createLocationByReq({ 
      name: name, 
      latitude: latitude,
      longitude: longitude,
    });
    await newLocation.save();
    res.status(201).json(newLocation);
  } catch (error) {
    res.status(error?.code || 500).send(
      `Failed to create location, error: ${error?.message || error}`
      );
  }
};

// updateLocation: Updates the location object
const updateLocation = async (req, res) => {
  try {
    const locationId = req.params?.location_id;
    console.log(locationId);
    const body = req?.body;
    if (!locationId) res.status(400).send("Empty location id passed");
    if (!body) res.status(400).send("Empty body passed");

    const updatedLocation = await updateLocationById(locationId, body);
    if (!updatedLocation) return res.status(404).send(`Location not found  ${locationId}`);
    
    res.json(updatedLocation);
  } catch (error) {
    if (error.code === 11000 && error.keyPattern) {
      // Handle duplicate key error
      res.status(409).send(`Duplicate key error: ${Object.keys(error.keyPattern).join(', ')}`);
    } else {
      // Handle other errors
      res.status(error?.code || 500).send(
        `Failed to update location, Error: ${error?.message || error}`
      );
    }
  }
};

// deleteLocation: Deletes the locaiton by id
const deleteLocation = async (req, res) => {
  try {
    const locationId = req.params?.location_id;
    if(!locationId){
      res.status(400).send("Empty location id passed");
    }
    const deletedLocation = await deleteLocationById(locationId);
    if (!deletedLocation) return res.status(404).send(`Location ${locationId} not found`);
    res.status(200).send(`Deleted location: ${locationId}`);
  } catch (error) {
    res.status(error?.code || 500).send(
      `Failed to delete location: ${locationId}, error: ${error?.message || error}`
      );
  }
};

module.exports = {
  getLocations,
  getLocation,
  createLocation,
  updateLocation,
  deleteLocation,
};
