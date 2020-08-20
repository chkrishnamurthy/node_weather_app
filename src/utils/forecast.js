const request = require("request");

const forecast = (lat, lon, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=8cf78b463a4dccfca6ef49cda44bf3a0&query=${lat},${lon}`;
  // &units=f
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to conect to location services..!", undefined);
    } else if (body.error) {
      callback("Unable to find the location.Try another search", undefined);
    } else {
      console.log(
        body.current.weather_descriptions[0] +
          " It is currently " +
          body.current.temperature +
          " degress out."
      );

      callback(undefined, {
        forecastData:
          body.current.weather_descriptions[0] +
          " It is currently " +
          body.current.temperature +
          " degress out.",
      });
    }
  });
};

module.exports = forecast;
