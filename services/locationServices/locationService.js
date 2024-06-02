const createCustomError = require ('../../utils/error');

const Location = require('../../models/location');

// Return all Locations from db
const getAllLocations = async () => {
  try {
    const locations = await Location.find();
    return locations;
  } catch (error) {
    throw error;
  }
};

// Return Location by id
const getLocationById = async (location_id) => {
  try {
    const location = await Location.findById(location_id);
    return location;
  } catch (error) {
    throw createCustomError(
        `Location not found for id: ${location_id}`, 
        404
    );
  }
};

// Create Location
const createLocationByReq = async (req) => {
  try {
    const newLocation = new Location({ 
        name: req?.name, 
        latitude: req?.latitude, 
        longitude: req?.longitude 
    });
    await newLocation.save();
    return newLocation;
  } catch (error) {
    throw createCustomError(error?.errmsg || error, 500);
  }
};

// Update Location by passing id
const updateLocationById = async (location_id, body) => {
    try {
      const updatedLocation = await Location.findByIdAndUpdate(location_id, body, { new: true });
      if (!updatedLocation) {
        throw createCustomError(`Location not found ${location_id}`, 404);
      }
      return updatedLocation;
    } catch (error) {
        throw error;
    }
  };

  // Delete location on passing id
const deleteLocationById = async (location_id) => {
  try {
    const deletedLocation = await Location.findByIdAndDelete(location_id);
    if(!deletedLocation){
        throw createCustomError(
            `Location ${location_id} not found`,
            404,
        );
    }
    return true;
  } catch (error) {
    throw error
  }
};

module.exports = {
  getAllLocations,
  getLocationById,
  createLocationByReq,
  updateLocationById,
  deleteLocationById,
};
