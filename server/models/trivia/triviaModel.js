var mongoose = require('mongoose');

var TriviaSchema = new mongoose.Schema({
  id: Number,
  answer: String
});

module.exports = mongoose.model('Trivia', TriviaSchema);