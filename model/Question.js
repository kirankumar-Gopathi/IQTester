/**************************
 * Question Model
 **************************/
App.Question = Ember.Object.extend({
  question:null,
  type:null,
  options:null,
  answer:null,
  userAnswer:null,
  weight:null,
  imageURL:null,
  isFillIn:function () {
    return Ember.isEqual(this.get('type'), "fillin");
  }.property('type'),
  isAnswerCorrect:function () {
    var answer = this.get('answer');
    var userAnswer = this.get('userAnswer');
    return (answer && userAnswer && isNaN(answer)) ? Ember.isEqual(userAnswer.toLowerCase(), answer.toLowerCase()) : Ember.isEqual(userAnswer, answer);
  }.property('userAnswer')
});