var util = require('../utilities/utilities.js');

module.exports = function (app) {
  app.get('/api/timeline/:name', function(req, res){
    util.getTweets(req.params.name)
    .then(function (tweets) {
      var parsedTweets = util.parseTweets(tweets);
      res.status(200).send(parsedTweets);
    })
    .catch(function (error) {
      console.error('ERR in utilities: ', error);
      res.status(404).send('ERROR GETTING TWEETS');
    });
  });
};
