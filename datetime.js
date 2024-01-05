const constants = require("./config");

const getDatetime = (callback) =>{
    let now = new Date()
    const date = now.toLocaleDateString(constants.Preferences.TIMEFORMAT, {timeZone: constants.Area.TIMEZONE, dateStyle:'full'}).slice(0,-5);
    var time = now.toLocaleTimeString(constants.Preferences.TIMEFORMAT, {timeZone: constants.Area.TIMEZONE, timeStyle: 'short'});
    var hours = parseInt(time.substring(0,2));
    hours = ((hours-1) % 12) + 1
    time = hours + time.substring(2,5)
    callback(undefined, {
        date: date,
        time: time
    });
};

module.exports = {getDatetime};