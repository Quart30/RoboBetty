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