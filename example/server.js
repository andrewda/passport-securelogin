const express = require('express');
const session = require('express-session');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const fs = require('fs');
const passport = require('passport');
const SecureLogin = require('../lib');

// App origins – will be checked against provider and client
SecureLogin.origins = process.env.DOMAINS || [ 'localhost:3001', 'http://c.dev:3001' ];

// Tell Passport to use the SecureLogin strategy
passport.use(new SecureLogin.Strategy((user, done) => done(null, user)));

// Serialize and deserialize users – In an actual app, you would use these to fetch user data
// https://stackoverflow.com/a/27637668/2396125
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// Create a new Express application.
const app = express();

// Setup Handlebars rendering
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Configure Express application
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'secret key 123', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Setup app paths

// If user is logged in, render home page with user object – otherwise render login screen
app.get('/', (req, res) => {
    if (req.user) res.render('home', { user: req.user });
    else res.render('login');
});

// Allow users to update their information from SecureLogin
app.post('/securelogin', SecureLogin.SLMiddleware((err, newUser, oldPublicKey) => {
        if (err) {
            console.log(err);
        } else {
            // Update user's database with the new profile info
            console.log(newUser, oldPublicKey);
        }
    }));

// Use the SecureLogin strategy to login and send a 200 status code
app.post('/login', passport.authenticate('securelogin', { session: true }),
    (req, res) => res.sendStatus(200));

// Logout user and redirect them back to homepage
app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

// Handle custom route – `req.scope` will contain an object with the verified scope if sucessfull
app.post('/sendmoney', SecureLogin.ScopeMiddleware(), (req, res) => {
        const scope = req.securelogin.scope;

        console.log(`[TRANSFER] ${req.user.email} -> $${scope.amount} -> ${scope.address}`);
        res.json(scope);
    });

app.listen(process.env.PORT || 3001);
