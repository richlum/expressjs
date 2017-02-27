
var MongoClient = require('mongodb').MongoClient,
	url = 'mongodb://192.168.1.112:27017/initialnode';


MongoClient.connect(url, function(err,db){
	if(err)
		return console.log(err);
	console.log('connected');
	
	var adminDb = db.admin();
/*	adminDb.listDatabases(function(err,dbs){
		if (err) return console.log('err',err);
		for(x in dbs){
			console.log(x,dbs[x], typeof dbs[x]);
		}
	});
*/
/*
	adminDb.listDatabases().then( function(dbs){
		for(x in dbs){
			console.log(x,dbs[x], typeof dbs[x]);
		}
	});
*/ /*
	db.collection('test',function(err,collection){
		if (err) return console.log('collection test err ',err);
		for(x in collection){
			if (typeof collection[x] === 'function') {
				console.log(x, 'function');
			} else {
				console.log(x,collection[x], typeof collection[x]);
			}
		}
		
	});		
*/
	
	var showcol = function(cb){
		db.collection('test',function(err,coll){
			if(err) return console.log('collection test err', err);
			console.log('dbName',coll.dbName);
			console.log('collectionName',coll.collectionName);
			console.log('namespace',coll.namespace);
			coll.count().then(function(val){
				console.log('count',val);
				cb(undefined,val);
			})
			.catch(function(reason){
				console.log('collection count failure ' , reason);	
				cb(reason,undefined);
			});
		});
	};		
	
	var insertDocs = function(db,cb) {
		var collection = db.collection('test');
		collection.insertMany([
			{a:1},{b:2},{c:3}
		], function(err,result){
			if (err) cb(err, undefined);
			console.log('results size', result.result.n);
			console.log('results ops', result.ops.length);
			console.log('inserted ' + result.ops.length + ' documents');
			cb(undefined,result);
		});
	}

	insertDocs(db, function(err,data){
		if (err) return console.log('inertDoc err ', err);
		console.log('insertDoc data', data);
		showcol( function(err,data){
			if (err) { 
				console.log(err);
			} else {
				console.log('col size = ', data);
			}
			db.close();
			
		});
	});
	//db.close();
	// async... unwrapped db.close happens too quickly for count promise to complete

});


