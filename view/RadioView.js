App.RadioView = Ember.View.extend({
  tagName:'a',
  template:Ember.Handlebars.compile('{{view.content}}'),
  classNameBindings:['selected'],
  selected:false,
  click:function (e) {
    this._parentView._parentView.forEachChildView(function (view) {
      view._childViews[0].set("selected", false);
    });
    var userAnswer = this.getPath('contentView.contentView.contentView.content.options').indexOf(this.content);
    this.setPath('contentView.contentView.contentView.content.userAnswer', userAnswer);
    App.QuizController.get('userAnswerArray')[App.QuizController.get('currentQuestionIndex')] = userAnswer;
    this.set("selected", true);
  }
});