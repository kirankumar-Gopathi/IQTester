App.QuestionsPageView = Ember.View.extend({
  elementId:'main-container',
  isVisible: function(){
    return App.QuizController.get("currentPage") === "questionsPage";
  }.property('App.QuizController.currentPage')
});