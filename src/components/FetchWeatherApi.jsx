import React, { useState } from 'react';
import './FetchWeatherApp.css'

const FetchWeatherApi = () => {
  const [data, setData] = useState(null);
  const [city, setCity] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (city.trim() === '') {
      setErrorMessage('Please enter a city name.');
      return;
    }
    
    setErrorMessage('');
    await fetchData();
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=aaa999e793fe1fcd1455add65090cfa7`
      );
      
      if (response.ok) {
        const json = await response.json();
        setData(json.weather ? json : null);
      } else {
        setErrorMessage('Failed to fetch weather data.');
      }
    } catch (error) {
      setErrorMessage('Failed to fetch weather data.');
      console.log(error);
    }
  };

  return (
    <div className="card m-auto mt-5 border-primary shadow-lg">
      <div className="card-body">
        <h1 className="card-title">Weather Information</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group mb-3 justify-content-center gap-1">
            <input
              type="text"
              className="form rounded"
              placeholder="Enter city name"
              value={city}
              onChange={handleInputChange}
            />
            <button className="btn btn-primary rounded" type="submit">
              Fetch
            </button>
          </div>
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
        </form>
        {data ? (
          <div>
            <p className="card-text fw-bold">ID: {data.weather[0].id}</p>
            <p className="card-text fw-bold">Temperature: {data.main.temp}</p>
            <p className="card-text fw-bold">Max Temperature: {data.main.temp_max}</p>
            <p className="card-text fw-bold">Pressure: {data.main.pressure}</p>
            <p className="card-text fw-bold">Humidity: {data.main.humidity}</p>
          </div>
        ) : (
          <p>No weather data available.</p>
        )}
      </div>
    </div>
  );
};

export default FetchWeatherApi;
