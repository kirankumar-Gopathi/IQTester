App.RadioView = Ember.View.extend({
  template:Ember.Handlebars.compile('{{view.content}}'),
  classNameBindings: ['selected'],
  selected: function(test){
    var isAnswerCorrect = this.getPath('contentView.contentView.contentView.content.isAnswerCorrect');
    var iconClass = "close";
    if(isAnswerCorrect){
      iconClass = 'open';
    }else{
      iconClass = 'close';
    }
    return iconClass;
  }.property('contentView.contentView.contentView.content.isAnswerCorrect'),
  click: function(e) {
    var userAnswer = this.getPath('contentView.contentView.contentView.content.options').indexOf(this.content);
    this.setPath('contentView.contentView.contentView.content.userAnswer',userAnswer);
    console.log(this.getPath('contentView.contentView.contentView.content.isAnswerCorrect'));
  }
});