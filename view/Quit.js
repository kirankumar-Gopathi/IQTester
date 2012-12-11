App.Quit = Ember.View.extend({
  classNames:['navLink', 'leftNav'],
  tagName:'a',
  template:Ember.Handlebars.compile('Quit'),
  click:function (e) {
    App.QuizController.quit();
  }
});