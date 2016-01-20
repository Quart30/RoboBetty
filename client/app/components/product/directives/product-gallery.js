'use strict';

angular.module('product')
  .directive('productGallery', function(){
    return {
      restrict: 'E',
      templateUrl: 'views/components/product/views/product-gallery.html ',
      controller: 'GalleryController',
      controllerAs: 'galleryCtrl'
    };
  })
  .controller('GalleryController', function(){
    this.current = 0;
    this.setCurrent = function(newGallery){
      this.current = newGallery || 0;
    };
  });