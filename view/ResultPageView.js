App.ResultPageView = Ember.View.extend({
  elementId:'resultPage',
  templateName:'results-view',
	isVisible: function(){
    return App.QuizController.get("currentPage") === "resultPage";
  }.property('App.QuizController.currentPage'),
  playAgain:function (e) {
    App.QuizController.initializeQuiz();
  },
  newGame:function (e) {
    document.location.reload(true);
  }
});