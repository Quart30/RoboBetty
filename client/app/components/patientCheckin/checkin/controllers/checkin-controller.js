'use strict';

angular.module('checkin')
  .controller('CheckinController', ['$scope', '$rootScope','$timeout', '$location', 'CheckinService', 'appConfig',
    function($scope,$rootScope,$timeout,$location, CheckinService, appConfig){
    $scope.appConfig = appConfig;
    $scope.clock = "loading clock..."; // initialize the time variable
    $scope.tickInterval = 1000; //ms
      
    $scope.user = {email: $rootScope.email, password: ''};
    $scope.background_image;
      
    //makes the clock re-display every second  
    var tick = function () {
        $scope.clock = Date.now(); // get the current time
        $timeout(tick, $scope.tickInterval); // reset the timer
    }

      //function that sets the background by using the getTheme method of the CheckinService
      //also, uses the CheckinService to get the forms that the business wants to display
      $scope.init = function(){
        CheckinService.getTheme($rootScope.admin_id)
        .success(function(data){
          if(data=="null"||data.background_img=="default"){
            $scope.background_image="images/themes/city0.jpg";
          }
          else{
            $scope.background_image=data.background_img;
          }
            return data;
          })
        .error(function(err){
          return err;
        });
          
        //function that retrieves the form template for the current admin  
        CheckinService.getForms($rootScope.admin_id).success(
          function(data){
            data.template.submitted = false;
            $scope.form = data.template;
            return data;
          })
          .error(function(err){
            return err;
          });
      }

    // Start the timer
    $timeout(tick, $scope.tickInterval);
  }]);


//controller that handles the admin sign in from the check in screen
angular.module('checkin')
  .controller('admin_signinCtrl', ['$scope', '$rootScope', '$location', 'AuthService', 'CheckinService', function($scope, $rootScope, $location, AuthService, CheckinService){
    //user object that is used to store the email and password of the company, preset email so
    //admin only needs to type in password to get back to dashboard
    $scope.user = {email: $rootScope.email, password: ''};
    $scope.errMessage ='';
      
    //this function is called when we press the login button
    $scope.checkin = function(){
      //display error message if the email doesn't have @ or .
      if($rootScope.email.indexOf('@')==-1||$rootScope.email.indexOf('.')==-1){
        $scope.errMessage = 'Invalid Email/Password';
      }
        
      else{
          var account = this;
          //calls the API to login passing in a user object which has a email and password, displays
          //error if login was unsuccessful
          AuthService.signin($scope.user)
         .success(function(data){
          if(data=='Oops! Wrong password'){
            $scope.errMessage = 'Invalid Email/Password'; 
          }
            //redirects to the person's home page when a success
          else{  
            $rootScope.token = data.token;
            $rootScope.email = $scope.user.email;
            CheckinService.closeModal();  // close the checkin modal
            $location.path('../../../dashboard/views/dashboard.html');
            return data;
          }
         })
         .error(function(err){
            $scope.errMessage = 'Invalid Email/Password'; 
            return err;
          });
      }
    };
  }]);
