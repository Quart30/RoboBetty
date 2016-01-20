'use strict';

angular.module('dashboard')
	.controller('EmployeeRemoveMultipleController', function ($scope, $modalInstance, item) {

		$scope.selectedEmployees = item;

		$scope.ok = function () {
			$modalInstance.close($scope.selectedEmployees);
		};

		$scope.cancel = function () {
			$modalInstance.dismiss('cancel');
		};

});
