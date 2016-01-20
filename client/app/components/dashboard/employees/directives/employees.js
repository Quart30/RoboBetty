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