App.Pass = Ember.View.extend({
  classNames:['navLink', 'rightNav'],
  tagName:'a',
  template:Ember.Handlebars.compile('Pass'),
  click:function (e) {
    App.QuizController.pass();
  }
});