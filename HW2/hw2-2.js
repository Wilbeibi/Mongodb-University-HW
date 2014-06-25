/* Write a program that finds the document with the highest recorded temperature
 * for each state, and adds a "month_high" field for that document, setting its 
 * value to true. Use the weather dataset that you imported in HW 2.1. 
 */
var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/weather', function(err, db) {
	if(err) throw err;
	var cursor = db.collection('data').find()
			       .sort([['State', 1], ['Temperature', -1]]); 
	// weird syntax, why comma instead colon

	var cur_state = null;
	cursor.each(function (err, doc) {
		if (err) throw err;
		 if (!doc) {
		 	return db.close();
		 };
		if (doc.State !== cur_state) {

			cur_state = doc.State;
			// UPDATE
			var query_this = {'_id': doc._id};
			var add_high = {'$set': {'month_high': true}};
			db.collection('data').update(query_this, add_high, function(err, updated){ 
				// if (err) throw err;		//If add this error throw, code cannot exit normally, reason: UNKNOWN
				console.log("Successfully updated " + doc.State + " Temperature " + doc.Temperature);
				return;
			});
			
			// TEST
			// console.log("doc.State:" + doc.State + "\tcur_state:" + cur_state);
		}; 
	});
	
});

