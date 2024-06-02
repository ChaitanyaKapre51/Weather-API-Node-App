const { getHistoricalWeatherData } = require('../services/historicalWeatherServices/historicalWeatherService')

const getHistoricalWeather = async (req, res) => {
    try {
      const { period } = req?.params;
      const days = parseInt(period, 10);
  
      // Validation: Ensure period is a valid number
      if (isNaN(days) || days <= 0) {
        return res.status(400).send('Invalid period');
      }

      // Validate location
      const location = req.query?.location;
      if (!location) {
        return res.status(404).send('Empty Location passed');
      }
  
      const summaries = await getHistoricalWeatherData(location, days);
      res.json({
        location: location,
        summaries: summaries,
      });
    } catch (error) {
      res.status(500).send(`Server Error, ${error}`);
    }
  };
  
  module.exports = {
    getHistoricalWeather,
  };