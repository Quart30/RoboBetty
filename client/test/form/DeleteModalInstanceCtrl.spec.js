describe('DeleteModalInstanceCtrl',function() {
  beforeEach(module("ui.bootstrap"));
  beforeEach(module("DashboardFormBuilderModule"));

  var scope, httpBackend, controller, modalInstance;

  beforeEach(inject(function($controller,$rootScope,_$httpBackend_,_$modal_){
    scope = $rootScope.$new();
    httpBackend = _$httpBackend_;

    modalInstance = _$modal_.open({
      templateUrl: 'deleteModal.html'
    });

    controller = $controller('DeleteModalInstanceCtrl',{
      $scope:scope,
      $modalInstance:modalInstance
    })

  }));

  it('Should be defined', function(){
    expect(controller).to.be.defined;
  });

  describe('Testing ok() function', function(){
    it('vm.ok()',function(){
    controller.ok();
    });
    it('Mock calls return value given',function(){
      sinon.stub(controller,'ok').returns(1);
      controller.ok();
      expect(controller.ok()).to.equal(1);
    });
  });
  
  describe('Testing cancel() function', function(){
    it('vm.cancel()',function(){
    controller.cancel();
    });
    it('Mock calls return value given',function(){
      sinon.stub(controller,'cancel').returns(1);
      controller.ok();
      expect(controller.cancel()).to.equal(1);
    });
  });

  
});


