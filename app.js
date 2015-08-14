var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var apiKey = require('./server/api-config').apiKey;
var app = express();

require('./server/config/middleware.js')(app, express);

mongoURI = process.env.CUSTOMCONNSTR_MONGOLAB_URI || 'mongodb://localhost/TriviaWithFriends';

mongoose.connect(mongoURI);


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('db success');
});


// only run server if app.js was run directly (rather than being
// imported as a module)
if (!module.parent) {
  var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('App listening at http://%s:%s', host, port);
  });
}

//the first trivia api, the returned questions are pretty bad, only virtue is multiple choice
//not using this one atm.
// app.get('/api/questions', function(req, res) {
//   unirest.get("https://pareshchouhan-trivia-v1.p.mashape.com/v1/getRandomQuestion")
//   .header("X-Mashape-Key", apiKey)
//   .header("Accept", "application/json")
//   .end(function (result) {
//     res.send(result.body);
//   });
// });


//alternate api (better imo)
//includes a point value for each question which
// app.get('/api/trivia', function(req, res) {
//   unirest.get("http://jservice.io/api/random?count=10")
//   .header("Accept", "application/json")
//   .end(function (result) {
//     console.log(result.body);
//     res.send(result.body);
//   });
// });

// //alternate api categories request
// app.get('/api/trivia-categories', function(req, res) {
//   unirest.get("http://jservice.io/api/categories?count=10")
//   .header("Accept", "application/json")
//   .end(function (result) {
//     res.send(result.body);
//   });
// });

module.exports = app;






