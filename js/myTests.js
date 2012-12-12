test('shuffleContent()', function() {
    App.QuizController.set('content',[0,1,2,3]);
    var x = App.QuizController.get('content')[0];
    App.QuizController.shuffleContent();
    var y = App.QuizController.get('content')[0];
    notDeepEqual(x,y, 'content shuffled');
})

test('pass()', function() {
    App.QuizController.set('currentQuestionIndex',1);
    App.QuizController.pass();
    var y = App.QuizController.get('currentQuestionIndex');
    equal(y,2, 'passed to next question, updated currentQuestionIndex');
})

test('next()', function() {
    var question = Ember.Object.create({isAnswerCorrect:true,weight:4});
    App.QuizController.set('content',[question]);
    App.QuizController.set('currentQuestionIndex',0);
    App.QuizController.set('correctAnswersCount',0);
    App.QuizController.set('score',0);
    App.QuizController.next();
    var correctAnswersCount = App.QuizController.get('correctAnswersCount');
    equal(correctAnswersCount,1, 'incremented correctAnswersCount by one');
    var score = App.QuizController.get('score');
    equal(score,4, 'updated score with weight of currentQuestion');
})