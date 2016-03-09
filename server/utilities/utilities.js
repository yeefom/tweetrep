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
        resolve(tweets);
      }
    });
  });
};

var parseTweets = function (tweets) {
  var parsed = [];
  var tweet;
  var text = '';
  var retweets = 0;
  for (var i = 0; i < tweets.length; i++) {
    tweet = {};
    tweet.text = tweets[i].text;
    text += tweet.text;
    text += ' ';
    tweet.createdAt = new Date(tweets[i].created_at.replace(/^\w+ (\w+) (\d+) ([\d:]+) \+0000 (\d+)$/,"$1 $2 $4 $3 UTC"));
    tweet.createdAtDisplay = moment(tweet.createdAt).format('MMM D, YYYY, h:mm:ss a');
    tweet.retweetCount = tweets[i].retweet_count;
    // only count original tweets
    if (tweet.text.slice(0, 4) !== 'RT @') {
      retweets += tweet.retweetCount;
    }
    tweet.favCount = tweets[i].favorite_count;
    tweet.media = tweets[i].entities.media !== undefined ? tweets[i].entities.media[0].media_url : null;
    parsed.push(tweet);
  }
  var profile = {
    screenName: tweets[0].user.screen_name,
    name: tweets[0].user.name,
    followers: tweets[0].user.followers_count,
    following: tweets[0].user.friends_count,
    repScore: computeScore(text, tweets[0].user.followers_count, retweets)
  };
  return {tweets: parsed, profile: profile};
};

var computeScore = function (text, followers, retweets) {
  // remove urls, credit: http://stackoverflow.com/a/17773849/5133718
  text = text.replace(/(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/g, "");
  // replace symblos (,.!?"') with space
  text = text.replace(/[:,\.\!\?"']/g, " ");
  // remove @username
  text = text.replace(/@\w+(?=\s)/g, '');
  // remove hashtag symbol
  text = text.replace(/#/g, "");
  wordsArr = text.split(/\s+/);
  var contentScore = 0;
  for (var i = 0; i < wordsArr; i++) {
    if (words.positiveWords[wordsArr[i]]) {
      contentScore++;
    }
    if (words.negativeWords[wordsArr[i]]) {
      contentScore--;
    }
  }
  // Please refer to README for more details about the score
  /**
   *    0 ~   100 =   100
   *  101 ~  1000 =  1000
   * 1001 ~ 10000 = 10000
   * etc.
   */
  var base = Math.max(1000000, Math.pow(10, (followers-1).toString().length));
  var repScore = Math.ceil(Math.min(1, followers/100000) * 43 + Math.min(1, retweets/base) * 43 + contentScore);
  return Math.min(100, repScore);
};

module.exports.getTweets = getTweets;
module.exports.parseTweets = parseTweets;
