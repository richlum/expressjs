var MongoClient = require('mongodb').MongoClient,
	url = 'mongodb://192.168.1.112:27017/admin';


function parallel(fns,finalfn) {
	var results=[];
	var result_count=0;
	console.log('fns',fns);
	fns.forEach(function(fn,idx){
		console.log(idx,fn, typeof fn);
		fn( function(err,result){
			if(err) return console.log(err);
			console.log(idx,'fns', result);
			results[idx] = result;
			result_count++;
			if (result_count >= fns.length)
				finalfn();
		});
	});
}

function final(db) {
	db.close();
}
	


MongoClient.connect(url, function(err,db){
	if (err) return console.log(err);
	console.log('connected');

	parallel([
		function(cb){
			db.authenticate('admin','temp!!!',function(err,result){
				if (err) return cb(err);
				console.log('authenticated');
				cb(undefined,result);
			})
		},
		function(cb){
			db.admin().serverStatus(function(err, stat){
				if (err) return cb(err);
				let result = 'host=' + stat.host + ', pid=' + stat.pid + ', uptime=' + stat.uptime + ', connections=' + stat.connections;
				console.log('server status',result);
				cb(undefined,result);
			})
		},
		function(cb){
			db.admin().listDatabases(function(err,dbs){
				if (err) return console.log('listdb err',err);
				for (x in dbs.databases){
					console.log('databases:', x, dbs.databases[x]);
				}
				console.log(dbs.totalSize);
				console.log(dbs.ok);
				cb(undefined,JSON.stringify(dbs.databases));
			})
		},
		
	],  function(){
		final(db);
	});

}); 
	
