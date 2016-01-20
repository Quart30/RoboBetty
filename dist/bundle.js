'use strict';

angular.module('robobetty', appendIonic(
  [
    'ui.router',
    'widget',
    'product', 
    'dashboard',
    'ui.bootstrap',
    'signin',
    'register',
    'thankyou',
    'DashboardFormBuilderModule',
    'checkin',
    'thankyouCheckIn',
    'recovery',
    'recoverythx',
    'themes'
   ]))
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/patientQueue');
    $stateProvider
      .state('common',{
        templateUrl: 'views/components/dashboard/main/views/dashboard.html',
        abstract: true,
        mobile: false
      })
      .state('home', {
        url: '/home',
        templateUrl: 'views/components/home/views/home.html',
        mobile: false
      })
      .state('createForm', {
        url: '/createform',
        controller: 'FormCreateController',
        templateUrl: 'views/components/dashboard/formBuilder/views/create.html',
        parent: 'common',
        title: 'Create New Form',
        mobile: false
      })
      /* Enables route to editforms page
      .state('editForm', {
        url: '/editform',
        controller: 'FormEditController',
        templateUrl: 'views/components/dashboard/formBuilder/views/edit.html',
        parent: 'common',
        title: 'Edit Existing Template'
      })
      */
      .state('dashboard',{
        url:'/dashboard',
        template: '',
        parent: 'common',
        title: '',
        mobile: false
      })
       .state('patientQueue', {
        url: '/patientQueue',
        templateUrl: 'views/components/dashboard/patientQueue/views/patients.html',
        parent: 'common',
        title: 'Patients Queue',
        mobile: false
      })    
      .state('employees', {
        url: '/employees',
        templateUrl: 'views/components/dashboard/employees/views/employees.html',
        parent: 'common',
        title: 'Employees',
        mobile: false
      })
      .state('signin', {
        url: '/signin',
        templateUrl: 'views/components/receptionistPortal/signin/views/login.html',
        mobile: true
      })
      .state('register', {
        url: '/register',
        templateUrl: 'views/components/receptionistPortal/register/views/register.html',
        mobile: true
      })
      .state('checkin', {
        url: '/checkin',
        templateUrl: 'views/components/patientCheckin/checkin/views/checkin.html',
        mobile: true
      })
      .state('thankyou', {
        url: '/thankyou',
        templateUrl: 'views/components/receptionistPortal/register/views/thankyou.html',
        mobile: true
      })
      .state('thankyouCheckIn', {
        url: '/thankyouCheckIn',
        templateUrl: 'views/components/patientCheckin/checkin/views/CheckInthankyou.html',
        mobile: true
      })
      .state('recovery', {
        url: '/recovery',
         controller: 'RecoveryController',
        templateUrl: 'views/components/receptionistPortal/recovery/views/recovery.html',
        mobile: true
      })
      .state('recoverythx',{
        url: '/recoverythx',
        controller: 'RecoveryConfirmController',
        templateUrl: 'views/components/receptionistPortal/recovery/views/recoveryconfirm.html',
        mobile: false
      })
      .state('themes',{
        url: '/themes',
        parent: 'common',
        title: 'Themes',        
        templateUrl: 'views/components/dashboard/themes/views/dashboardIndex.html',
        mobile: false
      })
      .state('settings',{
        url: '/settings',
        parent: 'common',
        title: 'Settings',
        templateUrl: 'views/components/dashboard/settings/views/settings.html',
        mobile: false
      });
  })
  ionicCallback(IS_MOBILE);

  function initRunCallback($rootScope, $state, appConfig) {
    $rootScope.$on('$stateChangeSuccess',
    function(event, toState, toParams, fromState, fromParams) {
      // Routing for non-registered
      if(!appConfig.debugMode) {
        if(!$rootScope.admin_id) {
          if(toState.name != 'signin' && toState.name != 'register') {
            $state.go("signin");
          }
        }
      }
      // Routing for mobile app
      if(appConfig.isMobile) {
        if(toState.mobile == false) {
          $state.go("checkin");
        }
      }
    });
  }
  

  function ionicCallback(isMobile) {
    if(!isMobile) {
      angular.module("robobetty").run(['$rootScope', '$state', 'appConfig', function($rootScope, $state, appConfig){
        initRunCallback($rootScope, $state, appConfig);
      }]);
    } else {
      angular.module("robobetty").run(['$rootScope', '$state', 'appConfig', '$ionicPlatform', function($rootScope, $state, appConfig, $ionicPlatform){
          $ionicPlatform.ready(
            function() {
              if (window.StatusBar) {
                return StatusBar.hide();
              }
              initRunCallback($rootScope, $state, appConfig);
            }
          );
      }]);
    }
  }

angular.module('auth', []);
angular.module('dashboard', ['ngCookies', 'smart-table', 'ui.bootstrap', 'ui.mask']);
angular.module('product', []);
angular.module('widget', []);

angular.module("settings", []);
angular.module("themes", []);
angular.module('checkin', ['auth']);


angular.module("thankyouCheckIn", []);
angular.module('recovery', []);
angular.module("recoverythx", []);
angular.module("register", ['auth']);
angular.module("thankyou", []);
angular.module('signin', ['auth']);
angular.module('theme', []);
// var IS_MOBILE = true;

angular.module("robobetty")
    .constant("appConfig", {
        isMobile: IS_MOBILE || false, 
        baseUrl: "https://blue-jay.herokuapp.com/",
        debugMode: false
    });

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
//module that creates a service to handle authentication for sign in and register

angular.module('auth')
  .service('AuthService',
  ['TokenInjector', '$http', function(TokenInjector, $http) {

    /* Make auth api call to backend to authenticate signin*/
    this.signin = function signin(account) {

      var payload = account;
      console.log(payload);
      /* On success grab token from payload and register it with
       * TokenInjector
       */
      function success(payload) {
        if(payload && payload.token){
          TokenInjector.setToken(payload.token);
        } else {
          // TODO: what happens when token is not returned
        }
      }

      function error(err) {
        TokenInjector.setToken(undefined); // TODO: need to check this
      }

      /* Return promise to caller so they can call success and error too */
      return $http.post('/auth/login', payload).success(success).error(error);

    };

    /* make api call to backend to register a user */
    this.reg = function register(account) {

      var payload = account;
      console.log(payload);
      /* On success grab token from payload and register it with
       * TokenInjector
       */
      function success(payload) {
        if(payload && payload.token){
          TokenInjector.setToken(payload.token);
        } else {
          // TODO: what happens when token is not returned
        }
      }

      function error(err) {
        TokenInjector.setToken(undefined).success(success).error(error); // TODO: need to check this
      }

      /* Return promise to caller so they can call success and error too */
      return $http.post('/auth/signup', payload);
    };

  }]);

// example test case 

// var assert = require("assert"); // node.js core module

// describe('Array', function(){
//   describe('#indexOf()', function(){
//     it('should return -1 when the value is not present', function(){
//       assert.equal(-1, [1,2,3].indexOf(4)); // 4 is not present in this array so indexOf returns -1
//     })
//   })
// });
'use strict';

angular.module('product')
  .controller('ProductController', ['ProductService', function(productService){
    var store = this;
    store.products = [];
    productService.getProducts()
      .success(function(data){
        store.products = data;
      })
      .error(function(err){
        console.log("There was an error: " + err);
      });
  }]);


'use strict';

