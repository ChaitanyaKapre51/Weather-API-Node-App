const {getWeatherExternalCall} = require("../../externalServices/openWeatherAppApi/CurrentWeatherService");
const {getCache, setCache} = require("../../utils/cache");
const Location = require("../../models/location");
const {mapWeatherData} = require("../utils");

const getWeatherByCoords = async (locationId) => {
  try {
    // grt loation by id
    const location = await Location.findById(locationId);
    if (!location) {
      throw new Error(`Location not found for id: ${locationId}`);
    }
    // check cache
    const cacheKey = getCacheKey(locationId);
    const cacheWeatherData = checkCacheWeatherData(cacheKey);
    if(cacheWeatherData){
      return {location, mappedWeatherData: cacheWeatherData};
    }
    // get weather data by location coodinates via external api
    const weatherData = await getWeatherExternalCall(location.latitude, location.longitude);
    const mappedWeatherData = mapWeatherData(weatherData);
    setCache(cacheKey, mappedWeatherData, 120);
    return {
      location,
      mappedWeatherData,
    }
  } catch (error) {
    throw new Error(`Failed to fetch weather data with error: ${error}`);
  }
};

// Funtion to create cache key
function getCacheKey(locationId){
  const cacheKey = `weather_${locationId}`;
  return cacheKey;
}

// Funtion to return value from cache by passing key
function checkCacheWeatherData(key){
  return getCache(key);
}

module.exports = {
  getWeatherByCoords,
};
