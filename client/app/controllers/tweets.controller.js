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
          $scope.tweets.data = dataService.parseData(tweets);
        });
      };

      $scope.sort = '-createdAt';

      $scope.sortByDate = function () {
        $scope.sort = '-createdAt';
      };

      $scope.sortByRetweet = function () {
        $scope.sort = '-retweetCount';
      };

      $scope.show = {};
      $scope.show.value = true;

      $scope.picOnly = function () {
        $scope.show.value = false;
      };

      $scope.all = function () {
        $scope.show.value = true;
      };
    }
})();
