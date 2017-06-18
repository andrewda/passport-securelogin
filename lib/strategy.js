/**
 * Module dependencies.
 */
const Strategy = require('passport-strategy').Strategy;
const SecureLogin = require('securelogin');

/**
 * `SLStrategy` constructor.
 *
 * The SecureLogin authentication strategy authenticates requests by verifiying
 * the token sent by SecureLogin.
 *
 * Applications may supply a `validate` callback which accepts a `user` object
 * and calls the `done` callback supplying a `user`, which should be set to
 * `false` if the user should not be authenticated. If an exception occured,
 * `err` should be set.
 *
 * IMPORTANT: Do not trust the email returned by SecureLogin or use it as a
 * unique key. It is only a suggestion, and may not be unique as the user is not
 * required to verify their email. Instead, use the user's public key as their
 * unique identifier.
 *
 * Options:
 *   - `domains`  a string or array of strings containing acceptable domains
 *
 * Examples:
 *
 *     passport.use(new SLStrategy({
 *         domains: [ 'c.dev:3001', 'http://my.app', 'https://second.app' ]
 *       },
 *       function(user, done) {
 *         User.find({ pubkey: user.pubkey }, function (err, user) {
 *           done(err, user);
 *         });
 *       }
 *     ));
 *
 * @param {Object} options
 * @param {Function} validate
 * @api public
 */
function SLStrategy(options, validate) {
    options = options || {};
    options.domains = options.domains || [];

    Strategy.call(this);

    this.name = 'securelogin';
    this._domains = options.domains;
    this._passReqToCallback = options.passReqToCallback;
    this._verify = validate;
}

SLStrategy.prototype.authenticate = function(req) {
    const obj = SecureLogin.verify(req.body.sltoken, { domains: this._domains });

    if (obj.errors) return this.error(obj.errors);

    const verified = (err, user, info) => {
        if (err) return this.error(err);
        if (!user) return this.fail(info);

        this.success(user, info);
    }

    const user = {
        email: obj.email,
        authkeys: obj.authkeys
    };

    if (typeof this._verify === 'function') {
        if (this._passReqToCallback) {
            this._verify(req, user, verified);
        } else {
            this._verify(user, verified);
        }
    } else {
        this.success(user);
    }
}

/**
 * Expose `Strategy`.
 */
module.exports = SLStrategy;
