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
    $("div#startPage").hide().next("div#main-container").show().next("div#resultPage").hide();
	App.TimerController.initialize(document.getElementById('clockAnimation'));
    for (var i = 0, len = questions.length; i < len; i++) {
      var question = App.Question.create();
      question.set('question', questions[i].question);
      question.set('options', questions[i].options);
      question.set('answer', questions[i].answer);
      question.set('type', questions[i].type);
      question.set('weight', questions[i].weight);
      question.set('imageURL', questions[i].imageURL);
      questionModelArr.push(question);
    }

    if (questionModelArr.length > 1) {
      var consolidatedRecords = [];
      App.QuizController.set('[]', questionModelArr);
      if (App.QuizController.get('randomized')) {
        App.QuizController.shuffleContent();
      }
      //App.QuizController.get('content')[0].set('isVisible',true);
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
	$("div#main-container").hide().next("div#resultPage").show();	
  }
});
