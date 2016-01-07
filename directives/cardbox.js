var appDirectives = angular.module('appDirectives', []);

appDirectives.directive('cardBox', function() {
  return {
    restrict: 'EA',
    replace: true,
    scope: {
      story: '=',
      trash: '&'
    },
    templateUrl: 'views/card.html',
    controller: function($scope, $element) {

      $scope.card = {};
      $scope.titleEdit = false;
      $scope.contentEdit = false;

      $scope.editTitle = function() {
        $scope.titleEdit = true;
        $scope.card.title = $scope.story.title;
      }

      $scope.saveTitle = function() {
        $scope.titleEdit = false;
        $scope.story.title =  $scope.card.title || $scope.story.title;
      }

      $scope.cancelTitle = function() {
        $scope.titleEdit = false;
      }

      $scope.editContent = function() {
        $scope.contentEdit = true;
        $scope.card.content = $scope.story.content;
      }

      $scope.saveContent = function() {
        $scope.contentEdit = false;
        $scope.story.content =  $scope.card.content;
      }

      $scope.cancelContent = function() {
        $scope.contentEdit = false;
      }

      $scope.changeColor = function(color) {
        $scope.story.color = color;
      }

      $scope.trashStory = function(story, oldStatus) {
        $scope.story.status = 'deleted';
        $scope.trash()(story, oldStatus);
      }
    },
    link: function(scope, element, attrs, controller) {
      scope.$watch('story.status', function(val) {
        if(val == 'deleted') {
          $(element).alert('close');
        }
      });
    } 
  };
});

