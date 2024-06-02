const axios = require('axios');
const { weatherApiKey, weatherApiUrl } = require('../../config/config');

const MAX_RETRIES = 3; // Max retry count
const RETRY_DELAY = 1000; // 1 second delay between retries

const getWeatherExternalCall = async (lat, lon) => {
  let retryCount = 0;
  while (retryCount < MAX_RETRIES) {
    try {
      const response = await axios.get(`${weatherApiUrl}/weather`, {
        params: {
          lat,
          lon,
          appid: weatherApiKey,
          units: 'metric',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch weather data, retrying...');
      retryCount++;
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
    }
  }
  throw new Error('Exceeded maximum retry attempts, failed to fetch weather data');
};

module.exports = {
  getWeatherExternalCall,
};
