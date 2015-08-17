var triviaController = require('./triviaController.js');
var unirest = require('unirest');

var cleanAnswer = function(answer) {
  return answer.replace(/<\/?i>/g, '');
};

module.exports = function(app){
  app.post('/', triviaController.checkAnswer);
  app.get('/', function(req, res) {
    unirest.get("http://jservice.io/api/random?count=100") // changed to 100
    .header("Accept", "application/json")
    .end(function (result) {
      triviaController.addQuestion(result);
      for(var i = 0; i < result.body.length; i++){
        result.body[i].clue = triviaController.getClue(cleanAnswer(result.body[i].answer));
        delete result.body[i].answer;
      }
      res.send(result.body);
    });
  });

};