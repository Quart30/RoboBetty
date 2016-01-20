angular.module('auth')
  .factory('TokenInjector', function() {

    var token;

    function setToken(t) {
      token = t;
    }

    function getToken() {
      return token;
    }

    function processRequest(request) {
      if (token) {
        request.headers['token'] = token;
      }
      return request;
    }

     var tokeninjector = {
      request: processRequest,
      getToken: getToken,
      setToken: setToken
    };

    return tokeninjector;
  })
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('TokenInjector');
  }]);