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
