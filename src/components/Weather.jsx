import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const Weather = ({ apiKey }) => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);

    const handleSearch = () => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
            .then(response => response.json())
            .then(data => setWeatherData(data))
            // .catch(error => alert('City not found!'));
    };

    return (
        <div className="weather-container">
            <h2>Current Weather</h2>
            <div className="search-box">
                <input 
                    type="text" 
                    value={city} 
                    onChange={(e) => setCity(e.target.value)} 
                    placeholder="Enter city name" 
                />
                <button onClick={handleSearch}>
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </div>

            {weatherData && (
                <div className="weather-info">
                    <h2>{weatherData.name}, {weatherData.sys.country}</h2> {/* City and Country */}
                    <div className="temp">
                        <p>{weatherData.main.temp}°C</p>
                        <img 
                            src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} 
                            alt={weatherData.weather[0].description} 
                        />
                    </div>
                    <p className="description">{weatherData.weather[0].description}</p>
                    <div className="additional-info">
                        <p>Humidity: {weatherData.main.humidity}%</p>
                        <p>Wind Speed: {weatherData.wind.speed} m/s</p>
                        <p>Pressure: {weatherData.main.pressure} hPa</p>
                        <p>Feels Like: {weatherData.main.feels_like}°C</p>
                    </div>
                </div>
            )}
        </div>
    );
};

Weather.propTypes = {
    apiKey: PropTypes.string.isRequired // API key must be a string and is required
};

export default Weather;
