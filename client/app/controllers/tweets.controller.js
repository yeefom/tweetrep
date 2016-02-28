(function() {
    'use strict';

    angular
      .module('tweetrep')
      .controller('tweetsCtrl', tweetsCtrl);

    tweetsCtrl.$inject = ['$scope', 'dataService'];

    function tweetsCtrl($scope, dataService) {
      $scope.tweets = {};

      $scope.getTweets = function (screenName) {
        dataService.getTweets(screenName)
        .then(function (tweets) {
          $scope.tweets.data = tweets;
        });
      };
    }
})();
