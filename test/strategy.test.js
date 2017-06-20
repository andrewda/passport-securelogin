const Strategy = require('../lib/strategy');

describe('Strategy', () => {

    const strategy = new Strategy();

    it('should be named securelogin', () => {
        expect(strategy.name).to.equal('securelogin');
    });

});
