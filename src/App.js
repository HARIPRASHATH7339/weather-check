import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const getWeather = async () => {
    if (!city.trim()) return;

    const API_KEY = '82cdb8bba2718bad1bdcad33e151b776'; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
      setError('');
      const response = await axios.get(url);
      setWeatherData({
        main: response.data.weather[0].main,
        temp: response.data.main.temp,
        description: response.data.weather[0].description,
      });
    } catch (err) {
      setError('City not found or error fetching data.');
      setWeatherData(null);
    }
  };

  return (
    <div className="page-container">
      <div className="weather-card">
        <h1 className="title">Weather Report</h1>
        <p className="subtitle">I can give you a weather report about your city !</p>

        <input
          type="text"
          className="city-input"
          placeholder="Enter your City Name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <button className="get-report-btn" onClick={getWeather}>
          Get Report
        </button>

        {error && <p className="error-text">{error}</p>}

        <div className="report-container">
          <p>
            <strong>Weather:</strong> {weatherData ? weatherData.main : ''}
          </p>
          <p>
            <strong>Temperature:</strong> {weatherData ? `${weatherData.temp}°C` : ''}
          </p>
          <p>
            <strong>Description:</strong> {weatherData ? weatherData.description : ''}
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;