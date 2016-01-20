'use strict';

//controller that redirects to the dashboard after a company has registered after a brief period
angular.module('thankyou')
  .controller('ThankYouController', ['$location', '$timeout', function($location, $timeout) {
    $timeout(redirectToSignin, 3000);
    
    function redirectToSignin() {
      $location.path('../../../dashboard/views/dashboard.html')
    }
}]);
