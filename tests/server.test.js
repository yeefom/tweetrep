describe('Tweetrep server', function () {
  var request = require('supertest');
  var app = require('../server/server.js');
  var util = require('../server/utilities/utilities.js');

  describe('API', function () {
    it('should send tweets for a GET request', function (done) {
      request(app)
      .get('/api/timeline/imdb')
      .expect(200, done);
    });
  });

  describe('utilities', function () {
    it('should get tweets from Twitter API', function () {
      util
      .getTweets("imdb")
      .then(function (tweets) {
        expect(tweets.length).to.eql(20);
      });
    });

    it('should parse raw tweets', function () {
      util
      .getTweets("imdb")
      .then(function (tweets) {
        var parsed = util.parseTweets(tweets);
        expect(parsed[0].profile.repScore).to.be.above(0);
      });

    });
  });

});
