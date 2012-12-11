/**************************
* Question Model
**************************/
App.Question = Ember.Object.extend({
  question: null,
  type: null,
  options: null,
  answer: null,
  userAnswer: null,
  weight: null,
  imageURL: null,
  isVisible: false,
  isFillIn: function() {
      return Ember.isEqual(this.get('type'),"fillin");
  }.property('type'),
  isAnswerCorrect: function() {
    return Ember.isEqual(this.get('userAnswer'),this.get('answer'));
  }.property('userAnswer')
});