var strategy = require('..');

describe('passport-securelogin', () => {

    it('should export Strategy constructor directly from package', () => {
        expect(strategy).to.be.a('function');
        expect(strategy).to.equal(strategy.Strategy);
    });

    it('should export Strategy constructor', () => {
        expect(strategy.Strategy).to.be.a('function');
    });

    it('should export SLMiddleware constructor', () => {
        expect(strategy.SLMiddleware).to.be.a('function');
    });

    it('should export ScopeMiddleware constructor', () => {
        expect(strategy.ScopeMiddleware).to.be.a('function');
    });

});
