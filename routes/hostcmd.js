var express = require('express');
var router = express.Router();
var shellcmd = require('./shellcmd.js');
function getStamp(){
	console.log('hostcmd');
	return "host commanding";
}


/* GET home page. */
// why / vs /hostcmd?  this is a 'sub app' for multiple 'mount path'
router.get('/', function(req, res, next) {
	console.log('stamp url', req.url);
  res.end(getStamp());
});

//   user inputs http:localhost:3000/timestamp/ls
//               http:localhost:3000/timestamp/hostname
// where app.js routes to this file via timestamp and delivers the subapp routing paramter
// of either /ls or /hostname
// shellcmd can open up to reuse of exiting docusign java if we dont want to redo in nodejs
// or can call out to form conversion if we want to make form conversions interactive.

// presumes unix/linux/mac/mingw type of host env
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

router.get('/pwd',function(req,res,next){
	var cmd = {cmd:'pwd',args:[]};
	shellcmd(cmd,function(err,data){
		if(err) res.end('error'+data);
		res.end(req.url + ' ' + data);
	});
});

// note do not allow route string come unchecked from user input.... 
// hardcoding here ensures we know exactly what host commands can be executed.

module.exports = router;
