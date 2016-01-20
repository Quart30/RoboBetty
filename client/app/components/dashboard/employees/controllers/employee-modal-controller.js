'use strict';

angular.module('dashboard')
	.controller('EmployeeModalController', function ($scope, $modalInstance) {
		$scope.ok = function () {
			$modalInstance.close($scope.modal);
		};

		$scope.cancel = function () {
			$modalInstance.dismiss('cancel');
		};
});
