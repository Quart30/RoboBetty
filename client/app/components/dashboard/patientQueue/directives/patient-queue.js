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
