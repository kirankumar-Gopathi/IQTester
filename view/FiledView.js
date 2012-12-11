App.FieldView = Ember.TextField.extend({
  keyUp: function(e) {
      var userAnswer = this.get('value');
      this.setPath('content.userAnswer',userAnswer);
  }
});