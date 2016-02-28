(function() {
    'use strict';

    angular.module('tweetrep', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider
      .when('/', {
        templateUrl: './app/templates/tweets.html',
        controller: 'tweetsCtrl'
      });
    }]);
})();
