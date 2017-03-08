var express = require('express');
var router = express.Router();
var listcmd = require('../models/mongolist');
var dblistcmd = require('../models/mongodblist');
var usrlistcmd = require('../models/mongousers');

router.get('/', function(req, res, next) {
	console.log(req.url);
	res.end('datacmding');
});

router.get('/dblist', function(req, res, next) {
	console.log(req.url);
	dblistcmd(function(err,data){
		if (err) {
			res.end(err);
			return;
		}
		res.end(data.toString());
	});
});

router.get('/userlist', function(req, res, next) {
	console.log(req.url);
	usrlistcmd(function(err,data){
		if (err) {
			res.end(err);
			return;
		}
		res.end(data.toString());
	});
});

/* GET home page. */
// why / vs /hostcmd?  this is a 'sub app' for multiple 'mount path'
router.get('/listcmd', function(req, res, next) {
	console.log(req.url);
	listcmd(function(err,data){
		if (err) return console.log(err);
		console.log('router data:',data);
		var result = JSON.stringify(data);
		 //   result = (result.substring(4,30));
		console.log(result);
		res.write(result);
		res.end('[asdfsadfsdfsadfsadfasdfsafasdfasdfsdfasdf]');
		//res.end(JSON.stringify({a:1,b:2,c:3},null,'\t'));
	});
});


module.exports = router;
