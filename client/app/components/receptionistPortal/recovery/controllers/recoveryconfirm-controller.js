'use strict';

//controller that displays to the user that their password was recovered and redirects them
//back to sign in after a certain amount of time
angular.module('recoverythx')
	.controller('RecoveryConfirmController', ['$location', '$timeout', function($location, $timeout){
    $timeout(redirectToSignin, 3000);
    
    function redirectToSignin() {
      $location.path('/signin');
    }

	}]);