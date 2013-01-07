/**************************
 * Question Model
 **************************/
App.Question = Ember.Object.extend({
  question:null,
  type:null,
  options:null,
  weight:null,
  imageURL:null,
  isFillIn:function () {
    return Ember.isEqual(this.get('type'), "fillin");
  }.property('type'),
});