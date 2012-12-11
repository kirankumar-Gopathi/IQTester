App.QuizView = Ember.View.extend({
  elementId:'questions-container',
  contentBinding:'App.QuizController.currentQuestion',
  templateName:'question-view'
});