var triviaController = require('./triviaController.js');
var unirest = require('unirest');

module.exports = function(app){
  app.post('/', triviaController.checkAnswer);
  app.get('/', function(req, res) {
    unirest.get("http://jservice.io/api/random?count=10")
    .header("Accept", "application/json")
    .end(function (result) {
      triviaController.addQuestion(result);
      res.send(result.body);
    });
  });


////////////////nothing is using this at the moment

  // app.get('/trivia-categories', function(req, res) {
  //   unirest.get("http://jservice.io/api/categories?count=10")
  //   .header("Accept", "application/json")
  //   .end(function (result) {
  //     res.send(result.body);
  //   });
  // });
};