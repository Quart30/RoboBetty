describe('Modal Instance Controller',function() {
  beforeEach(module("ui.bootstrap"));
  beforeEach(module("DashboardFormBuilderModule"));

  var scope, httpBackend, controller, modalInstance;

  beforeEach(inject(function($controller,$rootScope,_$httpBackend_,_$modal_){
    scope = $rootScope.$new();
    httpBackend = _$httpBackend_;

    modalInstance = _$modal_.open({
      templateUrl: 'modal.html'
    });

    controller = $controller('ModalInstanceCtrl',{
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
    it('Should set variables correctly', function(){
      controller.ok();
      expect(controller.title).to.equal('Error');
      expect(controller.body).to.be.defined;
      expect(controller.btns).to.be.defined;
    });
    it('Mock calls return value given',function(){
      sinon.stub(controller,'ok').returns(1);
      controller.ok();
      expect(controller.ok()).to.equal(1);
    })
  });


  
});