
var MongoClient = require('mongodb').MongoClient,
	url = 'mongodb://192.168.1.112:27017';


MongoClient.connect(url, function(err,db){
	if(err)
		return console.log(err);
	console.log('connected');

	db.authenticate('admin','temp!!!',function(err,result){
		if (err) return console.log('auth err', err);
		console.log('authenticated');
	});

	//databases of collections(eg tables) of documents	
	db.admin().listDatabases(function(err,dbs){
		if (err) return console.log('err',err);
		for(x in dbs){
			console.log('database:',x,dbs[x]);
		}
		dbs.databases.forEach(function(adb){
			console.log('db name:',adb.name);
			db.collection(adb.name,function(err,collection){
				//console.log('db2name:',adb.name);
				//console.log('collection', collection);
				//console.log('collection', collection.s.dbName);
				collection.count(function(err,cnt){
					if (err) return console.log(err);
					console.log(adb.name , ' count = ',cnt);
				});


				collection.find().toArray(function(err,doc){
					if (err) return console.log(err);
					console.log(adb.name, ' doc ', doc);
					
				});
				/*
				collection.stats(function(err,stats){
					if (err) return console.log('---err:',err);
					console.log(stats);
					stat.forEach(function(x){
						console.log(x,stats[x]);
					});
					
					console.log('namespace',stats.ns,
								'count',stats.count,
								'size',stats.size,
								'avgObjSize',stats.avgObjSize);
					
				});
				*/
				
				//for (x in collection){
				//	if (typeof collection[x] !== 'function')
				//		console.log(x,'--',collection[x],typeof collection[x]);
				//}
				
			});
			
		});
		
		db.close();
	});

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
	
	
	//db.close();
	// async... unwrapped db.close happens too quickly for count promise to complete

});


