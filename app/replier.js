const regex = /\d{1,2}:\d{1,2}(a|p)m/;

exports.reply = (username, data, error = false) =>
{
    return new Promise ((res, rej) => {
        let tweet = '@' + username + ' unfortunately we are unable to process this request';
        if (!error) {
            tweet = write(username, data['Schedules']);
        } 
        T.post('statuses/update', tweet, (err, resp, body) => {
            if (err) {
                rej (err);
            } else res (body);
        });
    });
}

function write(username, schedules)
{
    let tweet = ['@', username];
    for (var key in schedules) {
        tweet.push(format(schedules[key]));
    }
    tweet.join('');
    return tweet;
}

function format(data)
{
    var regexed = regex.exec(data['ExpectedLeaveTime']);
    return regexed[0];
}