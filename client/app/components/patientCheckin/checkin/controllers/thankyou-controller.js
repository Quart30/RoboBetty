'use strict';

//after a user finishes checking in, display thank you page for a brief period of time and go 
//back to checkin screen
angular.module('thankyouCheckIn')
  .controller('CheckInThankYouController', ['$location', '$timeout', function($location, $timeout) {
    $timeout(redirectToCheckin, 5000);
    function redirectToCheckin() {
      $location.path('/checkin')
    }
}]);
