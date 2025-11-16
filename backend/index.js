const express = require("express");
const req = require("express/lib/request");
const weather = require("./endpoints/weatherData");
const compliments = require("./endpoints/compliments");
const hbs = require("hbs");
const path = require("path");
const constants = require("./config");
const datetime = require("./endpoints/datetime");
const cors = require("cors");
const strava = require("./endpoints/strava");

const app = express();

const port = process.env.PORT || 3080;

const publicStaticDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");

app.set("view engine", "hbs");
app.set("views", viewsPath);

app.use(cors());
app.use(express.static(publicStaticDirPath));

app.get("/", (req, res) => {
  res.render("index", {
    title: "MyMirror",
    city: constants.Area.CITY,
  });
});

app.get("/weather", (req, res) => {
  weather.weatherData(
    (error, { temperature, description, humidity, icon, windSpeed }) => {
      if (error) {
        return res.send({ error });
      }
      console.log(temperature, description, windSpeed, humidity, icon);
      res.send({
        temperature,
        description,
        humidity,
        icon,
        windSpeed,
      });
    }
  );
});

app.get("/weatherForecast", (req, res) => {
  weather.weatherForecast(
    (error, { hour1, hour2, hour3, hour4, hour5, hour6 }) => {
      console.log(error, { hour1, hour2, hour3, hour4, hour5, hour6 });
      if (error) {
        return res.send({ error });
      }
      console.log(hour1, hour2, hour3, hour4, hour5, hour6);
      res.send({
        hour1,
        hour2,
        hour3,
        hour4,
        hour5,
        hour6,
      });
    }
  );
});

app.get("/datetime", (req, res) => {
  datetime.getDatetime((error, { date, time }) => {
    if (error) {
      console.log("ERROR OCCURED GETTING DATETIME");
    } else {
      //console.log(date, time)
      res.send({
        date,
        time,
      });
    }
  });
});

app.get("/compliment", (req, res) => {
  compliments.getCompliment((error, { compliment }) => {
    if (error) {
      console.log("COMPLIMENT ERROR");
    } else {
      res.send({ compliment });
    }
  });
});

app.get("/strava", (req, res) => {
  strava.getStrava((error, { total_distance, ytd_distance }) => {
    if (error) {
      console.log("STRAVA ERROR");
    } else {
      res.send({
        total_distance,
        ytd_distance,
      });
    }
  });
});

app.listen(port, () => {
  console.log("Server is up and running");
});
