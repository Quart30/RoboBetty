'use strict';

angular.module('register')
  .controller('RegisterController', ['$scope','$rootScope','$location', 'AuthService',function($scope,$rootScope,$location, AuthService){
        //a user object that contains the email, password, company name, and phone number
        //that the user entered in
  		$scope.user = {email: '', password: '', company_name: '', company_phone_number: ''};
      
      $scope.number='';   //variable to store phone number entered by user, which needs to be converted to a string
      $scope.pass = '';   //variable to store what user entered into confirm password
      $scope.err=false;
      $scope.check = false;
      $scope.errorMessage='';
      
        //function that is called when user clicks submit that stores information in the backend
  		$scope.reg = function(){ 
        $scope.user.company_phone_number = '';    
            
        //making sure the number is not null before calling toString method
        if($scope.number != null){
            console.log(typeof $scope.user.company_phone_number);
            $scope.user.company_phone_number = $scope.number.toString();
        }
            
        //Email, password, company name, or phone fields are empty
        if($scope.user.email=='' || $scope.user.password=='' || $scope.user.company_name=='' || 
            $scope.user.company_phone_number==''){
            $scope.errorMessage='Please provide company name, password, phone, and email.';
        }
            
        //Passwords differ
        else if($scope.pass!=$scope.user.password){
          $scope.errorMessage='Please make sure your passwords match';
          return;
        }
            
        //Password not 4 characters or more
        else if($scope.pass.length<4){
          $scope.errorMessage='Password must be at least 4 characters';
          return;
        }
            
        //Phone number must be 10-11 numbers
        else if($scope.user.company_phone_number.length!=10 && $scope.user.company_phone_number.length!=11)
        {
            $scope.errorMessage='Phone number should be 10-11 numbers long.';
            return;
        }
            
        //Did not agree to the terms
        else if(!($scope.check)) {
          $scope.errorMessage='You must agree to the terms and conditions';
          return;
        }
            
        //if all information was entered in properly
        else{
            //pass in user object that contains the information the user typed in
  		    AuthService.reg($scope.user)
          //when the API call was a success
      	  .success(function(data){
          $rootScope.token = data.token;
           $rootScope.number = data.company_phone_number;
           $rootScope.company_name = data.company_name;
           $rootScope.admin_id = data.admin_id;
           $rootScope.email = $scope.user.email;
          $location.path('/thankyou');
          return data;
      	 })
            
         //when API call was not a success    
      	 .error(function(err){
            $scope.errorMessage = 'You have already created an account';
       	  	return err;
     	  });
      }
        

  		};
  }]);
