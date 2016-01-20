'use strict';

angular.module('product')
  .controller('ProductController', ['ProductService', function(productService){
    var store = this;
    store.products = [];
    productService.getProducts()
      .success(function(data){
        store.products = data;
      })
      .error(function(err){
        console.log("There was an error: " + err);
      });
  }]);

