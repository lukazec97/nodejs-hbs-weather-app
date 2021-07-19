const request = require('request');
const env = require('dotenv').config();
const ACCESS_TOKEN = process.env.GEO_CODE_TOKEN;

const geoCode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${ACCESS_TOKEN}&limit=1`;
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to a geocoding service!", undefined);
            console.log(error.message);
        } else if (body.features.length === 0) {
            callback("Unable to find location. Try another search.", undefined);
        }
        else {
            callback(null, {
                location: body?.features[0]?.place_name,
                latitude: body?.features[0]?.center[1],
                longitude: body?.features[0]?.center[0]
            });
        }
    });
}
module.exports = { geoCode };