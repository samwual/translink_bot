var errors = require('../resources/errors.js');
var regex = /\d{5}\s{1}\d{1,3}/; 

exports.parse = (data) => {
    //parse tweet to get the bus_stop and bus_route and return as a object 
    var regexed = regex.exec(data);
    if (!regexed) {
        throw new Error(errors.cannot_find_data);
    }

    var bus_data_array = regexed[0].split(' ');
    
    return {
        bus_stop: bus_data_array[0],
        bus_route: bus_data_array[1]
    };
}