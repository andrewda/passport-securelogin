const url = require('url');
const SecureLogin = require('securelogin');

function SLMiddleware(opts) {
    function middleware(req, res, next) {
        const obj = SecureLogin.verify(req.body.sltoken, { domains: opts.domains });

        req.securelogin = {};

        if (obj.scope) {
            // Convert scope to object
            req.securelogin.scope = url.parse('http://a.dev/?' + obj.scope, true).query;
        } else {
            req.securelogin.error = obj.error;
        }

        next();
    }

    return middleware;
}

module.exports = SLMiddleware;
