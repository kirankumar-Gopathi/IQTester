/**************************
 * Controllers
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
    $("div#main-container").hide().next("div#resultPage").show();
  }
});

(function () {
  var json = {"title":"IQ Tester", "questions":[
    {"question":"Two ducks and two dogs have a total of fourteen legs.", "options":["true", "false"], "answer":0, "weight":2, "type":"radio"},
    {"question":"Which number should come next in the series? 1 - 1 - 2 - 3 - 5 - 8 - 13", "options":[8, 13, 21, 26, 31], "answer":0, "weight":2, "type":"radio"},
    {"question":"Which one of the five is least like the other four?", "options":["dog", "mouse", "lion", "snake", "elephant"], "answer":0, "weight":4, "type":"radio"},
    {"question":"Mary, who is sixteen years old, is four times as old as her brother. How old will Mary be when she is twice as old as her brother?", "options":[20, 24, 25, 26, 28], "answer":0, "weight":4, "type":"radio"},
    {"question":"Which one of the numbers does not belong in the following series? 2 - 3 - 6 - 7 - 8 - 14 - 15 - 30", "options":[3, 7, 8, 15, 30], "answer":0, "weight":4, "type":"radio"},
    {"question":"Which one of the five choices makes the best comparison? Finger is to Hand as Leaf is to:", "options":["twig", "tree", "branch", "blossom", "branch"], "answer":0, "weight":5, "type":"radio"},
    {"question":"If you rearrange the letters ‘CIFAIPC’ you would have the name of a(n):", "options":["city", "animal", "ocean", "river", "country"], "answer":0, "weight":2, "type":"radio"},
    {"question":"Choose the number that is 1/4 of 1/2 of 1/5 of 200:", "options":[2, 5, 10, 25, 50], "answer":0, "weight":4, "type":"radio"},
    {"question":"John needs 13 bottles of water from the store. John can only carry 3 at a time. What's the minimum number of trips John needs to make to the store?", "options":[2, 4, 4.5, 5, 6], "answer":0, "weight":6, "type":"radio"},
    {"question":"Who is the famous personality?", "imageURL":"http://ia.media-imdb.com/images/M/MV5BMTIwMzAwMzg1MV5BMl5BanBnXkFtZTYwMjc4ODQ2._V1._SX214_CR0,0,214,314_.jpg", "answer":"Stanely Kubrick", "weight":8, "type":"fillin"}
  ], "time":60, "randomized":true};
  App.QuizController.set('randomized', json.randomized);
  App.QuizController.set('timer', json.time);
  var questions = json["questions"];
  var questionModelArr = [];

  $("button#startTestBtn").on("click", function () {
    $("div#startPage").hide().next("div#main-container").show();
    initializeTimer();
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
  });

  // Check for timer parameter and initialize timer.
  var initializeTimer = function () {
    if (App.QuizController.timer) {
      var quizTimer = App.QuizController.timer;
      var stepValue = 360 / quizTimer;
      var endAngle = 0;
      drawTimer(endAngle);
      App.QuizController.set('timeLeft', quizTimer);
      var updateTimer = window.setInterval(function () {
        if (quizTimer > 0) {
          endAngle += stepValue;
          App.QuizController.set('timeLeft', --quizTimer);
        }
        else {
          clearInterval(updateTimer);
          App.QuizController.set('timeLeft', "TimeUp!");
        }
        drawTimer(endAngle);
      }, 1000);
    }
  }

  var canvas = document.getElementById('clockAnimation');
  var drawTimer = function (endAngle) {
    if (canvas.getContext) {
      var ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, 104, 114);
      ctx.beginPath();
      ctx.fillStyle = '#00DEFF';
      ctx.lineWidth = 6;
      ctx.moveTo(51, 61);
      ctx.arc(51, 62, 40, 1.5 * Math.PI, (endAngle + 270) * (Math.PI / 180), false);
      ctx.lineTo(51, 61);
      ctx.fill();
      ctx.strokeStyle = 'white';
      ctx.stroke();
    }
  };

})();