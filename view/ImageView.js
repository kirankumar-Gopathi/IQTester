App.ImageView = Ember.View.extend({
  tagName: 'img',
  attributeBindings: ['src'],
  src: function(){
      return App.QuizController.getPath('currentQuestion.imageURL');
    }.property('App.QuizController.currentQuestionIndex')
});