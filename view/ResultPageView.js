App.ResultPageView = Ember.View.extend({
    elementId:'resultPage',
	isVisible: function(){
    return App.QuizController.get("currentPage") === "resultPage";
  }.property('App.QuizController.currentPage')
});