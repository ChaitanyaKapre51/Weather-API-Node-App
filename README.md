# Weather API Node.js Project

## Overview
This project is a RESTful API for managing locations and retrieving weather forecasts and historical weather data for specific locations. The API integrates with an external weather service OpenWeatherMap & WeatherAPI to fetch real-time and historical weather data .

## Features
- **Location Management**: Add, retrieve, update, and delete locations.
- **Weather Forecast**: Get real-time weather data for a specific location.
- **Historical Weather Data**: Retrieve historical weather data summaries for the past 7, 15, or 30 days.
- **Rate Limiting**: Prevent abuse of the API with configurable rate limiting.
- **Caching**: Reduce external API calls with caching mechanisms.
- **Logging**: Log API requests and responses.
- **Error Handling**: Graceful error handling for various scenarios.

## Endpoints
### Location Endpoints
- `GET /api/locations`: Get all locations.
- `POST /api/locations`: Add a new location.
- `GET /api/locations/:location_id`: Get a specific location by ID.
- `PUT /api/locations/:location_id`: Update a specific location by ID.
- `DELETE /api/locations/:location_id`: Delete a specific location by ID.

### Weather Endpoints
- `GET /api/weather/:location_id`: Get the weather forecast for a specific location.

### History Endpoints
- `GET /api/history/:period?location=<location>`: Get historical weather data for the past `period` days (7, 15, or 30 days).

## Getting Started
### Prerequisites
- Node.js (v22)
- npm (v10)
- mongodb

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/weather-api.git
   cd weather-api

2. Install dependencies::
    ```sh
    npm install

3. Ensure mongod is running locally

4. Create a .env file in the root directory and add your configuration:
   Rename the .env.local to .env

5. Start the app
   ```sh
   node app.js

5. Curls:
    
    A] Adding a Location

        curl --location --request POST 'http://localhost:3000/api/locations' \
        --header 'Content-Type: application/json' \
        --data-raw '{
        "name": "New York",
        "latitude": 40.71281,
        "longitude": -74.0062,
        "id": 32
        }'

    B] Retrieving All Locations
    
        curl --location --request GET 'localhost:3000/api/locations'

    C] Getting Weather Data for a Location
    
        curl --location --request GET 'http://localhost:3000/api/locations/665bf897d411955856fd13d72'

    D] Updating a Location
    
        curl --location --request PUT 'http://localhost:3000/api/locations/665b32738fc81e4caa2f0dc4' \
        --header 'Content-Type: application/json' \
        --data-raw '{
            "name": "New York 21",
            "latitude": 40.71281,
            "longitude": -74.0062
        }'

    E] Delete a Location
    
        curl --location --request DELETE 'http://localhost:3000/api/locations/665bf884d411955856fd13d4'

    F] Getting Weather Data by Location
    
        curl --location --request GET 'http://localhost:3000/api/weather/665b326f8fc81e4caa2f0dc2'

    G] Getting Historical Weather Data
    
        curl --location --request GET 'http://localhost:3000/api/history/3?location=mumbai'


