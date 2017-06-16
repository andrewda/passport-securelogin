/**
 * Module dependencies.
 */
const Strategy = require('./strategy');
const Middleware = require('./middleware');


/**
 * Expose `Strategy` directly from package.
 */
exports = module.exports = Strategy;

/**
 * Export constructors.
 */
exports.Strategy = Strategy;
exports.Middleware = Middleware;
