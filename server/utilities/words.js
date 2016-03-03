var fs = require('fs');
var path = require('path');

var positiveWords = {};
var negativeWords = {};

// It will take some time to read the two files, but once they are read, 
// they are stored on the server as objects (hashtables). Since it will 
// only be done once until the server is restarted, it's pretty safe to 
// assume this operation will be done before the client sending over the first GET request

fs.readFile(path.resolve(__dirname, '../words/positive-words.txt'), 'utf8', function (err, data) {
  if (err) {
    console.error('ERR reading positive-words', err);
  } else {
    var words = data.split('\n');
    for (var i = 0; i < words.length - 1; i++) {
      positiveWords[words[i]] = true;
    }
  }
});

fs.readFile(path.resolve(__dirname, '../words/negative-words.txt'), 'utf8', function (err, data) {
  if (err) {
    console.error('ERR reading negative-words', err);
  } else {
    var words = data.split('\n');
    for (var i = 0; i < words.length - 1; i++) {
      negativeWords[words[i]] = true;
    }
  }
});

module.exports.positiveWords = positiveWords;
module.exports.negativeWords = negativeWords;
