# Passport SecureLogin

A Passport strategy and Express middleware for SecureLogin authentication.

## What is It?

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

### Authentication

Use the SecureLogin strategy as you would any other Passport strategy. It's
super easy. Here's how you would get it set up:

```javascript
passport.use(new SecureLogin.Strategy({ domains: 'http://c.dev:3001' }));

app.post('/login', passport.authenticate('securelogin', { session: true }),
    (req, res) => res.sendStatus(200));
```

You can also check to make sure you want to let a user login. This could be
useful if you only want to allow only certain people to authenticate (e.g. a
private blog).

```javascript
passport.use(new SecureLogin.Strategy({ domains: 'http://c.dev:3001' },
    (user, done) => {
        // Do some verification here, then call `done(err, user, info)`
        if (user.pubkey === 'WfgIE2wK/9N3PQE5KpZOCwNEPVAFV3c8T6NweX+dSos=') {
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
app.post('/sendmoney', SecureLogin.Middleware({ domains: 'http://c.dev:3001' }),
    (req, res) => {
        console.log(`${req.user.pubkey} -> $${req.scope.amount} -> ${req.scope.address}`);
        res.json(req.scope);
    });
```

When SecureLogin responds to the `/sendmoney` callback URL (which we define in
the client-side JavaScript), the middleware will verify the response and set
`req.securelogin.scope` to the verified scope if the verification is successful.
Otherwise, `req.securelogin.error` will contain the error.

## Example

An example application can be found in the `/example` directory. To run the
example, `cd` into the directory, `npm install` the dependencies, then run
`node server`. You should be able to visit `http://localhost:3001` to see the
live app. A working heroku
