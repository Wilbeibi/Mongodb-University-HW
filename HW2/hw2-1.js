var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/weather', function(err, db) {
	if(err) throw err;

	var query = {"Wind Direction": {$gte: 180, $lte: 360}};
	var proj = {"State": 1, "_id":0};
	var options = {"sort": [["Temperature", 1]], limit: 1}

	db.collection("data").find(query, proj, options).toArray( function (err, docs) {
		if (err) throw err;

		console.dir(docs);
		db.close();
	});
});
