const express = require('express')
const passport = require('../passport');
const router = express.Router()

//Controller
const siteController = require('../controllers/siteController');

// [GET] /
router.get('/', siteController.index);

// [GET]/ Login
router.get('/login', siteController.login);

// [POST]/ Login
router.post('/login',  passport.authenticate('local', { successRedirect: '/',
                                                        failureRedirect: '/login',
                                                        failureFlash: true }));

// [GET]/ Logout
router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/login');
  });


module.exports = router;