const constants = require("../config");
const request = require("request");

const getStrava = (callback) => {
  const headers = {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
  };

  const body = JSON.stringify({
    client_id: constants.Strava.STRAVA_CLIENT_ID,
    client_secret: constants.Strava.STRAVA_CLIENT_SECRET,
    refresh_token: constants.Strava.STRAVA_REFRESH_TOKEN,
    grant_type: "refresh_token",
  });

  request(
    {
      headers: headers,
      uri: "https://www.strava.com/oauth/token",
      body: body,
      method: "POST",
    },
    (error, { body }) => {
      if (error || body == undefined) {
        callback(`Can't fetch the data`, { undefined, undefined, undefined });
      } else {
        let jsonData = JSON.parse(body);
        console.log(jsonData);
        let url =
          "https://www.strava.com/api/v3/athletes/113568035/stats?access_token=" +
          jsonData.access_token;
        console.log(url);
        request({ url, json: true }, (error, { body }) => {
          if (error || body == undefined) {
            callback(`Can't fetch the data`, {
              undefined,
              undefined,
              undefined,
            });
          } else {
            //let myData = JSON.parse(body);
            let totalDist = (193700 + body.all_run_totals.distance) / 1000;
            let yearDist = body.ytd_run_totals.distance / 1000;
            console.log(totalDist);
            console.log(yearDist);
            callback(undefined, {
              total_distance: (193700 + body.all_run_totals.distance) / 1000,
              ytd_distance: body.ytd_run_totals.distance / 1000,
            });
          }
        });
      }
    }
  );
};

module.exports = { getStrava };
