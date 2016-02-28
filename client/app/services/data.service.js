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

      return {
        getTweets: getTweets
      };
    }
})();
