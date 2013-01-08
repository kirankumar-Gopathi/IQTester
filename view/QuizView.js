App.QuizView = Ember.View.extend({
  elementId:'questions-container',
  contentBinding:'App.QuizController.currentQuestion',
  templateName:'question-view',
  fillInKeyUp: function(e) {
    var userAnswer = e.target.value;
    this.setPath('content.userAnswer', userAnswer);
	  App.QuizController.get('userAnswerArray')[App.QuizController.get('currentQuestionIndex')] = userAnswer;
  },
  quit: function(){
    App.QuizController.quit();
  },
  pass:function (e) {
    App.QuizController.pass();
  }
});