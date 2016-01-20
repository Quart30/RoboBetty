'use strict';

angular.module('product')
  .directive('productDescription', function() {
    return {
      restrict: 'E',
      templateUrl: 'views/components/product/views/product-description.html'
    };
});
