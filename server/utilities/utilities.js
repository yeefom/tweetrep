var client = require('../config/twitter-config.js');
var Promise = require('bluebird');
var moment = require('moment');

var getTweets = function (screenName) {
  return new Promise(function (resolve, reject) {
    var params = {screen_name: screenName};
    client.get('statuses/user_timeline', params, function(error, tweets, response){
      if (error) {
        reject(error);
      } else {
        resolve(tweets);
      }
    });
  });
};

var parseTweets = function (tweets) {
  var parsed = [];
  var tweet;

  for (var i = 0; i < tweets.length; i++) {
    tweet = {};
    tweet.text = tweets[i].text;
    tweet.createdAt = new Date(tweets[i].created_at.replace(/^\w+ (\w+) (\d+) ([\d:]+) \+0000 (\d+)$/,"$1 $2 $4 $3 UTC"));
    tweet.createdAtDisplay = moment(tweet.createdAt).format('MMM D, YYYY, h:mm:ss a');
    tweet.retweetCount = tweets[i].retweet_count;
    tweet.favCount = tweets[i].favorite_count;
    tweet.media = tweets[i].entities.media !== undefined ? tweets[i].entities.media[0].media_url : null;
    parsed.push(tweet);
  }

  return parsed;
};

module.exports.getTweets = getTweets;
module.exports.parseTweets = parseTweets;
