"use strict";

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");
var ObjectId = require('mongodb').ObjectID;

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      db.collection("tweets").insertOne(newTweet, (err, result) => {
        if (err) {
          console.log("Something exploded on POST /tweets!");
        }
        callback(err);
      });
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      db.collection("tweets").find().toArray((err, tweets) => {
        if (err) {
          return callback(err);
        }
        callback(null, tweets);
      });
    },
    likeTweets: function(tweetID) {
      db.collection("tweets").findOneAndUpdate({_id: new ObjectId(tweetID)}, { $inc: {numOfLikes: 1 }}, {returnOriginal: false}, (err, result) => {
        if (err) {
          console.log(err);
          return err;
        }
        console.log(tweetID);
        console.log("result: ", result);
      });
    }
  };
}