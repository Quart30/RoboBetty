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