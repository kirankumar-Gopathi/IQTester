App.StartPageView = Ember.View.extend({
  elementId:'startPage',
  isVisible: function(){
    return App.QuizController.get("currentPage") == "startPage";
  }.property('App.QuizController.currentPage')
});