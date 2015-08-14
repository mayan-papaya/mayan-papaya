var Trivia = require('./triviaModel.js');
var Q = require('q');

module.exports = {
  checkAnswer: function(req, res){
    var id = req.body.id;
    var answer = req.body.answer;
    var findQuestion = Q.nbind(Trivia.findOne, Trivia);
    findQuestion({id: id})
    .then(function(question){
      if(question.answer === answer){
        console.log('correct');
      }else{
        console.log('incorrect');
      }
    });
  },

  addQuestion: function(result){
    var questions = result.body;
    for(var i = 0; i < questions.length; i++){
      var answer = questions[i].answer;
      var id = questions[i].id;
      var create, newQuestion;

      var findOne = Q.bind(Trivia.findOne, Trivia);

      findOne({id: id})
        .then(function(question){
          if(!question){
            create = Q.bind(Trivia.create, Trivia);
            newQuestion = {
              id : id, 
              answer: answer
            };
          }
          console.log('success');
          create(id);
        });

    }
  }

};