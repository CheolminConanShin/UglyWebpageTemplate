module.exports = {
	'getUserByIdPwd' : 
		'SELECT user_email, user_password FROM user_info WHERE user_email = $1 and user_password = $2'
};