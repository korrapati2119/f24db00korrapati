var express = require('express');
var passport = require('passport');
var router = express.Router();
var Account = require('../models/account');

// Home page
router.get('/', function (req, res) {
  res.render('index', { title: 'vehicle app', user: req.user });
});

// Registration page
router.get('/register', function (req, res) {
  res.render('register', { title: 'Registration' });
});

// Handle Registration
router.post('/register', function (req, res) {
  Account.findOne({ username: req.body.username })
      .then(function (user) {
          if (user != null) {
              console.log("User already exists: " + req.body.username);
              return res.render('register', { 
                  title: 'Registration for vehicles', 
                  message: 'User already exists', 
                  account: req.body.username 
              });
          }
          let newAccount = new Account({ username: req.body.username });
          Account.register(newAccount, req.body.password, function (err, user) {
              if (err) {
                  console.log("Error registering user: " + err);
                  return res.render('register', { 
                      title: 'Registration for vehicles', 
                      message: 'Registration error', 
                      account: req.body.username 
                  });
              }
              console.log('Registration successful');
              res.redirect('/');
          });
      })
      .catch(function (err) {
          console.error("Error during registration: " + err);
          res.render('register', { 
              title: 'Registration for vehicles', 
              message: 'Unexpected error occurred', 
              account: req.body.username 
          });
      });
});

// Login page
router.get('/login', function (req, res) {
  res.render('login', { title: 'Login' });
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
}));

// Logout
router.get('/logout', function (req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

module.exports = router;
