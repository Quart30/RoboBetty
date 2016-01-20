'use strict';

angular.module('product')
  .service('ProductService', ['$http', function($http) {
      this.getProducts = function() {
        return $http.get('https://blue-jay.herokuapp.com/api/products');
      };
  }]);