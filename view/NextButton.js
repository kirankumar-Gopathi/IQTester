App.NextButton = Ember.View.extend({
  elementId:'nextBtn',
  classNames:'navBtn',
  tagName:'button',
  attributeBindings:['disabled'],
  disabled:function () {
    if (App.QuizController.getPath('currentQuestion.userAnswer') != null) {
      return false;
    } else {
      return true;
    }
  }.property('App.QuizController.currentQuestion.userAnswer'),
  template:Ember.Handlebars.compile('Next'),
  click:function (e) {
    App.QuizController.next();
  }
});