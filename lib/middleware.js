const url = require('url');
const SecureLogin = require('securelogin');

function SLMiddleware(callback) {
    function middleware(req, res, next) {
        const sl = require('.');

        res.header('Access-Control-Allow-Origin', '*');

        const obj = SecureLogin.verify(req.body.sltoken, { change: true, origins: sl.origins });

        if (obj.message) {
            const scope = url.parse('http://a.dev/?' + obj.message.scope, true).query;
            const newObj = SecureLogin.verify(scope.to, { origins: sl.origins });

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

function ScopeMiddleware() {
    function middleware(req, res, next) {
        const sl = require('.');

        const obj = SecureLogin.verify(req.body.sltoken, { origins: sl.origins });

        req.securelogin = {};

        if (obj.message) {
            req.securelogin.scope = obj.message.scope;
        } else {
            req.securelogin.errors = obj.errors;
        }

        next();
    }

    return middleware;
}

module.exports = { SLMiddleware, ScopeMiddleware };
