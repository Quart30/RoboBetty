angular.module('widget')
  .directive('navBar', function favBarDirective() {
    return {
      restrict: 'E',
      templateUrl: 'views/shared/widget/views/header-bar.html'
    };
  });