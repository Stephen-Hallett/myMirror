const constants = require("./config");
const fs = require('fs');
const os = require('os');
var request = require('request');

const getCalories = (callback) => {
    let path;

    if (os.platform() === "darwin") {
        path = "/Users/stephen/myMirror/calorieHistory.csv";
    } else {
        path = "/home/pi/mymirror_v1/calorieHistory.csv";
    }

    var dataOptions = {
        'method': 'GET',
        'url': 'http://calorietracker.glitch.me/getData',
        'headers': {
        'Content-Type': 'application/json',
        'User-Agent': 'myMirror/1.0'
        },
        'followRedirect': true,
        body: JSON.stringify({
        "password": constants.calories.PASSWORD
        })
    };

    request(dataOptions, function (error, response, body) {
        if (error) throw new Error(error);
        if (response.statusCode === 200) {
            fs.writeFileSync(path, body);
            console.log('File saved successfully.');
        } else {
            console.error('Error:', response.statusCode, response.statusMessage);
        }
    });

    var dailyOptions = {
        'method': 'GET',
        'url': 'http://calorietracker.glitch.me/dailyTotal',
        'headers': {
          'Content-Type': 'application/json',
          'User-Agent': 'myMirror/1.0'
        },
        json: true
      };
      request(dailyOptions, function (error, response) {
        if (error) throw new Error(error);
        callback(undefined, {
            calories: response.body.kcal
        });
      });
}

module.exports = {getCalories};