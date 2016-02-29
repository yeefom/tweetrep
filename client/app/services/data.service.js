(function() {
    'use strict';

    angular
      .module('tweetrep')
      .service('dataService', dataService);

    dataService.$inject = ['$http'];

    function dataService($http) {
      var getTweets = function (screenName) {
        return $http({
          method: 'GET',
          url: '/api/timeline/' + screenName
        });
      };

      var parseData = function (tweets) {
        var parsed = [];
        var tweet;

        for (var i = 0; i < tweets.data.length; i++) {
          console.log(tweets.data[i]);
          tweet = {};
          tweet.text = tweets.data[i].text;
          tweet.createdAt = new Date(tweets.data[i].created_at.replace(/^\w+ (\w+) (\d+) ([\d:]+) \+0000 (\d+)$/,"$1 $2 $4 $3 UTC"));
          tweet.createdAtDisplay = moment(tweet.createdAt).startOf('day').fromNow();
          tweet.retweetCount = tweets.data[i].retweet_count;
          tweet.favCount = tweets.data[i].favorite_count;
          tweet.media = tweets.data[i].media || null;
          parsed.push(tweet);
        }

        return parsed;
      };

      return {
        getTweets: getTweets,
        parseData: parseData
      };
    }
})();
