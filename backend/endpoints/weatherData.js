const request = require("request");
const constants = require("../config");

const weatherData = (callback) => {
  const url =
    constants.OpenWeatherMap.BASE_URL +
    `weather?lat=` +
    constants.Area.LATITUDE +
    `&lon=` +
    constants.Area.LONGITUDE +
    `&appid=` +
    constants.OpenWeatherMap.SECRET_KEY +
    `&units=` +
    constants.OpenWeatherMap.UNITS;
  console.log(url);
  request({ url, json: true }, (error, { body }) => {
    console.log(body);
    if (error || body == undefined) {
      callback(`Can't fetch the data`, {
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      });
    } else {
      callback(undefined, {
        temperature: body.main.temp,
        description: body.weather[0].description,
        humidity: body.main.humidity,
        icon: "i" + body.weather[0].icon.slice(0, -1),
        windSpeed: body.wind.speed,
      });
    }
  });
};

const weatherForecast = (callback) => {
  const url =
    constants.OpenWeatherMap.BASE_URL +
    `forecast?lat=` +
    constants.Area.LATITUDE +
    `&lon=` +
    constants.Area.LONGITUDE +
    `&appid=` +
    constants.OpenWeatherMap.SECRET_KEY +
    `&units=` +
    constants.OpenWeatherMap.UNITS +
    `&exclude=` +
    constants.OpenWeatherMap.EXCLUDE +
    `&cnt=6`;
  console.log(url);
  request({ url, json: true }, (error, { body }) => {
    //console.log(body)
    if (error || body == undefined) {
      callback(`Can't fetch the data`, {
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      });
    } else if ((body.cod == 429) | (body.cod == 401)) {
      callback(`API error`, {
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      });
    } else {
      console.log(body);
      callback(undefined, {
        hour1: [
          body.list[0].main.temp,
          "i" + body.list[0].weather[0].icon.slice(0, -1),
          +new Date(body.list[0].dt * 1000).toLocaleString("en-US", {
            timeZone: "Pacific/Auckland",
            hour: "2-digit",
            hour12: false,
          }),
        ],
        hour2: [
          body.list[1].main.temp,
          "i" + body.list[1].weather[0].icon.slice(0, -1),
          +new Date(body.list[1].dt * 1000).toLocaleString("en-US", {
            timeZone: "Pacific/Auckland",
            hour: "2-digit",
            hour12: false,
          }),
          ,
        ],
        hour3: [
          body.list[2].main.temp,
          "i" + body.list[2].weather[0].icon.slice(0, -1),
          +new Date(body.list[2].dt * 1000).toLocaleString("en-US", {
            timeZone: "Pacific/Auckland",
            hour: "2-digit",
            hour12: false,
          }),
          ,
        ],
        hour4: [
          body.list[3].main.temp,
          "i" + body.list[3].weather[0].icon.slice(0, -1),
          +new Date(body.list[3].dt * 1000).toLocaleString("en-US", {
            timeZone: "Pacific/Auckland",
            hour: "2-digit",
            hour12: false,
          }),
          ,
        ],
        hour5: [
          body.list[4].main.temp,
          "i" + body.list[4].weather[0].icon.slice(0, -1),
          +new Date(body.list[4].dt * 1000).toLocaleString("en-US", {
            timeZone: "Pacific/Auckland",
            hour: "2-digit",
            hour12: false,
          }),
          ,
        ],
        hour6: [
          body.list[5].main.temp,
          "i" + body.list[5].weather[0].icon.slice(0, -1),
          +new Date(body.list[5].dt * 1000).toLocaleString("en-US", {
            timeZone: "Pacific/Auckland",
            hour: "2-digit",
            hour12: false,
          }),
          ,
        ],
      });
    }
  });
};

module.exports = { weatherData, weatherForecast };
