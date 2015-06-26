var express = require('express');
var router = express.Router();
var queryService = require('../config/queryService.js');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.get('/login.do', function(req, res, next){
	console.log(">>>>>>>>>><<<<<<<<<<");
	var user_email = req.query.email;
	var user_pwd = req.query.password;
	queryService.excute('getUserByIdPwd', [user_email, user_pwd] ,function(err, result){
		if(result.rowCount != 0){
			res.render('index');
		}else{
			res.render('signin');
		}
	});
});

module.exports = router;
