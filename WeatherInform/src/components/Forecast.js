import React from "react";
import Accordion from 'react-bootstrap/Accordion';

import "../stylse/Forecast.css"

function Forecast({ weatherForecast }) {

    const dailyData = weatherForecast.filter(reading => reading.dt_txt.includes("06:00:00"))

    function showTime(val) {
        const date = new Date(val*1000);
        const showTime = date.toLocaleString('ru', {year: "numeric", month: "long", day: "numeric"});
        return showTime
    }

    return (
        <div className="forecast">
            <div className="forecast-item-1">
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header><div className="header-text">Прогноз погоды на пять дней</div></Accordion.Header>
                    <Accordion.Body>
                        <div className="forecast-items">
                            {dailyData.map((item, index) => (
                                <div className={item.main.temp > 0 ? "forecast-item color-warm" : 
                                "forecast-item color-cool"} key={index}>
                                    <div className="weather-box date">{showTime(item.dt)}</div>
                                    <div className="weather">{item.weather[0].description.Capitalize()}</div>
                                    <div className="temp">{Math.round(item.main.temp)} °C</div>
                                </div>
                            ))}
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            </div>
        </div>
    );
}

export default Forecast;