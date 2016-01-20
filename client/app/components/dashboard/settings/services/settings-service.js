'use strict';

angular.module('dashboard')
  .service('SettingsService', ['$http', '$rootScope', function($http, $rootScope) {
      //function to update a user information in the back end.  Can update company name, password
      //email, and phone number
      this.update = function(user) {
        return $http.put('/auth/setting/' + $rootScope.email, user);
      };
  }]);

