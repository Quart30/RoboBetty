'use strict';

angular.module('signin')
  .controller('SigninController', ['$scope', '$rootScope', '$location', 'AuthService', 'socket', 'appConfig',
    function($scope, $rootScope, $location, AuthService, socket, appConfig){
  	$scope.user = {email: '', password: ''};    //variable to strore the users email and password they enter
    $scope.errMessage ='';                      //The error message to display to the user if there is a problem
    $scope.appConfig = appConfig;
    //this function is called when we press the login button
  	$scope.login = function(){
      //if there is not a @ or . in the email, then invalid
      if($scope.user.email.indexOf('@')==-1||$scope.user.email.indexOf('.')==-1){
        $scope.errMessage = 'Invalid Email/Password'
      }
        
      else{
  		  var account = this;
          
          //calls the API to login, have to pass in user object that contains the email and password
  		  AuthService.signin($scope.user)
      	 .success(function(data){
          //if API call worked but email-password combination doesn't exist
          if(data=='Oops! Wrong password'){
            $scope.errMessage = 'Invalid Email/Password'; 
          }
            //redirects to the person's home page when a success
          else{ 
           $rootScope.token = data.token;
           $rootScope.number = data.company_phone_number;
           $rootScope.company_name = data.company_name;
           $rootScope.admin_id = data.admin_id;
           $rootScope.email = $scope.user.email;
           socket.emit('_admin_id', {_admin_id:$rootScope.admin_id});
        	 $location.path('../../../dashboard/views/dashboard.html');
        	 return data;
          }
      	 })
          
          //if API call was not successful
      	 .error(function(err){
          console.log("failure");
       	  	$scope.errMessage = 'Invalid Email/Password'; 
       	  	return err;
     	  });
      }
  	};
  }]);
