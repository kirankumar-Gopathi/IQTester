/**************************
 * Quiz Controller
 **************************/
App.QuizController = Ember.ArrayProxy.create({
  content:[],
  score:0,
  correctAnswersCount:0,
  time:null,
  timeLeft:null,
  randomized:false,
  currentPage: "startPage",
  currentQuestionIndex:null,
  currentQuestion:function () {
    return this.get('content')[this.get('currentQuestionIndex')];
  }.property('currentQuestionIndex'),
  currentQuestionIndexDisplay:function () {
    return this.get('currentQuestionIndex') + 1;
  }.property('currentQuestionIndex'),
  shuffleContent:function () {
    var questions = this.get('content');
    var i = questions.length;
    if (i == 0) return false;
    while (--i) {
      var j = Math.floor(Math.random() * ( i + 1 ));
      var tempI = questions[i];
      var tempJ = questions[j];
      questions[i] = tempJ;
      questions[j] = tempI;
    }
  },
  initializeQuiz: function (){
    var questions = json["questions"];
    var questionModelArr = [];
    App.QuizController.set('randomized', json.randomized);
    App.QuizController.set('timer', json.time);
    App.QuizController.set('score', 0);
    App.QuizController.set('correctAnswersCount', 0);
	this.showPage("questionsPage");
    App.TimerController.initialize(document.getElementById('clockAnimation'));
    for (var i = 0, len = questions.length; i < len; i++) {
      var question = App.Question.create();
      question.setProperties(questions[i]);
      questionModelArr.push(question);
    }

    if (questionModelArr.length > 1) {
      var consolidatedRecords = [];
      App.QuizController.set('[]', questionModelArr);
      if (App.QuizController.get('randomized')) {
        App.QuizController.shuffleContent();
      }
      App.QuizController.set('currentQuestionIndex', 0);
    }
   },
  next:function () {
    var currentQuestion = this.get('currentQuestion');
    if (currentQuestion.get('isAnswerCorrect')) {
      this.set('correctAnswersCount', this.get('correctAnswersCount') + 1);
      this.set('score', this.get('score') + currentQuestion.get('weight'));
    }
    this.pass();
  },
  pass:function () {
    var currentQuestionIndex = this.get('currentQuestionIndex');
    if (currentQuestionIndex == this.get('content').length - 1) {
      this.quit();
    } else {
      this.set('currentQuestionIndex', currentQuestionIndex + 1);
    }
  },
  quit:function () {
    App.TimerController.stopTimer();
	this.showPage("resultPage");
  },
  showPage: function(page){
    App.QuizController.set("currentPage",page);
  }
});
