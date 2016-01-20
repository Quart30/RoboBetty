'use strict';

angular.module('signin')
  .service('SigninService', ['$http', function($http) {
  	  //API call to login, takes in a user object with an 
      //email and password and verifies if it is valid
      this.login = function(user) {
        return $http.post('/auth/login', user);
      };
  }]);