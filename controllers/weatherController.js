const { getWeatherByCoords } = require('../services/weatherServices/weatherService')

const getWeatherByCoordinates = async (req, res) => {
  try {
    const locationId = req.params?.location_id;
    if (!locationId) {
      return res.status(400).send(`Emplty location id passed: ${locationId}`);
    }
    const {location, mappedWeatherData} = await getWeatherByCoords(locationId);
    res.json({
      location: location?.name,
      date: new Date().toISOString(),
      weather_data: mappedWeatherData,
    });
  } catch (error) {
    res.status(500).send(`Internal Server Error \n ${error}`);
  }
};


module.exports = {
  getWeatherByCoordinates,
};
