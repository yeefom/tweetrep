var client = require('../config/twitter-config.js');
var Promise = require('bluebird');

var getTweets = function (screenName) {
  return new Promise(function (resolve, reject) {
    var params = {screen_name: screenName};
    client.get('statuses/user_timeline', params, function(error, tweets, response){
      if (error) {
        reject(error);
      } else {
        var data = {tweets: tweets, responses: responses};
        resolve(data);
      }
    });
  });
};

module.exports = getTweets;
