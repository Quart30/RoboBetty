'use strict';

function ModalInstanceCtrl($modalInstance){
	var vm = this;

	vm.title = 'Error';
	vm.body = 'No fields added yet, please add fields to the form before preview.';
	vm.btns = [{result:'ok', label: 'OK', cssClass: 'btn-primary btn'}];

	vm.ok = function () {
		console.log('hey');
    	$modalInstance.close();
  	};
}

angular.module('DashboardFormBuilderModule')
	.controller('ModalInstanceCtrl', ['$modalInstance', ModalInstanceCtrl]);