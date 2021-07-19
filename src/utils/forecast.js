const request = require('request');
const env = require('dotenv').config();
const api_key = process.env.API_ACCESS_KEY;
const basePath = "http://api.weatherstack.com";

const forecast = (lat,lon, callback) => {
    request({ url: `${basePath}/current?access_key=${api_key}&query=${lat + ',' +lon}&units=m`, json: true }, (error, response) => {
        if (error) {
            callback("Unable to connect to weather service!", null);
        }
        else if (response?.body?.error) {
            console.log(response.body.error,'err u body');
            callback("Unable to find location.",null);
        } else {
            callback(null, `${response.body.current.weather_descriptions[0]}. It's currently ${response.body.current?.temperature} ℃  out. It feels like ${response.body.current?.feelslike} ℃`);
        }
    })
};

module.exports = { forecast };