angular.module('product')
  .directive('productDescription', function() {
    return {
      restrict: 'E',
      templateUrl: 'views/components/product/views/product-description.html'
    };
});

'use strict';

angular.module('product')
  .directive('productGallery', function(){
    return {
      restrict: 'E',
      templateUrl: 'views/components/product/views/product-gallery.html ',
      controller: 'GalleryController',
      controllerAs: 'galleryCtrl'
    };
  })
  .controller('GalleryController', function(){
    this.current = 0;
    this.setCurrent = function(newGallery){
      this.current = newGallery || 0;
    };
  });
'use strict';

angular.module('product')
  .directive('productReviews', function() {
    return {
      restrict: 'E',
      templateUrl: 'views/components/product/views/product-reviews.html',
      controller: 'ReviewController',
      controllerAs: 'reviewCtrl'
    };
  })
  .controller('ReviewController', function() {
    this.review = {};
    this.review.createdOn = Date.now();
    this.addReview = function addReview(product) {
      product.reviews.push(this.review);
      this.review = {};
    };
  });
'use strict';

angular.module('product')
  .directive('productSpecs', function() {
    return {
      restrict: 'E',
      templateUrl: 'views/components/product/views/product-specs.html'
    };
});
'use strict';

angular.module('product')
  .directive('productTabs', function() {
    return {
      restrict: 'E',
      templateUrl: 'views/components/product/views/product-tabs.html',
      controller: 'TabController',
      controllerAs: 'tabCtrl'
    };
  })
  .controller('TabController', function(){
    this.tab = 1;

    this.setTab = function(newValue){
      this.tab = newValue;
    };

    this.isSet = function(tabName){
      return this.tab === tabName;
    };
  });

'use strict';

angular.module('product')
  .service('ProductService', ['$http', function($http) {
      this.getProducts = function() {
        return $http.get('https://blue-jay.herokuapp.com/api/products');
      };
  }]);
angular.module('widget')
  .directive('navBar', function favBarDirective() {
    return {
      restrict: 'E',
      templateUrl: 'views/shared/widget/views/header-bar.html'
    };
  });

'use strict';

angular.module('dashboard')
	.controller('EmployeeModalController', function ($scope, $modalInstance) {
		$scope.ok = function () {
			$modalInstance.close($scope.modal);
		};

		$scope.cancel = function () {
			$modalInstance.dismiss('cancel');
		};
});

'use strict';

angular.module('dashboard')
	.controller('EmployeeRemoveController', function ($scope, $modalInstance, item) {

		$scope.selectedPatient = item;

		$scope.ok = function () {
            $modalInstance.close($scope.selectedPatient);
		};

		$scope.cancel = function () {
			$modalInstance.dismiss('cancel');
		};

});

'use strict';

angular.module('dashboard')
	.controller('EmployeeRemoveMultipleController', function ($scope, $modalInstance, item) {

		$scope.selectedEmployees = item;

		$scope.ok = function () {
			$modalInstance.close($scope.selectedEmployees);
		};

		$scope.cancel = function () {
			$modalInstance.dismiss('cancel');
		};

});

'use strict';

angular.module('dashboard')
  .directive('employees', function() {
    return {
      restrict: 'E',
      templateUrl: 'views/components/dashboard/employees/views/employees.html',
      controller: 'EmployeeController',
      controllerAs: 'employeeCtrl'
    };
  })
  .controller('EmployeeController', ['$scope', '$window', '$modal', 'filterFilter', '$http', '$rootScope',
    function ($scope, $window, $modal, filterFilter, $http, $rootScope) {
    $scope.rowCollection = [];
    $scope.getEmployees = function(){
        $http.get('/api/employee/admin/'+$rootScope.admin_id).success(function(data){
            if(data === null){
                return [];
            }
            data.forEach(function(Employee){
                console.log(Employee);
                $scope.rowCollection.push({id:Employee._id, Name:Employee.name,PhoneNumber:Employee.phone_number, Email:Employee.email});
            });
            return data;
        })
        .error(function(data){
            console.log(data);

        })
    };

    $scope.getEmployees();
    console.log($scope.rowCollection);
    console.log("getting type");
    console.log(typeof $scope.rowCollection);

    // include root slecope
    $("#toaster").hide();                   // Hide toaster
    var id = 1;
    $scope.newField = {};
    $scope.editing = false;
    //copy the references (you could clone ie angular.copy but then have to go through a dirty checking for the matches)
    $scope.displayedCollection = [].concat($scope.rowCollection);
    
    $scope.checkIfEmptyTable = function(){
        return ($scope.displayedCollection.length === 0);
    };

    //edit a row
    $scope.editRowCollection = function(row) {
        $scope.editing = $scope.rowCollection.indexOf(row);
        $scope.newField = angular.copy(row);
        var phone = row.PhoneNumber;
        if(row.PhoneNumber.indexOf('(') == -1 )
            row.PhoneNumber = '('+phone.substring(0,3)+') '+phone.substring(3,6)+'-'+phone.substring(6,10);
    };
    
    // cancel editing
    $scope.cancel = function(row) {
        $scope.rowCollection[$scope.editing] = $scope.newField;
        $scope.displayedCollection = $scope.rowCollection;
    };
    //remove employee confirmation modal
    $scope.removeEmployee = function(row){
        var modalInstance = $modal.open({
          templateUrl: 'views/components/dashboard/employees/views/employee-remove.html',
          controller: 'EmployeeRemoveController',
          size: 'md',
          backdrop: true,
          resolve: {
            item: function () {
                $scope.selectedPatient = row;
                return $scope.selectedPatient; 
            }
          }
        }).result.then(function(result){
            $scope.row = result;
            var index = $scope.rowCollection.indexOf($scope.row);
            if (index !== -1) {
                $scope.rowCollection.splice(index, 1);
                $scope.row = {};
            }
        });
    };

    // multiple remove instance
    $scope.removeMultiple = function(row){
        var modalInstance = $modal.open({
            templateUrl: 'views/components/dashboard/employees/views/employee-remove-multiple.html',
            controller: 'EmployeeRemoveMultipleController',
            size: 'md',
            backdrop: true,
            resolve: {
              item: function () {
                $scope.selectedEmployees = row;
                return $scope.selectedEmployees; 
              }
            }
          }).result.then(function(result){
            $scope.selectedEmployees = result;
            $scope.removeMultipleFinal($scope.selectedEmployees);
          });
    };

    // removeMultiple helper function to return unselected rows
    $scope.removeMultipleFinal = function(row){
        $scope.rowCollection = filterFilter($scope.rowCollection, function(row){
            if(row.selected){
                $http.delete('/api/employee/' + row.id)
                    .success(function(data, status, headers, config) {
                        console.log("Removed id", data);
                    })
                    .error(function(data, status, headers, config) {
                        console.log("Could not remove employee id.", data);
                        console.log("Trying to remove from database by email");
                        $http.get('/api/employee/admin/' + $rootScope.admin_id)
                            .success(function(data, status, headers, config) {
                                for(var j=0; j<data.length; j++){
                                    if(row.Email == data[j].email){
                                        console.log("Found! Removing ", row.Email);
                                        $http.delete('/api/employee/' + data[j]._id)
                                        .success(function(data, status, headers, config) {
                                            console.log("Removed id", data);
                                        })
                                        .error(function(data, status, headers, config) {
                                            console.log("Completely failed to remove employee", data);
                                        });
                                    }
                                }
                            })
                            .error(function(data, status, headers, config) {
                                console.log("Could not retrieve and remove emlpoyees", data);
                            });
                    });
            } 
            return !row.selected;
        });
    };

    //add employee info
    $scope.submitForm = function(row){
      $scope.rowCollection.unshift(row);
      $scope.row = {};
      $scope.addForm.name.$setPristine();
      $scope.addForm.number.$setPristine();
      $scope.addForm.email.$setPristine();
    };
    //open add employee form
    $scope.openModal = function(){
        var modalInstance = $modal.open({
            templateUrl: 'views/components/dashboard/employees/views/employees-modal.html',
            controller: 'EmployeeModalController',
            size: 'md',
            backdrop: true,
            resolve: {}
        }).
        result.then(function(result){
            var phone = result.PhoneNumber;
            $scope.rowCollection.unshift(result = {
                Name:result.Name,
                PhoneNumber:'('+phone.substring(0,3)+') '+phone.substring(3,6)+'-'+phone.substring(6,10),
                Email:result.Email
            });
            
            //on click show it
            $("#toaster").fadeIn();
            //5 second then hide it
            setTimeout(function() {
                $("#toaster").fadeOut();
            }, 2000);

            $http.post('/api/employee', 
                {
                _admin_id: $rootScope.admin_id,
                name: result.Name,
                email: result.Email,
                phone_number: phone
                })
            .success(function(data, status, headers, config) {
              console.log("Employee Added", data);
              $scope.rowCollection[$scope.rowCollection.length -1].id = data._id;

            })
            .error(function(data, status, headers, config) {
              console.log("Employee failed to add", data, status, headers);
            });
        });
    };
}]);
'use strict';

