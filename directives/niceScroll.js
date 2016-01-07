var appDirectives = angular.module('appDirectives');

appDirectives.directive('niceScroll', function() {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        $(element).niceScroll();
      }
    };
});