'use strict';

angular.module('register')
  .service('RegisterService', ['$http', function($http) {
  	  //Works with the registration API to post to server, takes in a user object
      //that contains a company name, password, email, and phone number
      this.reg = function(user) {
        return $http.post('/auth/signup', user);
      };
  }]);