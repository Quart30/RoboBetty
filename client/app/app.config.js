// var IS_MOBILE = true;

angular.module("robobetty")
    .constant("appConfig", {
        isMobile: IS_MOBILE || false, 
        baseUrl: "https://blue-jay.herokuapp.com/",
        debugMode: false
    });
