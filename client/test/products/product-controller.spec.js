describe('Product Service Controller', function() {

  var ProductCtrl;
  var http;
  var ProductService;

  beforeEach(module('product'));

  beforeEach(inject(function($controller, _ProductService_, _$httpBackend_) {
    http = _$httpBackend_;
    ProductService = _ProductService_;
    http
      .when('GET', 'https://blue-jay.herokuapp.com/api/products')
      .respond(200, {name: 'mockproduct'});
    ProductCtrl = $controller('ProductController', {ProductService: ProductService});
  }));

  describe('When Controller in created', function() {

    it('products should be set', function() {
      http.flush();
      expect(ProductCtrl.products).to.be.defined;
      expect(ProductCtrl.products.name).to.equal('mockproduct');
    });

  });

});