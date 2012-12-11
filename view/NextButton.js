App.NextButton = Ember.View.extend({
	template:Ember.Handlebars.compile('<button>Next</button>'),
	click: function(e) {
    App.QuizController.next();
	}
});