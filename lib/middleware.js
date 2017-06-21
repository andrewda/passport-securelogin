const url = require('url');
const SecureLogin = require('securelogin');

function SLMiddleware(opts, callback) {
    function middleware(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');

        const obj = SecureLogin.verify(req.body.sltoken, { change: true, domains: opts.domains });

        if (obj.message) {
            const scope = url.parse('http://a.dev/?' + obj.message.scope, true).query;
            const newObj = SecureLogin.verify(scope.to, { domains: opts.domains });

            if (newObj.message) {
                const newUser = {
                    email: newObj.email,
                    authkeys: newObj.authkeys
                };

                res.sendStatus(200);
                callback(null, newUser, obj.authkeys.public);
            } else {
                res.sendStatus(401);
                callback({
                    message: 'Error verifying new user profile',
                    errors: newObj.errors,
                    public: obj.authkeys.public
                });
            }
        } else {
            res.sendStatus(401);
            callback({
                message: 'Error verifying change request',
                errors: obj.errors
            });
        }
    }

    return middleware;
}

function ScopeMiddleware(opts) {
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

module.exports = { SLMiddleware, ScopeMiddleware };
