'use strict';

angular.module('theme')
  .directive('themeChoice', function() {
  	return {
      restrict: 'E',
      templateUrl: 'views/components/dashboard/formBuilder/themeChoice/views/themeChoice.html',
      controller: 'ThemeController',
      controllerAs: 'themeCtrl'
    };
  })
  .controller('themeController', ['$scope', function($scope){
    $scope.arrayOfUrl = ["/images/1.jpg"
                     ,"/images/2.jpg"
                     ,"/images/3.jpg"
                     ,"/images/4.jpg"
                     ,"/images/5.jpg"];
  	
  }]);
