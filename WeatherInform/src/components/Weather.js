import React, { useState } from "react";
import axios from "axios";

import Forecast from "./Forecast";

import "../stylse/Weather.css"

const API_KEY = '6e1d89d1cbc545a862d605b86ce50be4';
const API_URL = 'https://api.openweathermap.org/data/2.5/';

// для изменения в сроках первой строчной буквы на заглавную
String.prototype.Capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

function Weather() {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [weatherForecast, setWeatherForecast] = useState([]);
    const [error, setError] = useState('');

    const date = new Date();
    // const showTime = date.getDate() + ':' + date.getMonth() + ":" + date.getFullYear();
    const showTime = date.toLocaleString('ru', {year: "numeric", month: "long", day: "numeric"})

    const fetchWeatherData = async () => {
        try {
            const response = await axios.get(
                `${API_URL}weather?q=${city}&units=metric&appid=${API_KEY}&lang=ru`
            );
            const resForecast = await axios.get(
                `${API_URL}forecast?q=${city}&units=metric&appid=${API_KEY}&lang=ru`
            );
            console.log('response.data: ', response.data);
            setWeatherData(response.data);

            console.log('resForecast: ', typeof(resForecast.data.list), resForecast.data.list);
            setWeatherForecast(resForecast.data.list)

            setError('');

        } catch (error) {
              console.log(error);
              console.log('data.cod: ', error.response.data.cod)
              setError(error.response.data.cod);
              setWeatherData(null);
              setWeatherForecast(null);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchWeatherData();
    };

    return (
        <div className="weather">
            <form onSubmit={handleSubmit} className="weather-form">
              <input className="input-city" type="text" placeholder="Введите название города" value={city} 
                    onSubmit={handleSubmit}
                    onChange={(e) => setCity(e.target.value)} />
              <button className="button-get" type="submit">Запрос</button>
            </form>
            {weatherData && (
                <div className={weatherData.main.temp > 0 ? "weather-data color-warm" : 
                    "weather-data color-cool"}>
                    <h2>{weatherData.name}</h2>
                    <h4>{ showTime }</h4>
                    <p>{weatherData.weather[0].description.Capitalize()}</p>
                    <p>Температура: {Math.round(weatherData.main.temp)} °C</p>
                </div>
            )}
            { error && <div>Ошибка запроса: возможно город написан неверно</div> }
            {weatherData && (<Forecast weatherForecast={weatherForecast} />)}
        </div>
    );
}

export default Weather;