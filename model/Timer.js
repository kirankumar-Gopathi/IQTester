/**************************
 * Timer Model
 **************************/
App.Timer = Ember.Object.extend({
  totalTime: null,
  timeLeft: null,
  timerArcEndAngle: function() {
    return ((360*(this.totalTime - this.timeLeft))/this.totalTime); 
  },
});
  
  