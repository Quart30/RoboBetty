'use strict';

angular.module('product')
  .directive('productReviews', function() {
    return {
      restrict: 'E',
      templateUrl: 'views/components/product/views/product-reviews.html',
      controller: 'ReviewController',
      controllerAs: 'reviewCtrl'
    };
  })
  .controller('ReviewController', function() {
    this.review = {};
    this.review.createdOn = Date.now();
    this.addReview = function addReview(product) {
      product.reviews.push(this.review);
      this.review = {};
    };
  });