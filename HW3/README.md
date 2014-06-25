# HW 3
---
## HW 3.1
+ mongoimport -d school -c students < students.json
+ mongo shell (evil way):

+ `db.students.update({}, {$push: {scores: { $each: [], $sort:{type: 1,
     score: 1} }}}, {multi: true})`
+ `db.students.update({}, {$unset:{'scores.1':1}}, {multi:true})`
+ `db.students.update({}, {$pull:{'scores':null}}, {multi:true})`
+ node.js: see hw3-1.js
+ [js: splice][splice]
+ better not to [close] connection

## HW 3.2 and 3.3
+ see blog/


[splice]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
[close]: http://stackoverflow.com/questions/21499950/how-to-update-data-after-using-aggregate-in-nodejs-mongodb