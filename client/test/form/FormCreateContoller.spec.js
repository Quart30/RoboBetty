describe('Form Create Controller', function() {
  beforeEach(module("ui.bootstrap"));
  beforeEach(module("DashboardFormBuilderModule"));

  var controller, scope, FormService, editOnAPI, httpBackend;

  beforeEach(inject(function($controller,$rootScope,$modal,_FormService_,$http,$filter,$location,_$httpBackend_){
    scope = $rootScope.$new();
    httpBackend = _$httpBackend_;
    controller = $controller('FormCreateController', {
      $scope: scope,
      $modal: $modal,
      FormService: _FormService_,
      $http: $http, 
      $filter: $filter, 
      $location: $location
    });
  }));

  beforeEach(function(){
    editOnAPI= '/api/form/template/company/54f8f23546b787e8335980e7';
    httpBackend.whenGET(editOnAPI).respond(200);
  });

  it('Should be defined', function() {
    expect(controller).to.be.defined;
    expect(FormService).to.be.defined;
  });

  describe('editOn()',function() {
    it('Should get api route', function() {
      httpBackend.expectGET(editOnAPI);
      });

    it('Should define variables', function() {
      expect(controller.templateID).to.be.defined;
    });
  })

  describe('Field tests', function() {

    it('addNewField()', function(){
      scope.addNewField();
      expect(scope.addField.lastAddedID).to.equal(2);
      expect(scope.form.form_fields.length).to.equal(1);
      scope.addNewField();
      scope.addNewField();
      expect(scope.addField.lastAddedID).to.equal(4);
      expect(scope.form.form_fields.length).to.equal(3);


    });
    it('deleteField()',function(){
      scope.addNewField();
      expect(scope.addField.lastAddedID).to.equal(2);
      expect(scope.form.form_fields.length).to.equal(1);
      scope.deleteField(1);
      expect(scope.addField.lastAddedID).to.equal(2);
      expect(scope.form.form_fields.length).to.equal(1);
    });
  });

});
