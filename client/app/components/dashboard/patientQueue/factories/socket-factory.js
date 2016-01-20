angular.module('dashboard')
  .factory('socket', function ($rootScope) {
    if (IS_MOBILE) {
        var socket = io.connect('https://blue-jay.herokuapp.com');
    } else {
        var socket = io.connect();
    }
    return {
      on: function (eventName, callback) {
        socket.on(eventName, function () { 
          var args = arguments;
          $rootScope.$apply(function () {
            callback.apply(socket, args);
          });
        });
      },
      emit: function (eventName, data, callback) {
        socket.emit(eventName, data, function () {
          var args = arguments;
          $rootScope.$apply(function () {
            if (callback) {
              callback.apply(socket, args);
            }
          });
        })
      }
    };
  });
