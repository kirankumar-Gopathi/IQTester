App.StartPageView = Ember.View.extend({
  elementId:'startPage',
  templateName:'home-view',
  isVisible: function(){
    return App.QuizController.get("currentPage") == "startPage";
  }.property('App.QuizController.currentPage'),
  startGame:function (e) {
    App.QuizController.initializeQuiz();
  }
});