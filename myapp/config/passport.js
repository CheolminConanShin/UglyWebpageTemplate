var LocalStrategy   = require('passport-local').Strategy;
var queryService = require('./queryService.js');
var logger = require('./logger.js').logger();
var i18n = require('i18n');

module.exports = function(passport) {

	// 인증 정보 session 처리
	passport.serializeUser(function(user, done) {
		logger.debug('serializeUser');
		done(null, user);
	});

	//인증 후, 페이지 접근시 마다 사용자 정보를 Session에서 읽어옴.
	passport.deserializeUser(function(user, done) {
		logger.debug('deserializeUser');
		done(null, user);
	});

	// 사용자 로컬DB 인증
	passport.use('login', new LocalStrategy({
			usernameField : 'email',
	        passwordField : 'password',
		    passReqToCallback : true
		}
		, function(req, id, pwd, done) {
			var result = queryService.excute('getUserByIdPwd', [id, pwd], function(err, result){
				if(err) {
					logger.error('error running query', err);
					return done(err);
				}

				if(result.rows[0]) {
					var user = { 'useremail':result.rows[0].user_email,
								 'lang': 'ko'};

					i18n.setLocale('ko');
					return done(null, user);
				} else {
					logger.info("["+id+"]>>> loginError', 'No user found");
					return done(null, false, req.flash('loginError', 'No user found. Try again'));
				}
			});
		}
	));

};

