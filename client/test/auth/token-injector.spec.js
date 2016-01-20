describe('TokenInjector', function() {

  var httpProvider;
  var TokenInjector;
  var http, token;

  beforeEach(function() {
    /* Mock auth module and make sure to grab httpProvider */
    module('auth', function ($httpProvider) {
      httpProvider = $httpProvider;
    });

    /* Mock our token injector */
    inject(function (_TokenInjector_) {
      TokenInjector = _TokenInjector_;
    });

  });

  it('should be defined', function() {
    expect(TokenInjector).to.be.defined;
  });

  it('should be registerd as an interceptor', function() {
    expect(httpProvider.interceptors).to.contain('TokenInjector');
  });

  it('it should have undefined token to start', function() {
    expect(TokenInjector.getToken()).to.be.undefined;
  });

  it('it should set token properly', function() {
    token = 'TeatToken';
    TokenInjector.setToken(token);
    expect(TokenInjector.getToken()).to.equal(token);
  });


});