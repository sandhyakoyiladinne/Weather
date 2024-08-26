import { useState } from 'react';
import PropTypes from 'prop-types';

const Forecast = ({ apiKey }) => {
    const [city, setCity] = useState('');
    const [forecastData, setForecastData] = useState([]);

    const handleSearch = () => {
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`)
            .then(response => response.json())
            .then(data => setForecastData(data.list.filter((_, index) => index % 8 === 0))) // Filter to get one forecast per day
            // .catch(error => alert('City not found!'));
    };

    return (
        <div className="forecast-container">
            <h2>5-Day Weather Forecast</h2> {/* Heading for 5-Day Forecast */}
            <div className="search-box">
                <input 
                    type="text" 
                    value={city} 
                    onChange={(e) => setCity(e.target.value)} 
                    placeholder="Enter city name" 
                />
                <button onClick={handleSearch}>Search</button>
            </div>

            {forecastData.length > 0 && (
                <div className="forecast-list">
                    {forecastData.map((forecast, index) => (
                        <div key={index} className="forecast-item">
                            <h3>{new Date(forecast.dt_txt).toDateString()}</h3>
                            <div className="temp">
                                <p>{forecast.main.temp}°C</p>
                                <img 
                                    src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`} 
                                    alt={forecast.weather[0].description} 
                                />
                            </div>
                            <p className="description">{forecast.weather[0].description}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

Forecast.propTypes = {
    apiKey: PropTypes.string.isRequired // API key must be a string and is required
};

export default Forecast;
