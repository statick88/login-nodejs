const express = require('express');
const { default: next } = require('next');
const passport = require('passport');
const route = express.Router();


route.get('/', (req, res, next) => {
    res.render('index');
});

route.get('/signup', (req, res, next) => {
    res.render('signup');

});

route.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    passReqToCallback: true
}));

route.get('/signin', (req, res, next) => {
    res.render('signin');
});

route.post('/signin', passport.authenticate('local-signin', {
    successRedirect: '/profile',
    failureRedirect: '/signin',
    passReqToCallback: true
}));

route.get('/logout', (req, res, next) => {
    req.logout(function(err){
        if(err){
            return next(err);
        }
        res.redirect('/');
    });
});

route.get('/profile', isAuthenticated, (req, res, next) => {
    res.render('profile');
});

function isAuthenticated(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
};

module.exports = route;