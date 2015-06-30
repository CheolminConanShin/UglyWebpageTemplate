var express = require('express');
var passport = require('passport');
var router = express.Router();
var queryService = require('../config/queryService.js');
var logger = require('../config/logger.js').logger();
var mmFn = require('../config/mmFn.js');
var i18n = require('i18n');


/* GET home page. */
router.get('/', mmFn.ensureAuthenticated, function(req, res, next) {
 	console.log("inside router");
 	res.redirect('/index');
});

router.get('/login', function(req, res, next){
	var message = (req.flash('loginError') ? req.flash('loginError') : "");
	res.render('login', {message: message});
});

router.post('/login.do', passport.authenticate('login', {failureRedirect: '/login', failureFlash: true}), function(req, res, next){
	res.cookie('lang', req.user.lang);
	res.redirect('/index');
});

router.get('/logout', function(req, res, next){
	req.session.destroy();
	req.logout();
	res.render('login');
});

router.get('/index', mmFn.ensureAuthenticated, function(req, res, next){
	console.log("inside index router");
	res.render('index', {user: req.user});
});

router.get('/home', mmFn.ensureAuthenticated, function(req, res, next) {
	res.render('home');
});

router.get('/products', mmFn.ensureAuthenticated, function(req, res, next) {
	res.render('products');
});

router.get('/company', mmFn.ensureAuthenticated, function(req, res, next) {
	res.render('company');
});

router.get('/contact', mmFn.ensureAuthenticated, function(req, res, next) {
	res.render('contact');
});

router.post('/lang', function(req, res){
	res.send(i18n.__(req.body['msg']));
});
module.exports = router;
