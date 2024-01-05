import React from 'react'

const day_icons = {
    i01:"fa-solid fa-sun",
    i02:"fa-solid fa-cloud-sun",
    i03:"fa-solid fa-cloud",
    i04:"fa-solid fa-cloud",
    i09:"fa-solid fa-cloud-sun-rain",
    i10:"fa-solid fa-cloud-showers-heavy",
    i11:"fa-solid fa-cloud-bolt",
    i13:"fa-solid fa-snowflake",
    i50:"fa-solid fa-smog",
}

const night_icons = {
    i01:"fa-solid fa-moon",
    i02:"fa-solid fa-cloud-moon",
    i03:"fa-solid fa-cloud",
    i04:"fa-solid fa-cloud",
    i09:"fa-solid fa-cloud-moon-rain",
    i10:"fa-solid fa-cloud-showers-heavy",
    i11:"fa-solid fa-cloud-bolt",
    i13:"fa-solid fa-snowflake",
    i50:"fa-solid fa-smog",
}

const WeatherApp = ({weatherData, hour}) => {
    return (
    <>
    <div className="current">
        <div className="description">
            <div className="city">Auckland</div>
            <div className="icon"><i className={(hour < 20 && hour > 5) ? (day_icons[weatherData.icon]) : (night_icons[weatherData.icon])}></i></div>
            <div className="weatherCondition">{weatherData.description}</div>
        </div>
        <div className="metrics">
            <div className="inlineWrapper">
                <div className="miniIcon"><i className="fa-solid fa-temperature-three-quarters"></i></div>
                <div className="temperature"><span>{weatherData.temperature.toFixed(1) + String.fromCharCode(176)}</span></div>
            </div>
            <div className="inlineWrapper">
                <div className="miniIcon"><i className="fa-solid fa-droplet"></i></div>
                <div className="humidity">{weatherData.humidity+"%"}</div>
            </div>
            <div className="inlineWrapper">
                <div className="miniIcon"><i className="fa-solid fa-wind"></i></div>
                <div className="wind">{(weatherData.windSpeed*3.6).toFixed(1) + " Km/h"}</div>
            </div>
        </div>
    </div>
    </>
  );
}

export default WeatherApp;
