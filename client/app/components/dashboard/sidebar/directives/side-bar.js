'use strict';

angular.module('dashboard')
  .directive('sideBar', function() {
    return {
      restrict: 'E',
      templateUrl: 'views/components/dashboard/sidebar/views/side-bar.html',
      controller: 'SidebarController',
      controllerAs: 'sidebarCtrl'
    };
  }).controller('SidebarController', 
        ['$scope','$rootScope', '$cookieStore', 'SidebarService',
        function($scope,$rootScope, $cookieStore, SidebarService){
    var mobileView = 992;
    $scope.company_name = $rootScope.company_name;
    $scope.email=$rootScope.email;
    $scope.options = SidebarService.getSidebarOptions();
    $scope.sidebarHeader = SidebarService.getSidebarHeader();
    $scope.getWidth = function() {
        return window.innerWidth;
    };

    $scope.$watch($scope.getWidth, function(newValue, oldValue) {
        if (newValue >= mobileView) {
            if (angular.isDefined($cookieStore.get('toggle'))) {
                $scope.toggle = ! $cookieStore.get('toggle') ? false : true;
            } else {
                $scope.toggle = true;
            }
        } else {
            $scope.toggle = false;
        }

    });

    $scope.toggleSidebar = function() {
        $scope.toggle = !$scope.toggle;
        $cookieStore.put('toggle', $scope.toggle);
    };

    window.onresize = function() {
        $scope.$apply();
    };
}]);

