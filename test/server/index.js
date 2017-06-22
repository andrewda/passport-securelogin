const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const SecureLogin = require('../../lib');

// App origins – will be checked against provider and client
SecureLogin.origins = [ 'localhost:3001' ];

// Tell Passport to use the SecureLogin strategy
passport.use(new SecureLogin.Strategy((user, done) => done(null, user)));

// Create a new Express application.
const app = express();

// Configure Express application
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());

// Setup app paths

// Allow users to update their information from SecureLogin
app.post('/securelogin', SecureLogin.SLMiddleware(() => {}));

// Use the SecureLogin strategy to login and send a 200 status code
app.post('/login', (req, res, next) => {
    passport.authenticate('securelogin', (err, user, info) => {
        if (err || !user) {
            res.status(401).json(info);
        } else {
            res.json(user);
        }
    })(req, res, next);
});

// Handle custom route – `req.scope` will contain an object with the verified scope if sucessfull
app.post('/scope', SecureLogin.ScopeMiddleware(), (req, res) => {
    if (req.securelogin.errors) res.status(401).json(req.securelogin.errors);
    else res.json(req.securelogin.scope);
});

module.exports = app;