var angularApp = angular.module('DashboardFormBuilderModule', ['ui.bootstrap']);

// angularApp.config(function ($routeProvider) {

//     $routeProvider
//         .when('/', {
//             templateUrl: 'views/main.html',
//             controller: 'MainCtrl'
//         })
//         .when('/forms/create', {
//             templateUrl: 'views/create.html',
//             controller: 'CreateCtrl'
//         })
//         .when('/forms/:id/view', {
//             templateUrl: 'views/view.html',
//             controller: 'ViewCtrl'
//         })
//         .otherwise({
//             redirectTo: '/'
//         });

// }).run(['$rootScope',  function() {}]);



'use strict';

angular.module('dashboard')
	.controller('DashboardController', ['$scope', '$rootScope', '$state', function ($scope, $rootScope, $state) {
		$scope.title = $state.current.title;

		//Event handler to change titles
		$rootScope.$on('$stateChangeStart', 
			function(event, toState, toParams, fromState, fromParams) { 
				$scope.title = toState.title;
			}
		)
	}]);
'use strict';

angular.module('dashboard')
	.controller('PatientModalController', function ($scope, $modalInstance, item) {

		$scope.selectedPatient = item;

		$scope.ok = function (row) {
			$scope.selectedPatient.Name = $scope.name;
			$scope.selectedPatient.Doctor = $scope.doctor;
			$modalInstance.close();
		};

		$scope.cancel = function () {
			$modalInstance.dismiss('cancel');
		};

});

'use strict';

angular.module('dashboard')
	.controller('PatientRemoveController', function ($scope, $modalInstance, item) {

		$scope.selectedPatient = item;

		$scope.ok = function (item) {
			$modalInstance.close($scope.selectedPatient);
		};

		$scope.cancel = function () {
			$modalInstance.dismiss('cancel');
		};

});

'use strict';

angular.module('dashboard')
  .controller('PatientQueueCtrl', ['$scope', '$modal', '$rootScope', 'socket', 'DoctorService',
   function ($scope, $modal, $rootScope, socket, DoctorService) {
    var d = new Date();

    //How many milliseconds in a minute
    var MINUTE_VAL = 60000;
    $scope.rowCollection = new Array();
    $scope.patientqueue;

    //The maximum number of minutes patients should wait before warning notification pops up on queue
    var EXPECTED_WAITING_TIME = 20;

    // add hardcoded patient
    socket.emit("request_queue", $rootScope.admin_id);

    socket.on('request_id', function(){
      console.log("on request_id", $rootScope.admin_id);
      if($rootScope.admin_id){
        console.log($rootScope.admin_id);
        socket.emit('_admin_id', {_admin_id:$rootScope.admin_id});
      }else{
        console.log("Socket cannot connect. No AdminId Found.");
      }
    });

   /* socket.on('patient_added', function(data) { 
      console.log("patient addeeed", data);
      console.log("roww collection", $scope.rowCollection);
      var newDoctor = DoctorService.getRandomDoctor();
      $scope.rowCollection.push({
        Name: data.name,
        Doctor: newDoctor,
        Time: new Date(new Date(data.checkin_time).valueOf()-(MINUTE_VAL * 31)).toLocaleTimeString().replace(/:\d+ /, ' '),
        TimeValue: new Date(new Date(data.checkin_time).valueOf()-(MINUTE_VAL * 31)).valueOf()
      });
      $scope.displayedCollection = $scope.rowCollection;
    }); */

    socket.on('queue_updated', function(data) { 
     console.log("queue updated received", data);
       //console.log("patient length", data.patient.length);
      $scope.rowCollection = [];
      $scope.patientqueue = data;
      var patientLength = 0;
      if(data.patients == null){
        patientLength = data.length;
      }
      else{
        patientLength = data.patients.length;   
      }
      console.log("patient length",patientLength);
      var i =0;
      for(i = 0;i<patientLength;i++){
        $scope.rowCollection.push(
        {
          id: data.patients[i]._id,
          Name: data.patients[i].name,
          Doctor: DoctorService.getRandomDoctor(),
          Time: new Date(new Date(data.patients[i].checkin_time).valueOf()).toLocaleTimeString().replace(/:\d+ /, ' '),
          TimeValue: new Date(data.patients[i].checkin_time).valueOf()
        });
      }
      console.log("rowCollection",$scope.rowCollection);
      $scope.displayedCollection = $scope.rowCollection;
   }); 

    //copy the references (you could clone ie angular.copy but then have to go through a dirty checking for the matches)
    $scope.displayedCollection = [].concat($scope.rowCollection);

    //Checks if patients have exceeded expected maximum waiting time
    $scope.checkIfLongWait = function(checkin){
        var currTime = (new Date()).valueOf();
        return ((currTime - checkin) >= (MINUTE_VAL * EXPECTED_WAITING_TIME));

    };

    //Checks if no results from search
    $scope.checkIfEmptyTable = function(){
        return ($scope.displayedCollection.length === 0);
    };
    
    //remove to the real data holder modal
    $scope.removeItem = function(row){
      var modalInstance = $modal.open({
        templateUrl: 'views/components/dashboard/patientQueue/views/patient-remove.html',
        controller: 'PatientRemoveController',
        size: 'md',
        backdrop: true,
        resolve: {
          item: function () {
            $scope.selectedPatient = row;
            return $scope.selectedPatient; 
          }
        }
      }).result.then(function(result){
        $scope.row = result;
        var index = $scope.rowCollection.indexOf($scope.row);
        if (index !== -1) {
          var patientName = $scope.rowCollection[index].Name;
          console.log(patientName);
          $scope.rowCollection.splice(index, 1);

          var newQueue = [];
          var patientqueueLength = $scope.rowCollection.length;
          var a = 0;
          for(a = 0;a<patientqueueLength;a++){
              newQueue.push(
              {
                _admin_id:$rootScope.admin_id,
                _id:$scope.rowCollection[a].id,
                checkin_time: $scope.rowCollection[a].TimeValue,
                name: $scope.rowCollection[a].Name
              }
            );
          }
        }
        $scope.patientqueue.patients = newQueue;
        socket.emit('patient_removed', {queue: $scope.patientqueue, patientName: patientName});
      });
    };
}]);

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

