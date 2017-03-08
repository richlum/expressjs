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
	
		db.collection('system.users',function(err,collection){
			collection.find().count(function(err,cnt){
				if (err) return cb(err,undefined);
				console.log(collection.collectionName, ' count = ',cnt);
			});


			collection.find().toArray(function(err,doc){
				if (err) return cb(err);
				var docstr = JSON.stringify(doc);
				console.log(docstr);
				db.close();
				//cb(undefined,JSON.stringify(doc));
				cb(undefined,docstr);
			});
		});
	});
}


