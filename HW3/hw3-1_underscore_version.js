/**
 * Created by Kelun on 6/24/14.
 */
var _ = require('underscore');
    client = require('mongodb').MongoClient;


var dropMinScore = function(arr) {
    var min = 100;
    var index;
    _.each(arr, function(doc, i){
        if(doc.type == 'homework') {

            if(doc.score < min) {
                min = doc.score;
                index = i;
            }
        }
    })
    arr.splice(index, 1)
    return arr;
}

var db = client.connect('mongodb://localhost:27017/school', function(err, db){
    if (err) throw err;

    var students = db.collection('students');
    students.find({}).toArray(function(err, docs){
        if (err) throw err;

        _.each(docs, function(doc){
            doc.scores = dropMinScore(doc.scores);
            students.update({'_id': doc._id}, doc, {}, function(err, result){
                if (err) throw err;
            });
        });
        db.close();
    });
});
