const {getHistoricalWeatherExternalCall} = require("../../externalServices/weatherApi/historicalWeatherService");
const {mapHistoricalData} = require("../utils");
const {getCache, setCache} = require("../../utils/cache");
const {timeoutRequestIntervalHistoryApi, timeoutHistoryApi} = require("../../config/config");

const getHistoricalWeatherData = async (location, days) => {
    try {
      // check cache for recent lacation and period
      const cacheKey = getCacheKeyByLocationAndDuration(location, days);
      const cachedSummary = checkCacheForLocation(cacheKey);
      if(cachedSummary){
        return cachedSummary;
      }

      const summaries = [];
      for (let day = 0; day < days; day++) {
        // Convert to ISO date string
        const currentDate = new Date(Date.now() - ((day+1) * 24 * 60 * 60 * 1000)).toISOString().split('T')[0]; 
        // Get historica data by date
        const historicalData = await getHistoricalWeatherExternalCall(location, currentDate);
        summaries.push(mapHistoricalData(currentDate, historicalData));
  
        // Sleep to avoid timeout form ext api
        if ((day + 1) % timeoutRequestIntervalHistoryApi === 0) {
          console.log(`sleeping for ${timeoutHistoryApi} sec `);
          await new Promise(resolve => setTimeout(resolve, timeoutHistoryApi));
        }
      }
      // set cache
      setCache(cacheKey, summaries, 120);
      return summaries;

      } catch (error) {
        throw error;
      }
  };

  // Function to create key by location adn period
  function getCacheKeyByLocationAndDuration(location, days){
    // Get the current date and convert to ISO format
    const endDate = new Date().toISOString().split('T')[0];
    // Calculate the start date by subtracting the days and convert to ISO format
    const startDate = new Date(Date.now() - ((days - 1) * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];
    const cacheKey = `weather_${location}_${startDate}_${endDate}`;
    return cacheKey;
  }

  // Function to get cache by key
  function checkCacheForLocation(key) {
     const cachedSummary = getCache(key);
     return cachedSummary;
  }

  module.exports = {
    getHistoricalWeatherData,
  }