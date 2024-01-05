const request = require('request');
const constants = require('./config');

const weatherData = (callback) => {
    const url = constants.OpenWeatherMap.BASE_URL + `weather?lat=` + constants.Area.LATITUDE + `&lon=`+constants.Area.LONGITUDE + `&appid=` + constants.OpenWeatherMap.SECRET_KEY + `&units=` + constants.OpenWeatherMap.UNITS;
    console.log(url);
    request({url, json:true},(error, {body}) =>{
        console.log(body)
        if (error || body == undefined){
            callback(`Can't fetch the data`,  {undefined,undefined,undefined,undefined,undefined});
        }
        else{
            callback(undefined, {
                temperature: body.main.temp,
                description: body.weather[0].description,
                humidity:body.main.humidity,
                icon:"i"+body.weather[0].icon.slice(0,-1),
                windSpeed: body.wind.speed
            });
        }
    });
}

const weatherForecast = (callback) => {
    const url = constants.OpenWeatherMap.BASE_URL + `onecall?lat=` + constants.Area.LATITUDE + `&lon=`+constants.Area.LONGITUDE + `&appid=` + constants.OpenWeatherMap.SECRET_KEY + `&units=` + constants.OpenWeatherMap.UNITS + `&exclude=` + constants.OpenWeatherMap.EXCLUDE;
    console.log(url);
    request({url, json:true},(error, {body}) =>{
        //console.log(body)
        if (error || body == undefined){
            callback(`Can't fetch the data`, {undefined,undefined,undefined,undefined,undefined,undefined});
        } else if (body.cod == 429){
            callback(`API limit reached`, {undefined,undefined,undefined,undefined,undefined,undefined});
        } else{
            callback(undefined, {
                hour1:[body.hourly[0].temp,"i"+body.hourly[0].weather[0].icon.slice(0,-1)],
                hour2:[body.hourly[1].temp,"i"+body.hourly[1].weather[0].icon.slice(0,-1)],
                hour3:[body.hourly[2].temp,"i"+body.hourly[2].weather[0].icon.slice(0,-1)],
                hour4:[body.hourly[3].temp,"i"+body.hourly[3].weather[0].icon.slice(0,-1)],
                hour5:[body.hourly[4].temp,"i"+body.hourly[4].weather[0].icon.slice(0,-1)],
                hour6:[body.hourly[5].temp,"i"+body.hourly[5].weather[0].icon.slice(0,-1)]
            });
        }
    });

}

module.exports = {weatherData, weatherForecast};