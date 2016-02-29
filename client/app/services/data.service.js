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
          tweet = {};
          tweet.text = tweets.data[i].text;
          tweet.createdAt = Date.parse(tweets.data[i].created_at);
          tweet.createdAtDisplay = tweet.createdAt.toString("h:mm tt MMM dd, yyyy");
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
