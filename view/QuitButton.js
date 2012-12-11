App.QuitButton = Ember.View.extend({
	template:Ember.Handlebars.compile('<button>Quit</button>'),
	click: function(e) {
    App.QuizController.quit();
	}
});