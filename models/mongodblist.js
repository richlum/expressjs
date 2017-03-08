module.exports = function(cb){
	console.log('entered mongolist');	
	var MongoClient = require('mongodb').MongoClient,
		url = 'mongodb://192.168.1.112:27017/admin';
	
	
	/* note mongodb nodejs allows only one database per connection, you cant
		access multiple databases on the same connection.
		http://stackoverflow.com/questions/19474712/mongoose-and-multiple-database-in-single-node-js-project
		sugests setting multiple connections, one per database
	*/
	
	MongoClient.connect(url, function(err,db){
		if(err)
			return cb(err,undefined);
		console.log('connected');
	
		db.authenticate('admin','temp!!!',function(err,result){
			if (err) return cb(err, undefined);
			console.log('authenticated');
		});
	
		//databases of collections(eg tables) of documents	
		db.admin().listDatabases(function(err,dbs){
			if (err) return console.log('err',err);
			result = [];
			dbs.databases.forEach(function(adb){
				console.log('db name:',adb.name);
				result.push(adb.name);
			});
			
			db.close();
			cb(undefined,result);
		});
	
	
	});
	
	
}
