var client = require('../config/twitter-config.js');
var Promise = require('bluebird');
var moment = require('moment');
var words = require('./words.js');

var getTweets = function (screenName) {
  return new Promise(function (resolve, reject) {
    var params = {screen_name: screenName};
    client.get('statuses/user_timeline', params, function(error, tweets, response){
      if (error) {
        reject(error);
      } else {
        console.log(tweets);
        resolve(tweets);
      }
    });
  });
};

var parseTweets = function (tweets) {
  var parsed = [];
  var tweet;
  var text = '';
  for (var i = 0; i < tweets.length; i++) {
    tweet = {};
    tweet.text = tweets[i].text;
    text += tweet.text;
    text += ' ';
    tweet.createdAt = new Date(tweets[i].created_at.replace(/^\w+ (\w+) (\d+) ([\d:]+) \+0000 (\d+)$/,"$1 $2 $4 $3 UTC"));
    tweet.createdAtDisplay = moment(tweet.createdAt).format('MMM D, YYYY, h:mm:ss a');
    tweet.retweetCount = tweets[i].retweet_count;
    tweet.favCount = tweets[i].favorite_count;
    tweet.media = tweets[i].entities.media !== undefined ? tweets[i].entities.media[0].media_url : null;
    parsed.push(tweet);
  }
  var repScore = computeScore(text);
  return {tweets: parsed, repScore: repScore};
};

var computeScore = function (text) {
  // remove urls, credit: http://stackoverflow.com/a/17773849/5133718
  text = text.replace(/(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/g, "");
  // replace symblos (,.!?"') with space
  text = text.replace(/[:,\.\!\?"']/g, " ");
  // remove @username
  text = text.replace(/@\w+(?=\s)/g, ''); 
  // remove hashtag symbol
  text = text.replace(/#/g, "");
  wordsArr = text.split(/\s+/);
};

module.exports.getTweets = getTweets;
module.exports.parseTweets = parseTweets;
