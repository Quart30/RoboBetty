angular.module('robobetty')
.config(["$httpProvider", function($httpProvider) {
	$httpProvider.interceptors.push('middleware');
}])
.factory('middleware', function(appConfig, BACKEND_NAMESPACE) {
	return {
		request: function(config) {
			if(appConfig.isMobile) {
		            // Check if config url starts with views namespace
		        var shouldAppend = false;
		        // Cycling through each namespace and seeing if it prepends it

		        if(config.url.indexOf("/") == 0) {
		        	config.url = config.url.slice(1);
		        }
		        for(var i = 0; i < BACKEND_NAMESPACE.length; i++) {
		        	if(config.url.indexOf(BACKEND_NAMESPACE[i]) == 0) {
		        		if(appConfig.debugMode) console.log(BACKEND_NAMESPACE[i] + " " +  config.url);
		        		shouldAppend = true;
		        	}
		        }
		        if(shouldAppend) {
	            	config.url = appConfig.baseUrl + config.url;
            	}
	        }
        	return config;
	    }
	}
});
