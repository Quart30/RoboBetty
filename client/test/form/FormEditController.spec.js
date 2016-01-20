describe('FormEditController',function() {
  beforeEach(module("ui.bootstrap"));
  beforeEach(module("DashboardFormBuilderModule"));

  var controller;
  var scope;
  var filter;
  var httpBackend;
  var fetchAPI;
  var postAPI;
  var FormService;
  var json = {
              form_id: 1,
              form_name: "Test",
              form_fields: [
                {
                  field_id: 1,
                  field_title: "Name",
                  field_type: "textfield",
                  field_value: "x",
                  field_required: true,
                  field_disabled: false
                }
                ]
            };
  var putJ = {
               template:json,
               template_id:1
             };

  beforeEach(inject(function($controller,$rootScope,$modal,_FormService_,$http,$filter,$location,_$httpBackend_){
    scope = $rootScope.$new();
    httpBackend = _$httpBackend_;
    filter = $filter;
    FormService = _FormService_;

    controller = $controller('FormEditController', {
      $scope:scope,
      $modal:$modal,
      FormService:FormService,
      $http:$http,
      $filter:$filter,
      $location:$location
    });

    }));

  beforeEach(function(){
    fetchAPI = '/api/form/template/company/54f8f23546b787e8335980e7';
    httpBackend.whenGET(fetchAPI).respond(200);
    postAPI = '/api/form/template';
    httpBackend.whenPOST(postAPI).respond(200,putJ);
  });

  it('Should be defined', function() {
    expect(controller).to.be.defined;
    expect(FormService).to.be.defined;
  });

  describe('postJson()',function(){
    it('Should get api route',function(){
     httpBackend.expectPOST(postAPI);
    });
    it('Mock calls return value given',function(){
      sinon.stub(scope,'postJson').returns(1);
      scope.form = json;
      scope.postJson();
      expect(scope.postJson()).to.equal(1);
    });
    it('Should have correct info',function(){
      scope.form = json;
      scope.postJson();

      expect(scope.form.form_name).to.equal("Test");
      expect(scope.form.form_id).to.equal(1);
      expect(scope.form.form_fields).to.be.defined;
    });
  });

  describe('fetchSavedTemplate()',function(){
    it('Should get api route', function() {
      httpBackend.expectGET(fetchAPI);
    });
    it('Mock calls return value given', function(){
      sinon.stub(scope,'fetchSavedTemplate').returns(1);
      scope.fetchSavedTemplate();
      expect(scope.fetchSavedTemplate()).to.equal(1);
    });
    it('Should have correct info',function(){
      scope.fetchSavedTemplate();
      expect(scope.template_id).to.be.defined;
      expect(scope.form).to.be.defined;
    });
  });

});