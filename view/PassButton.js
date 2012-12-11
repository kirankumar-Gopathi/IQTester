App.PassButton = Ember.View.extend({
	template:Ember.Handlebars.compile('<button>Pass</button>'),
	click: function(e) {
    App.QuizController.pass();
	}
});