var client = require('../config/twitter-config.js');

var getTweets = function (params) {
  client.get('statuses/user_timeline', params, function(error, tweets, response){
    if (error) {
      console.log('ERR in utilities: ', error);
    } else {
      console.log('tweet', tweets);
      console.log('res', responses);
    }
  });
};

module.exports = getTweets;
