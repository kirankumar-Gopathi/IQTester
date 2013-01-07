/**************************
 * Quiz Controller
 **************************/
App.QuizController = Ember.ArrayController.create({
  content:[],
  score:0,
  correctAnswersCount:0,
  timer:null,
  randomized:false,
  currentPage: "startPage",
  currentQuestionIndex:null,
  assessmentArray:[],
  userAnswerArray:[],
  currentQuestion:function () {
    return this.get('content')[this.get('currentQuestionIndex')];
  }.property('currentQuestionIndex'),
  currentQuestionIndexDisplay:function () {
    return this.get('currentQuestionIndex') + 1;
  }.property('currentQuestionIndex'),
  shuffleContent:function () {
    var questions = this.get('content'),
	    answers = this.get('assessmentArray'),
        i = questions.length;
    if (i == 0) return false;
    while (--i) {
      var j = Math.floor(Math.random() * ( i + 1 )),
          tempI = questions[i], tempIAnswer = answers[i],
          tempJ = questions[j], tempJAnswer = answers[j];
      questions[i] = tempJ;
      questions[j] = tempI;
	  answers[i] = tempJAnswer;
	  answers[j] = tempIAnswer;
    }
  },
  initializeQuiz: function (){
    var questions = json["questions"];
    var questionModelArr = [], assessmentArray = [];
	this.setProperties({'randomized': json.randomized, 'timer': json.time, 'score': 0, 'correctAnswersCount': 0, 'userAnswerArray': [], 'assessmentArray': []});
	this.showPage("questionsPage");
    App.TimerController.initialize(this.get('timer'));
	App.TimerController.startTimer();
    for (var i = 0, len = questions.length; i < len; i++) {
      var question = App.Question.create(),
	      answer = App.Answer.create();
      question.setProperties({'question':questions[i].question, 'options':questions[i].options, 'weight':questions[i].weight, 'type':questions[i].type, 'imageURL':questions[i].imageURL});
	  answer.setProperties({'type':questions[i].type, 'answer':questions[i].answer});
      questionModelArr.push(question);
	  assessmentArray.push(answer);
    }

    if (questionModelArr.length > 1) {
      var consolidatedRecords = [];
      App.QuizController.set('[]', questionModelArr);
	  App.QuizController.set('assessmentArray', assessmentArray);
      if (App.QuizController.get('randomized')) {
        App.QuizController.shuffleContent();
      }
      App.QuizController.set('currentQuestionIndex', 0);
    }
   },
  next:function () {
    var currentQuestion = this.get('currentQuestion');
    if (this.evaluateQuestion(currentQuestion)) {
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
  },
  evaluateQuestion: function(question) {
	var currentQuestionIndex = this.get('currentQuestionIndex'),
	    answer = this.get('assessmentArray')[currentQuestionIndex].answer,
        userAnswer = this.get('userAnswerArray')[currentQuestionIndex];
    return (answer && userAnswer && isNaN(answer)) ? Ember.isEqual(userAnswer.toLowerCase(), answer.toLowerCase()) : Ember.isEqual(userAnswer, answer);
  }
});

