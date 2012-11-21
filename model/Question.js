/**************************
* Question Model
**************************/
App.Question = Ember.Object.extend({
  question: null,
  type: null,
  options: null,
  answer: null,
  weight: null,
  imageURL: null
});