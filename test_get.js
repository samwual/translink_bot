var request = require("request");
var apiKey = require('./apikeys').apiKey;

rtti();

function rtti()
{
    var url = 'http://api.translink.ca/rttiapi/v1/status/all?apikey=' + apiKey;
    var response = sendJSONRequest(url);

    //dummy data
    var bus_data = {
        bus_stop: '59942',
        bus_route: '068'
    };
    var url = 'http://api.translink.ca/RTTIAPI/V1/stops/' + bus_data.bus_stop + '/estimates?routeNo=' + bus_data.bus_route + '&apiKey=' + apiKey; 
    var response = sendJSONRequest(url);
}

function sendJSONRequest(url)
{
    console.log('sending request ' + url);
    request(url, { json: true }, (err, res, body) => {
        if (err) { 
            return err;
        }
        
        console.log(body);
        return res;
        // var schedules = body[0]['Schedules'];
        // console.log(schedules);
    });
}