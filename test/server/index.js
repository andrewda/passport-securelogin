const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const SecureLogin = require('../../lib');

// App domains – will be checked against provider and client
const DOMAINS = [ 'localhost:3001' ];

// Tell Passport to use the SecureLogin strategy
passport.use(new SecureLogin.Strategy({ domains: DOMAINS },
    (user, done) => done(null, user)));

// Create a new Express application.
const app = express();

// Configure Express application
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());

// Setup app paths

// Use the SecureLogin strategy to login and send a 200 status code
app.post('/login', (req, res, next) => {
    passport.authenticate('securelogin', (err, user, info) => {
        if (user) {
            res.json(user);
        } else {
            res.status(401).json(info);
        }
    })(req, res, next);
});

// Handle custom route – `req.scope` will contain an object with the verified scope if sucessfull
app.post('/scope', SecureLogin.Middleware({ domains: DOMAINS }),
    (req, res) => {
        if (req.securelogin.scope) res.json(req.securelogin.scope);
        else res.status(401).json(req.securelogin.errors);
    });

module.exports = app;
