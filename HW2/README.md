# HW 2
---
## HW 2.1
+ mongoimport --type csv --headerline weather_data.csv -d weather -c data
+ [mongoimport doc][mongoimport]
+ [mongodb drive -- find][find]
+ Mongo Shell:   

	`db.data.find({"Wind Direction": {$gte: 180, $lte: 360}}, {"State":1, "Temperature":1}).sort({"Temperature":1}).limit(1)`
+ Nodejs: see hw2-1.js

## HW 2.2
+ see hw2-2.js
+ [mongodb drive --update][update]

## HW 2.3
+ see /blog
+ tree -I "node_modules" blog

2 directories, 17 files



[mongoimport]:http://docs.mongodb.org/manual/reference/program/mongoimport/
[find]: http://mongodb.github.io/node-mongodb-native/api-generated/collection.html#find
[update]: http://mongodb.github.io/node-mongodb-native/api-generated/collection.html#update