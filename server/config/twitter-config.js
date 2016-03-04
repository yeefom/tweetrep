var Twitter = require('twitter');
 
var client = new Twitter({
  consumer_key: process.env.consumer_key || 'Of6hnDOUst5yN88YAIuD7zWHl',
  consumer_secret: process.env.consumer_secret || '8swzIDYb0TA94xZp9q3W0bZmSONiPp68Ui6Oz42yuf7RVDhDeh',
  access_token_key: process.env.access_token_key || '470838416-xCC839iEoEzdKqXUGWRaQezCNFxCTHtgfsNxQFIG',
  access_token_secret: process.env.access_token_secret || 'NhAvRZOIIzTsMGDmLsnIXlO8b6kkKN00RgqXoQyDfAm30'
});

module.exports = client;
