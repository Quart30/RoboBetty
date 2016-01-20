'use strict';

angular.module('recovery')
  .service('RecoveryService', ['$http', function($http) {
      this.recover = function(email) {
      	// There is no functionality for the password recovery system yet. 
        //return $http.get('/something/here/' + email, something);
      };
  }]);
