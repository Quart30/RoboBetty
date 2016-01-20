'use strict';

angular.module('product')
  .directive('productSpecs', function() {
    return {
      restrict: 'E',
      templateUrl: 'views/components/product/views/product-specs.html'
    };
});