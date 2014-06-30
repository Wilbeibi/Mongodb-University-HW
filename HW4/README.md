# HW 4
---
## HW 4.1
Suppose you have a collection with the following indexes:

    > db.products.getIndexes()
    [
     	{
     		"v" : 1,
     		"key" : {
     			"_id" : 1
     		},
     		"ns" : "store.products",
     		"name" : "_id_"
     	},
     	{
     		"v" : 1,
     		"key" : {
     			"sku" : 1
     		},
                    "unique" : true,
     		"ns" : "store.products",
     		"name" : "sku_1"
     	},
     	{
     		"v" : 1,
     		"key" : {
     			"price" : -1
     		},
     		"ns" : "store.products",
     		"name" : "price_-1"
     	},
     	{
     		"v" : 1,
     		"key" : {
     			"description" : 1
     		},
     		"ns" : "store.products",
     		"name" : "description_1"
     	},
     	{
     		"v" : 1,
     		"key" : {
     			"category" : 1,
     			"brand" : 1
     		},
     		"ns" : "store.products",
     		"name" : "category_1_brand_1"
     	},
     	{
     		"v" : 1,
     		"key" : {
     			"reviews.author" : 1
     		},
     		"ns" : "store.products",
     		"name" : "reviews.author_1"
     	}
     	
     	
#### Which of the following queries can utilize an index. Check all that apply.


1. db.products.find({'brand':"GE"})

2. db.products.find({'brand':"GE"}).sort({price:1})

3. db.products.find({$and:[{price:{$gt:30}},{price:{$lt:50}}]}).sort({brand:1})

4. db.products.find({brand:'GE'}).sort({category:1, brand:-1}).explain()

The second one and the third one use index `price`, correct.

## HW 4.2
Suppose you have a collection called tweets whose documents contain information about the created_at time of the tweet and the user's followers_count at the time they issued the tweet. What can you infer from the following explain output?

    db.tweets.find({"user.followers_count":{$gt:1000}}).sort({"created_at" : 1 }).limit(10).skip(5000).explain()
    {
            "cursor" : "BtreeCursor created_at_-1 reverse",
            "isMultiKey" : false,
            "n" : 10,
            "nscannedObjects" : 46462,
            "nscanned" : 46462,
            "nscannedObjectsAllPlans" : 49763,
            "nscannedAllPlans" : 49763,
            "scanAndOrder" : false,
            "indexOnly" : false,
            "nYields" : 0,
            "nChunkSkips" : 0,
            "millis" : 205,
            "indexBounds" : {
                    "created_at" : [
                            [
                                    {
                                            "$minElement" : 1
                                    },
                                    {
                                            "$maxElement" : 1
                                    }
                            ]
                    ]
            },
            "server" : "localhost.localdomain:27017"
    }

1. This query performs a collection scan.

2. The query uses an index to determine the order in which to return result documents.

3. The query uses an index to determine which documents match.

4. The query returns 46462 documents.

5. The query visits 46462 documents.

6. The query is a "covered index query".

First one is true.
`treeCursor created_at_-1 reverse`, second one is true.
The fifth is true.

## HW 4.3
+ for homepage: db.posts.ensureIndex({ date: -1})
+ for perlink: db.posts.ensureIndex({ permalink: 1}, {unique: true})
+ for pertag: db.posts.ensureIndex({ tags: 1})

## HW 4.4
+ db.profile.find({op: 'query', ns: 'school2.students'}, {millis: 1, _id: 0}).sort({millis:-1}).limit(1)