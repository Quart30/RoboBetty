'use strict';

angular.module('dashboard')
	.controller('PatientRemoveController', function ($scope, $modalInstance, item) {

		$scope.selectedPatient = item;

		$scope.ok = function (item) {
			$modalInstance.close($scope.selectedPatient);
		};

		$scope.cancel = function () {
			$modalInstance.dismiss('cancel');
		};

});
