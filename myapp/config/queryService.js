var pg = require("pg");
var queryTxt = require('./query.js');
//var transaction = require('pg-transaction');

//Connect to DB
var database = require('./database.js');
var client = new pg.Client(database.url);
//var tx = new transaction(client);

client.connect();

module.exports = {
	excute: function queryService(queryid, param, next) {
		client.query(queryTxt[queryid], param, function (err, result) {

			if(err) {
				console.error('error running query', err);
				return(err, null);
			}
			result.rowstotal = result.rowCount;
			return next(err, result);
		});
	},

	excutePaging: function queryService(queryid, param, paging, next) {

		var sqlPaging = queryTxt[queryid]
		              + ' limit '+ paging.lineperpage + ' offset '+ (paging.pagenum-1) * paging.lineperpage;

		client.query(queryTxt[queryid], param, function (err, result) {
			if(err) {
				console.error('error running query', err);
				return(err, null);
			}

			var rowstotal = result.rowCount;

			client.query(sqlPaging, param, function (err, result) {
				if(err) {
					console.error('error running query', err);
					return(err, null);
				}
				result.rowstotal = rowstotal;
				return next(err, result);
			});
		});
	},
	
	/*excuteTransaction: function queryService(queryIdList, paramList, next) {
		tx.begin();
		for(var i = 0; i < queryIdList.length ; i++){
			console.log(">>>>>>" + queryIdList[i]);
			tx.query(queryTxt[queryIdList[i]], paramList[i], function(err,result){
				if(err) {
					console.error('error running query', err);
					tx.rollback(null);
				}
			});
		}
		tx.commit();
	}*/
};