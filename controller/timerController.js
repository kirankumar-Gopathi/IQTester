/**************************
 * Timer Controller
 **************************/
App.TimerController = Ember.Controller.create({
   timerCanvasElement: null,
   timerArcEndAngle: null,
   updateTimer: null,
   initialize: function (canvasElement) {
    if (App.QuizController.timer) {
	  App.TimerController.set("timerCanvasElement",canvasElement);
      var quizTimer = App.QuizController.timer;
      var stepValue = 360 / quizTimer;
      App.TimerController.set("timerArcEndAngle",0);
      App.QuizController.set('timeLeft', quizTimer);
	  App.TimerController.set("updateTimer", window.setInterval(function () {
        if (quizTimer > 0) {
		  App.TimerController.set("timerArcEndAngle", App.TimerController.get("timerArcEndAngle") + stepValue);
          App.QuizController.set('timeLeft', --quizTimer);
        }
        else {
          App.QuizController.set('timeLeft', "TimeUp!");
		  App.QuizController.quit();
        }
      }, 1000));
    }
   },
   updateTimerCanvas: function(){
	  if (App.TimerController.get("timerCanvasElement").getContext) {
      var ctx = App.TimerController.get("timerCanvasElement").getContext('2d');
      ctx.clearRect(0, 0, 104, 114);
      ctx.beginPath();
      ctx.fillStyle = '#00DEFF';
      ctx.lineWidth = 6;
      ctx.moveTo(51, 61);
      ctx.arc(51, 62, 40, 1.5 * Math.PI, (App.TimerController.get("timerArcEndAngle") + 270) * (Math.PI / 180), false);
      ctx.lineTo(51, 61);
      ctx.fill();
      ctx.strokeStyle = 'white';
      ctx.stroke();
    }
   }.observes('timerArcEndAngle'),
   stopTimer: function() {
     clearInterval(App.TimerController.get("updateTimer"));
	 App.TimerController.set("timerArcEndAngle",null);
   }   
});