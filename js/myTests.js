test('shuffleContent()', function() {
    App.QuizController.set('content',[0,1,2,3]);
    var x = App.QuizController.get('content')[0];
    App.QuizController.shuffleContent();
    var y = App.QuizController.get('content')[0];
    notDeepEqual(x,y, 'content shuffled');
})