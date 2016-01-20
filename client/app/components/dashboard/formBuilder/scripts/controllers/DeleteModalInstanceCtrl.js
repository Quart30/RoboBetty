'use strict';

function DeleteModalInstanceCtrl($modalInstance){
	var vm = this;

	vm.ok = function () {
		console.log('Deleted field');
    	$modalInstance.close();
  	};

  	vm.cancel = function () {
    	$modalInstance.dismiss('cancel');
  	};
}

angular.module('DashboardFormBuilderModule')
	.controller('DeleteModalInstanceCtrl', ['$modalInstance', DeleteModalInstanceCtrl]);