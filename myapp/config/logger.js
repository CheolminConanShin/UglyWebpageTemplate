var winston = require('winston');
var moment = require('moment');
 
function getCurrentTime() {
	return moment().format('YYYY-MM-DD HH:mm:ss.SSS ZZ');
};

var logger = new winston.Logger({
	transports: [
	             new winston.transports.Console({
	            	   level : 'debug' // Winston console log level
	            	 , timestamp: getCurrentTime
	            	 , colorize: true
	             }),
	             new winston.transports.DailyRotateFile({
	            	   level : 'debug' //debug, info, warn, error
	            	 , json : false // json 형식으로 로깅을 하지 않는다 (단순 text)
	            	 , filename: './logs/mxMMLog.log'
	            	 , datePattern: '.yyyy-MM-dd'
	            	 //, maxsize: 102400
	            	 , timestamp: getCurrentTime
	             })
	],
		
	exceptionHandlers: [
	                    new winston.transports.DailyRotateFile({
	                    	filename: './logs/exception_portal_push.log'
	                        , maxsize : 102400
	                        , timestamp : getCurrentTime
	                        , datePattern : '.yyyy-MM-dd'
	                    })
	]
	
});
 
module.exports.logger = function() {
	return logger;
}