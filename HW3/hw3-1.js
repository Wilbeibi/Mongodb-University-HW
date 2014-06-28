/* Write a program in the language of your choice that will remove the lowest
 * homework score for each student. Since there is a single document for each
 * student containing an array of scores, you will need to update the scores
 *  array and remove the homework.
 */

var MongoClient = require('mongodb').MongoClient;

var findMinHw = function(scores) {
	var min = 0xff;
	var idx;
	for (var i = 0; i < scores.length; i++) {
		if (scores[i].type == 'homework' && scores[i].score < min) {
			min = i.score;
			idx = i;
		}
	}
	scores.splice(idx, 1);
	return scores;
};

MongoClient.connect('mongodb://localhost:27017/school', function(err, db) {
	if(err) throw err;
	
	var Students = db.collection('students');
	
	Students.find().toArray( function(err, stus) {
		for (var i = 0; i < stus.length; i++) {
			stus[i].scores = findMinHw(stus[i].scores);		
			console.log(stus[i]._id);
			Students.update( {'_id': stus[i]._id}, stus[i], function(err, updated) {
				if(err) throw err;
				return;
			});
		}
	
		// db.close(); Better not to close connections
		
	});

});
