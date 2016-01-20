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