App.StartGameButton = Ember.View.extend({
  elementId:'startTestBtn',
  classNames:'navBtn',
  tagName:'button',
  template:Ember.Handlebars.compile('Start Game'),
  click:function (e) {
    App.QuizController.initializeQuiz();
   }
});