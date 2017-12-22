// set variable
var fs = require("fs");
var request = require("request");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var omdb = require('omdb');
// get user input from terminal
var userInput = process.argv[2];
// require keys.js
var stuffINeed = require("./keys.js");
// if user inputs my-tweets, return tweets


if(userInput === "my-tweets"){
    var client = new Twitter(stuffINeed);
    var params = { screen_name: 'stphnsung', count: 20 };
client.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (!error) {
        for(i=0; i<tweets.length; i++){
            console.log(tweets[i].created_at);
            console.log(tweets[i].text);
        }
        console.log
    }
} 

)};