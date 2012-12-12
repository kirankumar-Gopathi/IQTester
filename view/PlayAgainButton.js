App.PlayAgainButton = Ember.View.extend({
  elementId:'playAgainBtn',
  classNames:'navBtn',
  tagName:'button',
  template:Ember.Handlebars.compile('Play Again'),
  click:function (e) {
    App.QuizController.initializeQuiz();
  }
});