'use strict';

/* TODO:
 * 	Eventually have patient choose from a list of doctors. 
 *	But for now assign a random doctor to a patient.
*/
angular.module('dashboard')
  .service('DoctorService', [function() {
  		var doctorsList =
  			[
  				{doctor:'Phil'},
  				{doctor:'Powell'},
  				{doctor:'Soe'},
					{doctor:'Pepper'},
  				{doctor:'Kanye'},
  				{doctor:'Ly'},
          {doctor:'Douglas'},
  				{doctor:'Chen'},
  				{doctor:'West'},
  			];

      this.getAllDoctors = function() {
      	return doctorsList;
      };

      this.getRandomDoctor = function(){
      	return doctorsList[Math.floor((Math.random() * doctorsList.length))].doctor;
      }

  }]);
'use strict';

angular.module('dashboard')
	.controller('SettingsController', ['$scope','$rootScope','SettingsService',
	  function($scope, $rootScope, SettingsService){

	  	//Object to be put in the request
		$scope.user = { password: ''};
		$scope.alerts = [];

		//Possible fields to update
		$scope.newpassword = '';
		$scope.newemail = '';
		$scope.new_company_name = '';
		$scope.new_company_phone_number = '';

		//Used for validation and API call
		$scope.validateNewPass = '';
		$scope.email = $rootScope.email;

		$scope.update = function(){
			$scope.updateClicked = true;
			$scope.alerts.pop();
			if($scope.user.password == ''){
				$scope.alerts.push({type:'danger', msg:'You must supply your current password.' });
			}
			else {

				if($scope.newpassword == '' && $scope.newemail == '' && $scope.new_company_name=='' && $scope.new_company_phone_number==''){
					$scope.alerts.push({type:'warning', msg:"Settings were not changed"});
					return;
				} 
				else if($scope.validateNewPass != $scope.newpassword){
					$scope.alerts.push({type:'danger', msg:"New password and Confirmation are not the same." });
					return;
				} else if($scope.newpassword.length < 4){
					$scope.alerts.push({type:'danger', msg: 'New Password length must be at least 4 characters.' });
					return;
				}
				else {

					if($scope.newpassword != ''){
					$scope.user.newpassword = $scope.newpassword;
					}
					if($scope.newemail != ''){
						$scope.user.newemail = $scope.newemail;
					}
					if($scope.new_company_name != ''){
						$scope.user.new_company_name = $scope.new_company_name;
					}
					if($scope.new_company_phone_number != ''){
						$scope.user.new_company_phone_number = $scope.new_company_phone_number;
					}
					
	                //call the update function of settings service to update the info about the user
					SettingsService.update($scope.user)
						.success(function(data){
							if(data=='Oops! Wrong password'){
								$scope.alerts.push({type:'danger', msg: 'Oops! Please check your password!' });
							}
							else{
								if($scope.newemail != ''){
									$rootScope.email = $scope.newemail;
								}
								$scope.alerts.push({type:'success', msg: 'You have successfully changed your settings' });
							}
							return data;
						})
						.error(function(err){
							$scope.alerts.push({type:'danger', msg: 'Settings change not successful' });
							return err;
					});
				}	
			}
		}
	}]);

/*
angular.module('dashboard')
	.directive('settings', function() { 
  return { 
    restrict: 'E', 
    scope: { 
      info: '=' 
    }, 
    templateUrl: 'views/components/dashboard/settings/views/settings.html',
    controller: 'SettingsController'
  }; 
});
*/
'use strict';

angular.module('dashboard')
  .service('SettingsService', ['$http', '$rootScope', function($http, $rootScope) {
      //function to update a user information in the back end.  Can update company name, password
      //email, and phone number
      this.update = function(user) {
        return $http.put('/auth/setting/' + $rootScope.email, user);
      };
  }]);


'use strict';

angular.module('dashboard')
  .directive('sideBar', function() {
    return {
      restrict: 'E',
      templateUrl: 'views/components/dashboard/sidebar/views/side-bar.html',
      controller: 'SidebarController',
      controllerAs: 'sidebarCtrl'
    };
  }).controller('SidebarController', 
        ['$scope','$rootScope', '$cookieStore', 'SidebarService',
        function($scope,$rootScope, $cookieStore, SidebarService){
    var mobileView = 992;
    $scope.company_name = $rootScope.company_name;
    $scope.email=$rootScope.email;
    $scope.options = SidebarService.getSidebarOptions();
    $scope.sidebarHeader = SidebarService.getSidebarHeader();
    $scope.getWidth = function() {
        return window.innerWidth;
    };

    $scope.$watch($scope.getWidth, function(newValue, oldValue) {
        if (newValue >= mobileView) {
            if (angular.isDefined($cookieStore.get('toggle'))) {
                $scope.toggle = ! $cookieStore.get('toggle') ? false : true;
            } else {
                $scope.toggle = true;
            }
        } else {
            $scope.toggle = false;
        }

    });

    $scope.toggleSidebar = function() {
        $scope.toggle = !$scope.toggle;
        $cookieStore.put('toggle', $scope.toggle);
    };

    window.onresize = function() {
        $scope.$apply();
    };
}]);


'use strict';

angular.module('dashboard')
  .service('SidebarService', [function() {
      this.getSidebarOptions = function() {
      	return [
	      	// {option:'Home', icon: 'menu-icon fa fa-users', link:'dashboard'},
          {option:'Patients', icon:'menu-icon fa fa-users', link:'patientQueue'},
          {option:'Employees', icon:'menu-icon fa fa-user', link:'employees'},
          {option:'Forms', icon:'menu-icon fa fa-check-square-o', link:'createform'},
          {option:'Themes', icon:'menu-icon fa fa-picture-o', link:'themes'},
	      	{option:'Settings', icon:'menu-icon fa fa-cog', link:'settings'}
      	];
      };

      this.getSidebarHeader = function(){
      		return "iReceptionist";
      };

  }]);
'use strict';

