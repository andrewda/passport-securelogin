# Passport SecureLogin

[![Travis][travis-img]][travis-url]
[![Coveralls][coveralls-img]][coveralls-url]
[![Release][release-img]][release-url]
[![Downloads][downloads-img]][downloads-url]
[![License][license-img]][license-url]

A Passport strategy and Express middleware for SecureLogin authentication.

## What Is SecureLogin?

> SecureLogin is a decentralized authentication protocol for websites and apps.
> Classic passwords/2FA are poorly designed, hard to backup and inconvenient to
> use. SecureLogin is an all-in-one solution that creates a cryptographic
> private key from your email and master password to sign in everywhere and
> helps you forget about passwords.

Learn more about SecureLogin [here](https://github.com/sakurity/securelogin).

This module provides a set of useful tools to develop Node.js apps that use the
SecureLogin protocol. You can easily provide authentication by using the
Passport strategy, and confirm important actions using the included Express
middleware. See [usage](#usage) below.

## Usage

### Authentication with Passport

Use the SecureLogin strategy as you would any other Passport strategy. It's
super easy. Here's how you would get it set up:

```javascript
passport.use(new SecureLogin.Strategy({ domains: 'http://c.dev:3001' }));

app.post('/login', passport.authenticate('securelogin', { session: true }),
    (req, res) => res.sendStatus(200));
```

You can also check to make sure you want to let a user login. This could be
useful if you only want to allow only certain people to authenticate (e.g. a
private blog or beta website).

```javascript
passport.use(new SecureLogin.Strategy({ domains: 'http://c.dev:3001' },
    (user, done) => {
        // Do some verification here, then call `done(err, user, info)`
        if (user.authkeys.public === 'WfgIE2wK/9N3PQE5KpZOCwNEPVAFV3c8T6NweX+dSos=') {
            done(null, user);
        } else {
            done(null, false, 'not allowed to authenticate');
        }
    }));

app.post('/login', passport.authenticate('securelogin', { session: true }),
    (req, res) => res.sendStatus(200));
```

### Action Confirmation

Important actions should be verified to make sure they are being performed by
the person who they claim to be. This can be easily done using this module by
using something like the following Express route:

```javascript
app.post('/sendmoney', SecureLogin.ScopeMiddleware({ domains: 'http://c.dev:3001' }),
    (req, res) => {
        console.log(`${req.user.authkeys.public} -> $${req.securelogin.scope.amount} -> ${req.securelogin.scope.address}`);
        res.json(req.securelogin.scope);
    });
```

When SecureLogin responds to the `/sendmoney` callback URL (which we define in
the client-side JavaScript), the middleware will verify the response and set
`req.securelogin.scope` to the verified scope if the verification is successful.
Otherwise, `req.securelogin.errors` will contain the errors.

### Profile Change

An important part of the SecureLogin protocol is the ability to change profiles.
This could include a user changing their email and/or password, which will
also change their identifying public key. Here's how you would implement this
endpoint in passport-securelogin:

```javascript
app.post('/securelogin', SecureLogin.SLMiddleware({ domains: DOMAINS },
    (err, newUser, oldPublicKey) => {
        if (err) {
            console.log(err);
        } else {
            // Update user's database entry with the new profile info
        }
    }));
```

The `SecureLogin.SLMiddleware` requires a callback with an `err`, a `newUser`
object and the user's `oldPublicKey`. Assuming you're using the user's public
key as a unique identifier in your database (you should be doing this), you can
use `oldPublicKey` to find the user, and update their profile according to the
`newUser` object.

## Example

An example application can be found in the `/example` directory. To run the
example, `cd` into the directory, `npm install` the dependencies, then run
`node server`. You should be able to visit `http://localhost:3001` to see the
app. This example is also running at https://passport-securelogin.herokuapp.com
if you would like to take a look.

[travis-img]: https://img.shields.io/travis/andrewda/passport-securelogin.svg?style=flat-square
[travis-url]: https://travis-ci.org/andrewda/passport-securelogin
[coveralls-img]: https://img.shields.io/coveralls/andrewda/passport-securelogin.svg?style=flat-square
[coveralls-url]: https://coveralls.io/github/andrewda/passport-securelogin
[release-img]: https://img.shields.io/npm/v/passport-securelogin.svg?style=flat-square
[release-url]: https://www.npmjs.com/package/passport-securelogin
[downloads-img]: https://img.shields.io/npm/dm/passport-securelogin.svg?style=flat-square
[downloads-url]: https://www.npmjs.com/package/passport-securelogin
[license-img]: https://img.shields.io/npm/l/passport-securelogin.svg?style=flat-square
[license-url]: https://github.com/andrewda/passport-securelogin/blob/master/LICENSE
