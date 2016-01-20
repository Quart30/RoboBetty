describe('Product Service', function() {

  beforeEach(module('product'));

  var ProductService;
  var http;

  beforeEach(inject(function(_ProductService_, _$httpBackend_) {
    ProductService = _ProductService_;
    http = _$httpBackend_;
  }));

  describe('When getProducts in invoked', function() {

    beforeEach(function() {
      http
        .when('GET', 'https://blue-jay.herokuapp.com/api/products')
        .respond(200, {name: 'product one'});
    });

    afterEach(function(){
      http.verifyNoOutstandingExpectation();
      http.verifyNoOutstandingRequest();
    });


    it('http get should get called', function() {
      http.expectGET('https://blue-jay.herokuapp.com/api/products');
      ProductService.getProducts();
      http.flush();
    });

  });

});