angular.module('dashboard')
  .controller('ThemesController', ['$scope', '$location', '$rootScope', 'ThemesService', function($scope, $location, $rootScope, ThemesService) {
    $scope.message = '';
    $scope.theme = {form_color: 'default',
                    background_img: 'default',
                    displayPhone : true,
                    diplayClock: true,
                    displaySignature: true,
                    additionalComments: true};

    // add new background themes to this list. View will update dynamically
    $scope.img =  ['images/themes/pink_trees.jpg',
                   'images/themes/city0.jpg',
                   'images/themes/city1.jpg',
                   'images/themes/city2.png',
                   'images/themes/city3.jpg',
                   'images/themes/colors.jpg',
                   'images/themes/flamingo1.jpg',
                   'images/themes/flamingo2.jpg',
                   'images/themes/lake.jpg',
                   'images/themes/maverick.png',
                   'images/themes/old-fashioned.jpg',
                   'images/themes/tron.jpg',
                   'images/themes/walkway.jpg'];
    function splitRows(arr, size) {
  		var newArr = [];
  		for(var i = 0; i < arr.length; i += size) {
  			newArr.push(arr.slice(i, i + size));
  		}
  		return newArr;
  	}
  	$scope.splitData = splitRows($scope.img, 3);
  	$scope.selectedImage = { value : '' };

  	$scope.submitTheme = function() {
        //sets the background image to what the user selected
  		$scope.theme.background_img = $scope.img[$scope.selectedImage.value];
      console.log("BKGD : " + $scope.selectedImage.value);
      var hasTheme = false;
        
      ThemesService.read()
        .success(function(data){
        // $location.path('/dashboard'); // route needs to be set
        console.log('currently has');
        console.log(data);

        if(data=="null"){
            ThemesService.create($scope.theme)
              .success(function(data2){ 
                // $location.path('/dashboard'); // route needs to be set
                console.log("create");
                console.log(data2);
              })
              .error(function(err){
                $scope.message = 'Error selecting theme.';
                console.log("Theme selction failed.");
              });
        }

        if($scope.selectedImage.value !== ''){
          ThemesService.update($scope.theme)
            .success(function(data3){
              // $location.path('/dashboard'); // route needs to be set
              console.log("updated");
              console.log(data3);
              $scope.message = "Theme updated successfully!";
            })
            .error(function(err){
              $scope.message = 'Error selecting theme.';
              console.log("Theme selction failed.");
            });
        } 
        else {
            $scope.message = "Please select an image first."
        }
        
        return data;
      })
      
      .error(function(err){
        console.log("Theme selction failed.");
        return err;
      });
  	};

    $scope.clear = function(){
      $scope.theme.background_img = '';
      $scope.selectedImage.value = '';
      $scope.message = '';
    };
}]);

'use strict';

angular.module('themes')
  .service('ThemesService', ['$http', '$rootScope', function($http, $rootScope) {
  	var userid = $rootScope.admin_id;
      
    //method to return the current theme under the admin  
  	this.read = function(){
  		return $http.get('/api/' + $rootScope.admin_id + '/theme');

  	};

    //method that updates the current theme to a new theme
  	this.update = function(theme){

  		console.log("Sending the update req to: " + userid);
  		return $http.put('/api/' + $rootScope.admin_id + '/theme', theme);
  	};

    //method that sets the theme the first time a user selects one
  	this.create = function(theme){
      console.log("Create");
  		return $http.post('/api/' + $rootScope.admin_id + '/theme', theme);
  	};

  	this.delete = function(){
  		// return $http.delete('/api/:user_id/theme');
  	};
  }]);
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

