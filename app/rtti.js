var parser = require('../app/parser.js');
var request = require("request");
var apiKey = require('../resources/apikeys.js').apiKey;
var constants = require('../resources/constants.js');
var errors = require('../resources/errors.js');

exports.rtti = (bus_data) => 
{
    return new Promise ((res, rej) => {
        try {
            var parsed = parser.parse(bus_data);
            request(getURL(parsed), {json: true}, (err, resp, body) => {
                if (err) {
                    rej (err);
                } else res(body);
            });
        } catch (err) {
            rej(err);
        }
    });
}

function getURL(parsed)
{
    if (!apiKey) {
        throw new Error(errors.missing_apikey)
    }

    if (parsed.bus_stop == null || parsed.bus_route == null) {
        throw new Error(errors.cannot_find_data);
    }

    return 'http://api.translink.ca/RTTIAPI/V1/stops/' + parsed.bus_stop + '/estimates?routeNo=' + parsed.bus_route + '&apiKey=' + apiKey;
}