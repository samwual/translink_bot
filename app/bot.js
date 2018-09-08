var Twit = require('twit');
var config = require('../resources/config.js');
var RTTI = require('../app/rtti.js');
var Replier = require('../app/replier.js');

var T = new Twit(config);
T.stream('user').on('tweet', start()); //we wait

function start(data)
{
    //parse tweet and get bus data
    RTTI.rtti(data.source.text).then(result => {
        //reply to user with bus data
        Replier.reply(data.source.screen_name, result[0]);
    }, err => {
        //make a error tweet
        Replier.reply(data.source.screen_name, err, true);
    });
}