const url = require('url');
const SecureLogin = require('securelogin');

function SLMiddleware(opts) {
    function middleware(req, res, next) {
        const obj = SecureLogin.verify(req.body.sltoken, { domains: opts.domains });

        req.securelogin = {};

        if (obj.message) {
            // Convert scope to object
            req.securelogin.scope = url.parse('http://a.dev/?' + obj.message.scope, true).query;
        } else {
            req.securelogin.errors = obj.errors;
        }

        next();
    }

    return middleware;
}

module.exports = SLMiddleware;
