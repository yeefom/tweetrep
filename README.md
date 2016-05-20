## Tweetrep

### Overview

Tweetrep is just another fun tool to calculate a Twitter user's "reputation score".

### Features

- Fetch and display a user's recent timeline
- Sort tweets by date or retweet counts
- Filter tweets by image
- Click on thumbnails to show original image

### Usage

The deployed app can be accessed [here](http://tweetrep.herokuapp.com).

To run Tweetrep locally, please first install dependencies by running `npm install`, and then simply use `npm start` to start the server. The local address is [localhost:8080](localhost:8080).

### Testing

Use `npm test` to run all tests.

Or use `npm run test-client` to run client side tests and `npm run test-server` to run server side tests separately.

Client side tests are built with Karma, Mocha, and Chai. Server side tests were are with Mocha and Chai.

### Twitter authentication config

Duplicate config/twitter-config-template, rename as twitter-config, and fill in the developer keys.

### Reputation score

The reputation score is on a scale of 1–100. It consists of follower score, retweet score, and content score. The more followers a user has the more retweets the user needs to have a higher retweet score. Since the API only returns the most 20 tweets of a user, the chance of a user use a word from either positive words or negative words list is not that high. Therefore I decided to make the content score behave like a bonus.
