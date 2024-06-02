function mapHistoricalData(currentDate, historicalData){
    return {
      date: currentDate,
      max_temperature: historicalData?.forecast?.forecastday[0]?.day?.maxtemp_c,
      min_temperature: historicalData?.forecast?.forecastday[0]?.day?.mintemp_c,
      max_wind_speed: historicalData?.forecast?.forecastday[0]?.day?.maxwind_mph,
      total_precipitation: historicalData?.forecast?.forecastday[0]?.day?.totalprecip_mm,
      humidity: historicalData?.forecast?.forecastday[0]?.day?.avghumidity,
      weather_desc: historicalData?.forecast?.forecastday[0]?.day?.condition?.text,
    }
  }

function mapWeatherData(weatherData){
  return {
    weather: weatherData?.weather[0]?.main,
    weather_desc: weatherData?.weather[0]?.description,
    curr_temperature: weatherData?.main?.temp,
    max_temperature: weatherData?.main?.temp_max,
    min_temperature: weatherData?.main?.temp_min,
    wind_speed: weatherData?.wind?.speed,
    pressure: weatherData?.main?.pressure,
    humidity: weatherData?.main?.humidity,
    weather_desc: weatherData?.main[0]?.description,
  }
}

  module.exports = {
    mapHistoricalData,
    mapWeatherData,
  };