const request = require("request");

const geocode = (address, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=8cf78b463a4dccfca6ef49cda44bf3a0&query=${address}&units=f`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to conect to location services..!", undefined);
    } else if (body.error) {
      callback("Unable to find the location.Try another search", undefined);
    } else {
      callback(undefined, {
        latitude: body.location.lat,
        longitude: body.location.lon,
        location: body.location.name,
      });
    }
  });
};

module.exports = geocode;
