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
  
const processTime = (hour) =>{
    hour = hour % 24;
    if(hour === 0){
        return "12am"
    } else if ( hour === 12){
        return "12pm"
    } else if (hour < 12){
        return hour+"am"
    } else{
        return hour-12 + "pm"
    }
  }

  const WeatherForecastApp = ({hour, forecastData}) => {
    return(
        <>
            <div className="forecast">
                <div className="hour1 hour">
                    <div className="forecastTime">{processTime(hour+1)}</div>
                    <div className="hourIcon"><i className={(hour+1 < 20 && hour+1 > 5) ? (day_icons[forecastData.hour1[1]]) : (night_icons[forecastData.hour1[1]])}></i></div>
                    <div className="temp">{forecastData.hour1[0].toFixed(1) + String.fromCharCode(176)}</div>
                </div>
                <div className="hour2 hour">
                    <div className="forecastTime">{processTime(hour+2)}</div>
                    <div className="hourIcon"><i className={(hour+2 < 20 && hour+2 > 5) ? (day_icons[forecastData.hour2[1]]) : (night_icons[forecastData.hour2[1]])}></i></div>
                    <div className="temp">{forecastData.hour2[0].toFixed(1) + String.fromCharCode(176)}</div>
                </div>
                <div className="hour3 hour">
                    <div className="forecastTime">{processTime(hour+3)}</div>
                    <div className="hourIcon"><i className={(hour+3 < 20 && hour+3 > 5) ? (day_icons[forecastData.hour3[1]]) : (night_icons[forecastData.hour3[1]])}></i></div>
                    <div className="temp">{forecastData.hour3[0].toFixed(1) + String.fromCharCode(176)}</div>
                </div>
                <div className="hour4 hour">
                    <div className="forecastTime">{processTime(hour+4)}</div>
                    <div className="hourIcon"><i className={(hour+4 < 20 && hour+4 > 5) ? (day_icons[forecastData.hour4[1]]) : (night_icons[forecastData.hour4[1]])}></i></div>
                    <div className="temp">{forecastData.hour4[0].toFixed(1) + String.fromCharCode(176)}</div>
                </div>
                <div className="hour5 hour">
                    <div className="forecastTime">{processTime(hour+5)}</div>
                    <div className="hourIcon"><i className={(hour+5 < 20 && hour+5 > 5) ? (day_icons[forecastData.hour5[1]]) : (night_icons[forecastData.hour5[1]])}></i></div>
                    <div className="temp">{forecastData.hour5[0].toFixed(1) + String.fromCharCode(176)}</div>
                </div>
                <div className="hour6 hour">
                    <div className="forecastTime">{processTime(hour+6)}</div>
                    <div className="hourIcon"><i className={(hour+6 < 20 && hour+6 > 5) ? (day_icons[forecastData.hour6[1]]) : (night_icons[forecastData.hour6[1]])}></i></div>
                    <div className="temp">{forecastData.hour6[0].toFixed(1) + String.fromCharCode(176)}</div>
                </div>
            </div>
        </>
    )}

export default WeatherForecastApp;
