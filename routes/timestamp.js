var express = require('express');
var router = express.Router();
var shellcmd = require('./shellcmd.js');
function getTimeStamp(){
	console.log('timestamping');
	return "server timestamp";
}


/* GET home page. */
// why / vs /timestamp?  this is a sub app for multiple mount path
router.get('/', function(req, res, next) {
	console.log('timestamp url', req.url);
  res.end(getTimeStamp());
});

//   user inputs http:localhost:3000/timestamp/ls
//               http:localhost:3000/timestamp/hostname
// where app.js routes to this file via timestamp and delivers the subapp routing paramter
// of either /ls or /hostname
// shellcmd can open up to reuse of exiting docusign java if we dont want to redo in nodejs
// or can call out to form conversion if we want to make form conversions interactive.
router.get('/ls', function(req, res, next) {
	var cmd = {cmd:'ls', args:['-la','.']};
	shellcmd(cmd,function(err,data){
		if(err) res.end('error' + data);
		res.end(req.url + ' ' + data);
	});
});

router.get('/hostname',function(req,res,next){
	var cmd = {cmd:'hostname',args:[]};
	shellcmd(cmd,function(err,data){
		if(err) res.end('error'+data);
		res.end(req.url + ' ' + data);
	});
});

module.exports = router;
