import './App.css';
import WeatherApp from './WeatherApp';
import WeatherForecastApp from './WeatherForecastApp';
import DatetimeApp from './datetime';
import ComplimentsApp from './Compliments';
import StravaApp from './Strava';
import PortfolioTotalApp from './portfolioTotal';
import React, {useEffect, useState} from "react";
import ReactDOM from 'react-dom';


function App() {
  const [weatherData, setWeatherdata] = useState([]);
  const [forecastData, setForecastdata] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [compliment, setCompliment] = useState("");
  const [stravaData, setStravadata] = useState([]);
  const [portfolioTotal, setPortfolioTotal] = useState("");
  const [portfolioChange, setPortfolioChange] = useState("");
  const [portfolioHistory, setPortfolioHistory] = useState([]);

  const baseURL = "http://localhost:3080"

  const hour = new Date().getHours();

  useEffect(() => {
    const fetchCompliment = async () => {
      const complimentURL = baseURL + "/compliment"

      await fetch(complimentURL)
      .then(res => res.json())
      .then(result => {
        setCompliment(result.compliment);
      });
    }
    const interval = setInterval(() => {fetchCompliment()}, 30000);
    return() => clearInterval(interval)

  }, []);

  useEffect(() => {
      const fetchWeatherData = async () => {
          const weatherURL = baseURL+"/weather"

          await fetch(weatherURL)
          .then(res => res.json())
          .then(result => {
            setWeatherdata(result);
            //console.log(result);
          });
      }

      const interval = setInterval(() => {fetchWeatherData()}, 60000);
      return() => clearInterval(interval)
  }, []);

  useEffect(() => {
    
    const fetchForecastData = async () => { 
      const forecastURL = baseURL+"/weatherforecast"

        await fetch(forecastURL)
        .then(res => res.json())
        .then(result => {
        setForecastdata(result);
        //console.log(result);
        });
    }
    const interval = setInterval(() => {fetchForecastData()}, 90000);
    return() => clearInterval(interval)
}, []);

useEffect(() => {
  const fetchDatetime = async () => {
    const datetimeURL = baseURL + "/datetime"

    await fetch(datetimeURL)
    .then(res => res.json())
    .then(result => {
      setDate(result.date);
      setTime(result.time);
    });
  }
  const interval = setInterval(() => {fetchDatetime()}, 1000);
  return() => clearInterval(interval)
}, [])

useEffect(() => {
  const fetchStravaData = async () => { 
    const stravaURL = baseURL+"/strava"

      await fetch(stravaURL)
      .then(res => res.json())
      .then(result => {
      setStravadata(result);
      //console.log(result);
      });
  }
  const interval = setInterval(() => {fetchStravaData()}, 60000);
  return() => clearInterval(interval)
}, []);

useEffect(() => {
  const fetchPortfolioData = async () => { 
    const portfolioURL = baseURL+"/finances"

      await fetch(portfolioURL)
      .then(res => res.json())
      .then(result => {
        setPortfolioTotal(result.mostRecent);
        setPortfolioChange(result.change);
        setPortfolioHistory(result.portfolio);
      //console.log(result);
      });
  }
  const interval = setInterval(() => {fetchPortfolioData()}, 60000);
  return() => clearInterval(interval)
}, []);

  //console.log(weatherData);
  //console.log(forecastData);
  //console.log(compliment);
  //console.log(stravaData);

  return (
    <div className="App">
      <div className="top-align">
        <div className="left-align">
          {(!(Array.isArray(weatherData)) && !(weatherData.error)) ? (
            <WeatherApp weatherData={weatherData} hour={hour}/>
          ): (
            <div></div>
          )}

          {(!(Array.isArray(weatherData)) && !(Array.isArray(forecastData)) && !(weatherData.error) && !(forecastData.error)) ? (
            <WeatherForecastApp hour={hour} forecastData={forecastData}/>
          ): (
            <div></div>
          )}
        </div>
        <div className="center-align">
          <PortfolioTotalApp mostRecent={portfolioTotal} change={portfolioChange}/>
        </div>
        <div className="right-align">
          <DatetimeApp date={date} time={time}/>
        </div>
      </div>
      <div className="top-middle-align"></div>
      <div className="bottom-middle-align">
        {(compliment.length !== 0) ? (
          <ComplimentsApp compliment={compliment}/>
        ) : (
          <div></div>
        )}
      </div>
      <div className="bottom-left-align">
          {(!(Array.isArray(stravaData)) && !(stravaData.error)) ? (
              <StravaApp stravaData={stravaData}/>
            ): (
              <div></div>
            )}
      </div>
    </div>
  );
}

export default App;
