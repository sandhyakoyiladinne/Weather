import { useState } from 'react';
import PropTypes from 'prop-types';

const Forecast = ({ apiKey }) => {
    const [city, setCity] = useState('');
    const [forecastData, setForecastData] = useState([]);
    const [activeIndex, setActiveIndex] = useState(null); // To track which date is active

    const handleSearch = () => {
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`)
            .then(response => response.json())
            .then(data => setForecastData(data.list.filter((_, index) => index % 8 === 0))) // Filter to get one forecast per day
            // .catch(error => alert('City not found!'));
    };

    const handleToggleDetails = (index) => {
        setActiveIndex(activeIndex === index ? null : index); // Toggle the active index
    };

    return (
        <div className="forecast-container">
            <h2>Next 5-Days Weather Forecast</h2> 
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
                            <h3 onClick={() => handleToggleDetails(index)}>
                                {new Date(forecast.dt_txt).toDateString()}
                            </h3>
                            <div className="temp">
                                <p>{forecast.main.temp}°C</p>
                                <img 
                                    src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`} 
                                    alt={forecast.weather[0].description} 
                                />
                            </div>
                            <p className="description">{forecast.weather[0].description}</p>
                            
                            {activeIndex === index && (
                                <div className="additional-info">
                                    <p>Humidity: {forecast.main.humidity}%</p>
                                    <p>Wind Speed: {forecast.wind.speed} m/s</p>
                                    <p>Pressure: {forecast.main.pressure} hPa</p>
                                    <p>Feels Like: {forecast.main.feels_like}°C</p>
                                </div>
                            )}
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




