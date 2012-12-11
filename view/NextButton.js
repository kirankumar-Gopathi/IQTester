App.NextButton = Ember.View.extend({
  elementId:'nextBtn',
  classNames: 'navBtn',
  tagName: 'button',
	template:Ember.Handlebars.compile('Next'),
	click: function(e) {
    App.QuizController.next();
	}
});