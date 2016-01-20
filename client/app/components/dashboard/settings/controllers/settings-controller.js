'use strict';

angular.module('dashboard')
	.controller('SettingsController', ['$scope','$rootScope','SettingsService',
	  function($scope, $rootScope, SettingsService){

	  	//Object to be put in the request
		$scope.user = { password: ''};
		$scope.alerts = [];

		//Possible fields to update
		$scope.newpassword = '';
		$scope.newemail = '';
		$scope.new_company_name = '';
		$scope.new_company_phone_number = '';

		//Used for validation and API call
		$scope.validateNewPass = '';
		$scope.email = $rootScope.email;

		$scope.update = function(){
			$scope.updateClicked = true;
			$scope.alerts.pop();
			if($scope.user.password == ''){
				$scope.alerts.push({type:'danger', msg:'You must supply your current password.' });
			}
			else {

				if($scope.newpassword == '' && $scope.newemail == '' && $scope.new_company_name=='' && $scope.new_company_phone_number==''){
					$scope.alerts.push({type:'warning', msg:"Settings were not changed"});
					return;
				} 
				else if($scope.validateNewPass != $scope.newpassword){
					$scope.alerts.push({type:'danger', msg:"New password and Confirmation are not the same." });
					return;
				} else if($scope.newpassword.length < 4){
					$scope.alerts.push({type:'danger', msg: 'New Password length must be at least 4 characters.' });
					return;
				}
				else {

					if($scope.newpassword != ''){
					$scope.user.newpassword = $scope.newpassword;
					}
					if($scope.newemail != ''){
						$scope.user.newemail = $scope.newemail;
					}
					if($scope.new_company_name != ''){
						$scope.user.new_company_name = $scope.new_company_name;
					}
					if($scope.new_company_phone_number != ''){
						$scope.user.new_company_phone_number = $scope.new_company_phone_number;
					}
					
	                //call the update function of settings service to update the info about the user
					SettingsService.update($scope.user)
						.success(function(data){
							if(data=='Oops! Wrong password'){
								$scope.alerts.push({type:'danger', msg: 'Oops! Please check your password!' });
							}
							else{
								if($scope.newemail != ''){
									$rootScope.email = $scope.newemail;
								}
								$scope.alerts.push({type:'success', msg: 'You have successfully changed your settings' });
							}
							return data;
						})
						.error(function(err){
							$scope.alerts.push({type:'danger', msg: 'Settings change not successful' });
							return err;
					});
				}	
			}
		}
	}]);
