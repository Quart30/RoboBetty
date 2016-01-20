'use strict';

//controller to handle recovery of user password
angular.module('recovery')
	.controller('RecoveryController', ['$scope', '$location', 'RecoveryService', function($scope, $location, RecoveryService){
		$scope.email = '';
		$scope.errMessage = '';

		// This is the functionality for the "recover password" button.
		$scope.recovery = function(){
			if($scope.email == ''){
				$scope.errMessage = 'You must enter a valid email address.'
			}
            
            //if email entered doesn't have a @ or . display an error
            else if($scope.email.indexOf('@')==-1||$scope.email.indexOf('.')==-1){
				$scope.errMessage = 'Invalid Email/Password'
			}
            
            else {
                //pass in email entered to recover function
				RecoveryService.recover($scope.email)
                    //if success, email was sent to the user
					.success(function(data){
						$scope.errMessage = 'Recover password successful.';
						// From here, go to a notification html indicating that an email has been sent to {{$scope.email}}
						$location.path('/registerthx');
						return data;
					})
                
                    //display error message if recover function failed
					.error(function(err){
						console.log('Recover password failed.');
						$scope.errMessage = 'Recover password failed.';
						return err;
					});
			}
		}
	}]);
