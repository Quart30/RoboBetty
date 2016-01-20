describe('ProductTab', function() {

  beforeEach(module('product'));

  describe("#Controller", function() {

    var tabCtrl;

    beforeEach(inject(function($controller) {
      tabCtrl = $controller('TabController');
    }));

    it('Should be defined', function() {
      expect(tabCtrl).to.not.be.undefined();
    });

    it('Should be initially set to 1', function (){
      expect(tabCtrl.isSet(1)).to.be.true();
    });

    describe('when calling setTab', function() {

      it('isSet should reflect the change', function() {
        tabCtrl.setTab(3);
        expect(tabCtrl.isSet(3)).to.be.true();

        tabCtrl.setTab(5);
        expect(tabCtrl.isSet(5)).to.be.true();

        expect(tabCtrl.isSet(3)).to.not.be.true();

      });

    });

  });

});