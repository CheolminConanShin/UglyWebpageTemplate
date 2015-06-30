var logger = require('./logger.js').logger();

module.exports = {
		
	ensureAuthenticated : function (req, res, next) {
	//	logger.debug(req.isAuthenticated());
		console.log(req.isAuthenticated());
	    // 로그인이 되어 있으면, 다음 파이프라인으로 진행
	    if (req.isAuthenticated()) { 
	    	logger.debug("--------------  "+ req.user.usernm);
	    	return next(); 
	    }
	    // 로그인이 안되어 있으면, login 페이지로 진행
		res.redirect('/login');
	}
	
};