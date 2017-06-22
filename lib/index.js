/**
 * Module dependencies.
 */
const Strategy = require('./strategy');
const Middleware = require('./middleware');

class SecureLogin {
    static get origins() {
        return this._origins;
    }

    static set origins(urls) {
        if (urls && urls.constructor === Array) this._origins = urls;
        else this._origins = [urls];
    }
}

/**
 * Expose `Strategy` directly from package.
 */
exports = module.exports = SecureLogin;

/**
 * Export constructors.
 */
exports.Strategy = Strategy;
exports.Middleware = Middleware;
exports.SLMiddleware = Middleware.SLMiddleware;
exports.ScopeMiddleware = Middleware.ScopeMiddleware;
