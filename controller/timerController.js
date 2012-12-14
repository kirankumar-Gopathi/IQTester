/**************************
 * Timer Controller
 **************************/
App.TimerController = Ember.Controller.create({
    timer: null,
	updateTimer: null,
    initialize: function(time){
	  this.set('timer', App.Timer.create({'totalTime':time, 'timeLeft':time}));
	},
	startTimer: function () {
	  var _this = this;
	  _this.set("updateTimer", window.setInterval(function () {
        if (_this.get('timer').get('timeLeft') > 0) {
		    _this.get('timer').set('timeLeft', _this.get('timer').get('timeLeft') - 1);
        }
        else {
          App.QuizController.quit();
        }
      }, 1000));
	},
	stopTimer: function () {
	  clearInterval(this.get("updateTimer"));
	}    	
});

