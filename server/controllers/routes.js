var util = require('../utilities/utilities.js');

module.exports = function (app) {
  app.get('/api/timeline/:name', function(req, res){
    util.getTweets(req.params.name)
    .then(function (data) {
      console.log('tweet', data.tweets);
      console.log('res', data.responses);
      res.status(200).send(data.tweets);
    })
    .catch(function (err) {
      console.error('ERR in utilities: ', error);
      res.status(404).send('Getting tweets error');
    });
  });
};
