var mongolist = require('./mongolist');
console.log(mongolist);

mongolist(function(err,result){
	if (err) return console.log('err',err);
	console.log('result',result);
});


