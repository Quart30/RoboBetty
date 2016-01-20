// Constants file
// Angular constants
angular.module('robobetty')
	.constant('BACKEND_NAMESPACE', ['api', 'auth', 'socket.io'])
;

// JavaScript constants
var IS_MOBILE = true;

function appendIonic(array) {
	if(IS_MOBILE) {
		array.push("ionic");
	}
	return array;
}

