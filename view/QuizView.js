App.QuizView = Ember.CollectionView.extend({
  elementId:'questions-container',
  contentBinding:'App.QuizController.content',
  itemViewClass: Ember.ContainerView.extend({
      isVisibleBinding: 'content.isVisible',
      childViews:'mediaSetContainer'.w(),
      mediaSetContainer:Ember.View.extend({
          contentBinding:'contentView.content',
          templateName: 'question-view'
      })
  })
});