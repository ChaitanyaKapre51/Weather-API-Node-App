const axios = require('axios');
const { weatherHistoryApiUrl, weatherHistoryApiKey } = require('../../config/config');

const MAX_RETRIES = 3; //  Max retry count
const RETRY_DELAY = 1000; // 1 second delay between retries

const getHistoricalWeatherExternalCall = async (location, timestamp) => {
  let retryCount = 0;
  while (retryCount < MAX_RETRIES) {
    try {
      const response = await axios.get(`${weatherHistoryApiUrl}`, {
        params: {
          q: location,
          dt: timestamp,
          key: weatherHistoryApiKey,
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch historical weather data, retrying... Attempt ${retryCount + 1}`);
      retryCount++;
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
    }
  }
  throw new Error('Exceeded maximum retry attempts, failed to fetch historical weather data');
};

module.exports = {
  getHistoricalWeatherExternalCall,
};
