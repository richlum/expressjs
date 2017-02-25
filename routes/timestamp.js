var express = require('express');
var router = express.Router();

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
router.get('/tamp', function(req, res, next) {
	console.log('timestamp url', req.url);
  res.end(req.url);
});

module.exports = router;
