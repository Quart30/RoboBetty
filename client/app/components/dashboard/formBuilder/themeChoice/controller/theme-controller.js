'use strict';

angular.module('theme')
  .controller('themeController', ['$scope', function($scope){
    $scope.arrayOfUrl = ["/images/1.jpg"
                     ,"/images/2.jpg"
                     ,"/images/3.jpg"
                     ,"/images/4.jpg"
                     ,"/images/5.jpg"];
  	
  }]);
