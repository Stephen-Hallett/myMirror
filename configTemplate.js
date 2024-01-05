const { find } = require("geo-tz");

var constants = {
    OpenWeatherMap:{
        BASE_URL: "http://api.openweathermap.org/data/2.5/",
        SECRET_KEY: "******************************",
        UNITS:"metric",
        EXCLUDE:"daily,minutely,alerts"
    },
    Area:{
        CITY:"Auckland",
        LATITUDE: "-36.869612956893384",
        LONGITUDE: "174.6335744504421",
    },
    Preferences:{
        TIMEFORMAT: "en-GB"
    },
    Strava:{
        STRAVA_CLIENT_ID:"******",
        STRAVA_CLIENT_SECRET:"******************************",
        STRAVA_REFRESH_TOKEN:"******************************",
    }
}

constants.Area.TIMEZONE = find(constants.Area.LATITUDE,constants.Area.LONGITUDE);

module.exports = constants;
