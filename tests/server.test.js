describe('Tweetrep server', function () {
  var request = require('supertest');
  var app = require('../server/server.js');

  describe('API', function () {
    it('should send tweets for a GET request', function (done) {
      request(app)
      .get('/api/timeline/imdb')
      .expect(200, done);
    });
  });

});
