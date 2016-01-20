'use strict';

angular.module('product')
  .directive('productTabs', function() {
    return {
      restrict: 'E',
      templateUrl: 'views/components/product/views/product-tabs.html',
      controller: 'TabController',
      controllerAs: 'tabCtrl'
    };
  })
  .controller('TabController', function(){
    this.tab = 1;

    this.setTab = function(newValue){
      this.tab = newValue;
    };

    this.isSet = function(tabName){
      return this.tab === tabName;
    };
  });