angular.module('checkin').controller('ModalDemoCtrl', ['$scope', '$modal', '$log', 'CheckinService',  function ($scope, $modal, $log, CheckinService) {

  $scope.items = ['item1', 'item2', 'item3'];
  
  //opens the modal that allows the admin to sign back in, displays the html specificed by the template
  $scope.open = function (size) {
    var modalInstance = $modal.open({
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    CheckinService.setModal(modalInstance); // send the modal to the service so the checkin controller can access it

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
}]);

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.
/*
angular.module('checkin').controller('ModalInstanceCtrl',['$scope', '$modalInstance', 'items', function ($scope, $modalInstance, items) {

  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);

*/
'use strict';

//after a user finishes checking in, display thank you page for a brief period of time and go 
//back to checkin screen
angular.module('thankyouCheckIn')
  .controller('CheckInThankYouController', ['$location', '$timeout', function($location, $timeout) {
    $timeout(redirectToCheckin, 5000);
    function redirectToCheckin() {
      $location.path('/checkin')
    }
}]);


'use strict';

angular.module('checkin')
  .directive('patientFormDirective', function () {
    return {
      controller: function($scope, CheckinService, $modal, $timeout){
        function redirectToCheckin() {
          console.log("redirecttoCheckin");
           $scope.form.submitted= false;

          $scope.form.form_fields.forEach(function(field) {
            field.field_value = '';
          });

        }
          
          $scope.submit = function(){
          
              $scope.form.submitted = true;

              for(var i = 0; i < $scope.form.form_fields.length; i++)
              {
                $scope.form.form_fields[i].field_readonly = false;
                console.log($scope.form.form_fields);
              }

              CheckinService.formData.data = $scope.form.form_fields;
              CheckinService.formData.submitted = true;
              //console.log($scope.form.form_fields);

           // console.log("YAY patient directive" );
              CheckinService.submitForm(CheckinService.formData);
              CheckinService.checkinPatient($scope.form.form_fields[0].field_value);
              

              $timeout(redirectToCheckin, 5000);

        };
      },
      templateUrl: 'views/components/patientCheckin/checkin/views/directive-templates/form/form.html',
      restrict: 'E',
      scope: {
        form:'='
      }
    };
  });
'use strict';

angular.module('checkin')
  .service('CheckinService', ['$http', '$rootScope', 'socket', function CheckinService($http, $rootScope, socket) {

    var checkinModal = '';

    //function that gets the theme of the user based off the user id passed in
    this.getTheme = function(id){
      	 console.log(id);
      	 console.log("getThemes");
      	 var path = '/api/'+id+'/theme';
         console.log(path);
      	 return $http.get('/api/' + id + '/theme');
      }; 
      
      //returns the template for the form based off the user id passed in
  	  this.getForms = function(id) {
  	  	console.log(id);
  	  	console.log("getForms");
  	  	var url = '/api/form/template/company/'+id;
  	  	console.log(url);
        return $http.get(url);
      };
      
      this.formData = {};
      
      this.submitForm = function (form) {
           // console.log("YAYYYY submit ");
        //    console.log($rootScope);
            return $http.post('api/form/patient/', {
                _admin_id: $rootScope.admin_id,
                form : form
            });
      };

      this.checkinPatient = function (patient_name) {
          //  console.log("YAYYYY checkin ");
            //console.log($rootScope);
            console.log(patient_name);
            $http.post('/api/patient/checkin', 
              {_admin_id: $rootScope.admin_id, name: patient_name})
            .success(function(data, status, headers, config) {
              console.log("checkinsuccess", data);
              socket.emit('patient_added', {patients: data.queue.patients});
            })
            .error(function(data, status, headers, config) {
              console.log("error", data, status, headers);
            });
      };
    
      // This function takes in the checkinModal data
      this.setModal = function(data){
        checkinModal = data;
      };

      // Closes the checkinModal - 
      this.closeModal = function(){
        if(checkinModal != ''){
          checkinModal.dismiss('cancel'); 
        }else{
          console.log("Error, modal not set");
        }
      };
  }]);
'use strict';

//controller to handle recovery of user password
angular.module('recovery')
	.controller('RecoveryController', ['$scope', '$location', 'RecoveryService', function($scope, $location, RecoveryService){
		$scope.email = '';
		$scope.errMessage = '';

		// This is the functionality for the "recover password" button.
		$scope.recovery = function(){
			if($scope.email == ''){
				$scope.errMessage = 'You must enter a valid email address.'
			}
            
            //if email entered doesn't have a @ or . display an error
            else if($scope.email.indexOf('@')==-1||$scope.email.indexOf('.')==-1){
				$scope.errMessage = 'Invalid Email/Password'
			}
            
            else {
                //pass in email entered to recover function
				RecoveryService.recover($scope.email)
                    //if success, email was sent to the user
					.success(function(data){
						$scope.errMessage = 'Recover password successful.';
						// From here, go to a notification html indicating that an email has been sent to {{$scope.email}}
						$location.path('/registerthx');
						return data;
					})
                
                    //display error message if recover function failed
					.error(function(err){
						console.log('Recover password failed.');
						$scope.errMessage = 'Recover password failed.';
						return err;
					});
			}
		}
	}]);

'use strict';

//controller that displays to the user that their password was recovered and redirects them
//back to sign in after a certain amount of time
angular.module('recoverythx')
	.controller('RecoveryConfirmController', ['$location', '$timeout', function($location, $timeout){
    $timeout(redirectToSignin, 3000);
    
    function redirectToSignin() {
      $location.path('/signin');
    }

	}]);
'use strict';

angular.module('recovery')
  .service('RecoveryService', ['$http', function($http) {
      this.recover = function(email) {
      	// There is no functionality for the password recovery system yet. 
        //return $http.get('/something/here/' + email, something);
      };
  }]);

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

'use strict';

//controller that redirects to the dashboard after a company has registered after a brief period
angular.module('thankyou')
  .controller('ThankYouController', ['$location', '$timeout', function($location, $timeout) {
    $timeout(redirectToSignin, 3000);
    
    function redirectToSignin() {
      $location.path('../../../dashboard/views/dashboard.html')
    }
}]);

'use strict';

/*
directive that was found online that handles determining the strength of a password
and displaying that strength to the user as a strength indicator bar.
*/
angular.module('register')
.directive('checkStrength', function () {

    return {
        replace: false,
        restrict: 'EACM',
        link: function (scope, iElement, iAttrs) {

            var strength = {
                colors: ['#F00', '#F90', '#FF0', '#9F0', '#0F0'],
                mesureStrength: function (p) {

                    var _force = 0;                    
                    var _regex = /[$-/:-?{-~!"^_`\[\]]/g;
                                          
                    var _lowerLetters = /[a-z]+/.test(p);                    
                    var _upperLetters = /[A-Z]+/.test(p);
                    var _numbers = /[0-9]+/.test(p);
                    var _symbols = _regex.test(p);
                                          
                    var _flags = [_lowerLetters, _upperLetters, _numbers, _symbols];                    
                    var _passedMatches = $.grep(_flags, function (el) { return el === true; }).length;                                          
                    
                    _force += 2 * p.length + ((p.length >= 10) ? 1 : 0);
                    _force += _passedMatches * 10;
                        
                    // penality (short password)
                    _force = (p.length <= 6) ? Math.min(_force, 10) : _force;                                      
                    
                    // penality (poor variety of characters)
                    _force = (_passedMatches == 1) ? Math.min(_force, 10) : _force;
                    _force = (_passedMatches == 2) ? Math.min(_force, 20) : _force;
                    _force = (_passedMatches == 3) ? Math.min(_force, 40) : _force;
                    
                    return _force;

                },
                getColor: function (s) {

                    var idx = 0;
                    if (s <= 10) { idx = 0; }
                    else if (s <= 20) { idx = 1; }
                    else if (s <= 30) { idx = 2; }
                    else if (s <= 40) { idx = 3; }
                    else { idx = 4; }

                    return { idx: idx + 1, col: this.colors[idx] };

                }
            };

            scope.$watch(iAttrs.checkStrength, function () {
                if (scope.user.password === '') {
                    iElement.css({ "display": "none"  });
                } else {
                    var c = strength.getColor(strength.mesureStrength(scope.user.password));
                    iElement.css({ "display": "inline" });
                    iElement.children('li')
                        .css({ "background": "#DDD" })
                        .slice(0, c.idx)
                        .css({ "background": c.col });
                }
            });

        },
        template: '<li class="point"></li><li class="point"></li><li class="point"></li><li class="point"></li><li class="point"></li>'
    };

});
'use strict';

angular.module('register')
  .service('RegisterService', ['$http', function($http) {
  	  //Works with the registration API to post to server, takes in a user object
      //that contains a company name, password, email, and phone number
      this.reg = function(user) {
        return $http.post('/auth/signup', user);
      };
  }]);
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

'use strict';

angular.module('signin')
  .service('SigninService', ['$http', function($http) {
  	  //API call to login, takes in a user object with an 
      //email and password and verifies if it is valid
      this.login = function(user) {
        return $http.post('/auth/login', user);
      };
  }]);
'use strict';

function DeleteModalInstanceCtrl($modalInstance){
	var vm = this;

	vm.ok = function () {
		console.log('Deleted field');
    	$modalInstance.close();
  	};

  	vm.cancel = function () {
    	$modalInstance.dismiss('cancel');
  	};
}

angular.module('DashboardFormBuilderModule')
	.controller('DeleteModalInstanceCtrl', ['$modalInstance', DeleteModalInstanceCtrl]);
'use strict';

angular.module('DashboardFormBuilderModule')
.controller('FormCreateController', function ($scope, $modal, FormService, $http, $filter, $rootScope) {

  $scope.templateId = 0;
  // preview form mode
  $scope.previewMode = false;
  $scope.editMode = false;
  $scope.showDelete = false;
  $scope.showReset = false;


  // new form
  $scope.form = {};
  $scope.form.form_name = 'My Form';
  $scope.form.form_fields = [];

  // previewForm - for preview purposes, form will be copied into this
  // otherwise, actual form might get manipulated in preview mode
  $scope.previewForm = {};

  // add new field drop-down:
  $scope.addField = {};
  $scope.addField.types = FormService.fields;
  $scope.addField.new = $scope.addField.types[0].name;
  $scope.addField.lastAddedID = 1;

  // accordion settings
  $scope.accordion = {};
  $scope.accordion.oneAtATime = true;

  $scope.$on('$viewContentLoaded', function() {
        $http.get('/api/form/template/company/' + $rootScope.admin_id).
         
         success(function(data, status, headers, config) {
          console.log(data);
           if (typeof data.template !== 'undefined' && typeof data.template !== null && typeof data.template.form_fields !== 'undefined' && data.template.form_fields !== null){

              for(var i = 0; i < data.template.form_fields.length; i++)
              {
                data.template.form_fields[i].field_readonly = true;
              }
              console.log(data.template);

              $scope.form = data.template;//JSON.parse(data.template);
              $scope.form.submitted = false;

              FormService.formData = data.template;

              if(data.template.form_fields){
                $scope.addField.lastAddedID = $scope.form.form_fields.length;
              } else {
                $scope.form.form_fields = [];
              }
            } else {
              console.log("New form");
             var DefaultField            = {"field_id" : 1,
                                            "field_title" : "Name",
                                            "field_type" : "textfield",
                                            "field_placeholder" : "Name",
                                            "field_required" : true,
                                            "field_disabled" : false,
                                            "field_readonly" : true};
              $scope.form.form_fields.push(DefaultField);
              
              if($scope.previewMode === false) {
                $scope.previewMode = true;
              }
              $scope.form.submitted = false;
              FormService.formData = $scope.form;

            }
           console.log(data);

         }).
         error(function(data, status, headers, config) {
            // no saved templates
         });

         $scope.previewMode = true;
  });

  // create new field button click
  $scope.addNewField = function(){
    // incr field_id counter
    $scope.addField.lastAddedID++;
    var newField = {
      "field_id" : $scope.addField.lastAddedID,
      "field_title" : "New field - " + ($scope.addField.lastAddedID),
      "field_type" : $scope.addField.new,
      "field_placeholder" : "",
      "field_required" : true,
      "field_disabled" : false,
      "field_readonly" : true
    };

    // put newField into fields array
    $scope.form.form_fields.push(newField);
    if($scope.previewMode === false) {
      $scope.previewMode = true;
    }
    $scope.form.submitted = false;
    FormService.formData = $scope.form;
  };

  // deletes particular field on button click
  $scope.deleteField = function (field_id){
    // confirmed delete
    for(var i = 0; i < $scope.form.form_fields.length; i++){
      if($scope.form.form_fields[i].field_id == field_id){
        $scope.form.form_fields.splice(i, 1);
        break;
      }
    }
    if($scope.form.form_fields === null || $scope.form.form_fields.length === 0) {
      $scope.previewMode = false;
      $scope.form.submitted = false;
    }
  };

  // add new option to the field
  $scope.addOption = function (field){
    if(!field.field_options) {
      field.field_options = [];
    }

    var lastOptionID = 0;

    if(field.field_options[field.field_options.length-1]) {
      lastOptionID = field.field_options[field.field_options.length-1].option_id;
    }

      // new option's id
    var option_id = lastOptionID + 1;

    var newOption = {
      "option_id" : option_id,
      "option_title" : "Option " + option_id,
      "option_value" : option_id
    };

    // put new option into field_options array
    field.field_options.push(newOption);
  };

  // delete particular option
  $scope.deleteOption = function (field, option){
    for(var i = 0; i < field.field_options.length; i++){
      if(field.field_options[i].option_id == option.option_id){
        field.field_options.splice(i, 1);
        break;
      }
    }
  };

  // decides whether field options block will be shown (true for dropdown and radio fields)
  $scope.showAddOptions = function (field){
    if(field.field_type == "radio" || field.field_type == "dropdown")
      return true;
    else
      return false;
  };

  // deletes all the fields
  $scope.reset = function (){
    if($scope.form.form_fields !== null && $scope.form.form_fields.length !== 0) {
        $scope.form.form_fields.splice(1, $scope.form.form_fields.length);
        $scope.addField.lastAddedID = 0;
        $scope.previewMode = true;
        $scope.form.submitted = false;
    }
  };
});

'use strict';

angular.module('DashboardFormBuilderModule')
  .controller('FormEditController', function ($scope, $modal, FormService, $http, $filter, $location) {

  $scope.templateId = 0;
  $scope.prevJson = $filter('json')($scope.form);
  // preview form mode
  $scope.previewMode = false;
  $scope.editMode = false;

  // new form
  $scope.form = {};
  $scope.form.form_id = 1;
  $scope.form.form_name = 'My Form';
  $scope.form.form_fields = [];

  // previewForm - for preview purposes, form will be copied into this
  // otherwise, actual form might get manipulated in preview mode
  $scope.previewForm = {};

  // add new field drop-down:
  $scope.addField = {};
  $scope.addField.types = FormService.fields;
  $scope.addField.new = $scope.addField.types[0].name;
  $scope.addField.lastAddedID = 0;

  // accordion settings
  $scope.accordion = {};
  $scope.accordion.oneAtATime = true;

  // create new field button click
  $scope.addNewField = function(){
    // incr field_id counter
    $scope.addField.lastAddedID++;
    var newField = {
      "field_id" : $scope.addField.lastAddedID,
      "field_title" : "New field - " + ($scope.addField.lastAddedID),
      "field_type" : $scope.addField.new,
      "field_placeholder" : "",
      "field_required" : true,
      "field_disabled" : false
    };
    //$scope
    // put newField into fields array
    $scope.form.form_fields.push(newField);
    if($scope.previewMode == false) {
      $scope.previewMode = true;
    }
    $scope.form.submitted = false;
  };
  var removeOptions = function(){
    for(var i = 0; i < $scope.form.form_fields.length; i++){
          if($scope.form.form_fields[i].field_type != "radio" || $scope.addField.new != "dropdown"){
              $scope.form.form_fields[i].field_options = [];
          }
        }
  };
// deletes particular field on button click
  $scope.deleteField = function (field_id){
    var modalInstance = $modal.open({
        templateUrl: 'views/components/dashboard/formBuilder/views/deleteModal.html',
        controller : 'DeleteModalInstanceCtrl',
        controllerAs : 'vm'
      });

    modalInstance.result.then(function() {
      // confirmed delete
      for(var i = 0; i < $scope.form.form_fields.length; i++){
        if($scope.form.form_fields[i].field_id == field_id){
          $scope.form.form_fields.splice(i, 1);
          break;
        }
      }
      if($scope.form.form_fields === null || $scope.form.form_fields.length === 0) {
        $scope.previewMode = false;
        $scope.form.submitted = false;
      }
    }, function() {
      // delete canceled
    }
    );
  };

  // add new option to the field
  $scope.addOption = function (field){
    if(!field.field_options) {
      field.field_options = [];
    }

    var lastOptionID = 0;

    if(field.field_options[field.field_options.length-1]) {
      lastOptionID = field.field_options[field.field_options.length-1].option_id;
    }

      // new option's id
    var option_id = lastOptionID + 1;

    var newOption = {
      "option_id" : option_id,
      "option_title" : "Option " + option_id,
      "option_value" : option_id
    };

    // put new option into field_options array
    field.field_options.push(newOption);
  };

  // delete particular option
  $scope.deleteOption = function (field, option){
    for(var i = 0; i < field.field_options.length; i++){
      if(field.field_options[i].option_id == option.option_id){
        field.field_options.splice(i, 1);
        break;
      }
    }
  };


   // posts form template as Json
  $scope.postJson = function (){

    removeOptions();
    // object of this form template
    var formJson = $filter('json')($scope.form);
     var putJson = { 
                        "template":formJson,
                        "template_id":$scope.templateId//"54f8f382191b38ec26dd57a6"
                    };
     $http.put('/api/form/template', putJson).
     success(function(data, status, headers, config) {
       // this callback will be called asynchronously
       // when the response is available
       console.log("put success");
       alert("Data successfully Updated!");
       console.log(data);
       // revert to previous json
       //$scope.form = JSON.parse($scope.prevJson);

     }).
     error(function(data, status, headers, config) {
       // called asynchronously if an error occurs
       // or server returns response with an error status.
       console.log("no forms posted");
     });
  };      

  // fetch a template from the server
  $scope.fetchSavedTemplate = function(){
     $http.get('/api/form/template/company/54f8f23546b787e8335980e7').
         success(function(data, status, headers, config) {
           console.log(data);
           //$scope.prevJson = $filter('json')($scope.form);
           $scope.templateId = data._id;
           $scope.form = JSON.parse(data.template);
           $scope.addField.lastAddedID = $scope.form.form_fields.length;
         }).
         error(function(data, status, headers, config) {
           alert("You have no saved templates.");
         });
  }; 

  // run when app is loaded
  $scope.$on('$viewContentLoaded', function() {
        $http.get('/api/form/template/company/54f8f23546b787e8335980e7').
         success(function(data, status, headers, config) {
           console.log(data);
           //$scope.prevJson = $filter('json')($scope.form);
           $scope.templateId = data._id;
           $scope.form = JSON.parse(data.template);
           $scope.addField.lastAddedID = $scope.form.form_fields.length;
           
           if($scope.previewMode == false) {
             $scope.previewMode = true;
           }
           $scope.form.submitted = false;
         }).
         
         error(function(data, status, headers, config) {
           alert("You have no saved templates.");
         });
  });

  $scope.editOn = function(){
   $location.path('/createform');
  };

  // decides whether field options block will be shown (true for dropdown and radio fields)
  $scope.showAddOptions = function (field){
    if(field.field_type == "radio" || field.field_type == "dropdown")
      return true;
    else
      return false;
  };

  // deletes all the fields
  $scope.reset = function (){
    if($scope.form.form_fields !== null && $scope.form.form_fields.length !== 0) {
      var modalInstance = $modal.open({
          templateUrl: 'views/components/dashboard/formBuilder/views/deleteModal.html',
          controller : 'DeleteModalInstanceCtrl',
          controllerAs : 'vm'
        });

      modalInstance.result.then(function() {
        // confirmed reset
        $scope.form.form_fields.splice(0, $scope.form.form_fields.length);
        $scope.addField.lastAddedID = 0;
        $scope.previewMode = false;
        $scope.form.submitted = false;
      }, function() {
        // reset canceled
      }
      );
    }
  };

});

'use strict';

function ModalInstanceCtrl($modalInstance){
	var vm = this;

	vm.title = 'Error';
	vm.body = 'No fields added yet, please add fields to the form before preview.';
	vm.btns = [{result:'ok', label: 'OK', cssClass: 'btn-primary btn'}];

	vm.ok = function () {
		console.log('hey');
    	$modalInstance.close();
  	};
}

angular.module('DashboardFormBuilderModule')
	.controller('ModalInstanceCtrl', ['$modalInstance', ModalInstanceCtrl]);
'use strict';

// angularApp.controller('HeaderCtrl', function ($scope, $location) {
//         $scope.$location = $location;
// });

'use strict';

// angularApp.controller('MainCtrl', function ($scope) {

// });

'use strict';

angular.module('DashboardFormBuilderModule')
	.controller('ViewCtrl', function ($scope, FormService, $routeParams) {
	  $scope.form = {};
		// read form with given id
		FormService.form($routeParams.id).then(function(form) {
			$scope.form = form;
		});
	});

'use strict';

angular.module('DashboardFormBuilderModule').directive('fieldDirective', function ($http, $compile) {

        var getTemplateUrl = function(field) {
            var type = field.field_type;
            var templateUrl = '';

            switch(type) {
                case 'textfield':
                    templateUrl = 'views/components/dashboard/formBuilder/views/directive-templates/field/textfield.html';
                    break;
                case 'email':
                    templateUrl = 'views/components/dashboard/formBuilder/views/directive-templates/field/email.html';
                    break;
                case 'textarea':
                    templateUrl = 'views/components/dashboard/formBuilder/views/directive-templates/field/textarea.html';
                    break;
                case 'checkbox':
                    templateUrl = 'views/components/dashboard/formBuilder/views/directive-templates/field/checkbox.html';
                    break;
                case 'date':
                    templateUrl = 'views/components/dashboard/formBuilder/views/directive-templates/field/date.html';
                    break;
                case 'dropdown':
                    templateUrl = 'views/components/dashboard/formBuilder/views/directive-templates/field/dropdown.html';
                    break;
                case 'hidden':
                    templateUrl = 'views/components/dashboard/formBuilder/views/directive-templates/field/hidden.html';
                    break;
                case 'password':
                    templateUrl = 'views/components/dashboard/formBuilder/views/directive-templates/field/password.html';
                    break;
                case 'radio':
                    templateUrl = 'views/components/dashboard/formBuilder/views/directive-templates/field/radio.html';
                    break;
            }
            return templateUrl;
        };

        var linker = function(scope, element) {
            // GET template content from path
            var templateUrl = getTemplateUrl(scope.field);
            $http.get(templateUrl).success(function(data) {
                element.html(data);
                $compile(element.contents())(scope);
            });
        };

        return {
            template: '<div>{{field}}</div>',
            restrict: 'E',
            scope: {
                field:'='
            },
            link: linker
        };
  });

'use strict';

angular.module('DashboardFormBuilderModule')
  .directive('formDirective', function () {
    return {
      controller: function($scope, FormService, $modal, $timeout){

    function redirectToCheckin() {
      console.log("redirecttoCheckin");
       $scope.form.submitted= false;
    }

        $scope.submit = function(){
          
              $scope.form.submitted = true;

              for(var i = 0; i < $scope.form.form_fields.length; i++)
              {
                $scope.form.form_fields[i].field_readonly = false;
                $scope.form.form_fields[i].field_id = i+1;
                console.log($scope.form.form_fields);
              }

              FormService.formData.submitted = true;
              //console.log($scope.form.form_fields);

              FormService.createNewForm(FormService.formData);
              $timeout(redirectToCheckin, 5000);
        };
      
      },
      templateUrl: 'views/components/dashboard/formBuilder/views/directive-templates/form/form.html',
      restrict: 'E',
      scope: {
        form:'='
      }
    };
  });
'use strict';

angular.module('DashboardFormBuilderModule').service('FormService', function FormService($http, $rootScope) {

    var formsJsonPath = './static-data/sample_forms.json';

    return {
        fields:[
            {
                name : 'textfield',
                value : 'Textfield'
            },
            {
                name : 'email',
                value : 'E-mail'
            },
            {
                name : 'password',
                value : 'Password'
            },
            {
                name : 'radio',
                value : 'Radio Buttons'
            },
            {
                name : 'dropdown',
                value : 'Dropdown List'
            },
            {
                name : 'date',
                value : 'Date'
            },
            {
                name : 'textarea',
                value : 'Text Area'
            },
            {
                name : 'checkbox',
                value : 'Checkbox'
            },
            {
                name : 'hidden',
                value : 'Hidden'
            }
        ],
        formData:{},
        form:function (id) {
            // $http returns a promise, which has a then function, which also returns a promise
            return $http.get(formsJsonPath).then(function (response) {
                console.log('ddd', response);
                var requestedForm = {};
                angular.forEach(response.data, function (form) {
                    if (form.form_id == id) requestedForm = form;
                });
                return requestedForm;
            });
        },
        forms: function() {
            return $http.get(formsJsonPath).then(function (response) {
                return response.data;
            });
        },
        getForm: function () {
            return $http.get('api/form/template/company/' + $rootScope.admin_id).then(function(response){
                return response;
            });
        },
        createNewForm: function (form) {
            console.log("create ");
            console.log(form);
            return $http.post('api/form/template/' + $rootScope.admin_id, {
                template : form

            });
        }
    };
});

'use strict';

angular.module('theme')
  .controller('themeController', ['$scope', function($scope){
    $scope.arrayOfUrl = ["/images/1.jpg"
                     ,"/images/2.jpg"
                     ,"/images/3.jpg"
                     ,"/images/4.jpg"
                     ,"/images/5.jpg"];
  	
  }]);

'use strict';

angular.module('theme')
  .directive('themeChoice', function() {
  	return {
      restrict: 'E',
      templateUrl: 'views/components/dashboard/formBuilder/themeChoice/views/themeChoice.html',
      controller: 'ThemeController',
      controllerAs: 'themeCtrl'
    };
  })
  .controller('themeController', ['$scope', function($scope){
    $scope.arrayOfUrl = ["/images/1.jpg"
                     ,"/images/2.jpg"
                     ,"/images/3.jpg"
                     ,"/images/4.jpg"
                     ,"/images/5.jpg"];
  	
  }]);
