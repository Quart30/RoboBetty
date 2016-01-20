'use strict';

angular.module('dashboard')
	.controller('DashboardController', ['$scope', '$rootScope', '$state', function ($scope, $rootScope, $state) {
		$scope.title = $state.current.title;

		//Event handler to change titles
		$rootScope.$on('$stateChangeStart', 
			function(event, toState, toParams, fromState, fromParams) { 
				$scope.title = toState.title;
			}
		)
	}]);