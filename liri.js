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


if (userInput === "my-tweets") {
    var client = new Twitter(stuffINeed);
    var params = { screen_name: 'stphnsung', count: 20 };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for (i = 0; i < tweets.length; i++) {
                console.log(tweets[i].created_at);
                console.log(tweets[i].text);
            }

        }
    }

    )
};

if (userInput === "spotify-this-song") {
    var spotify = new Spotify({
        id: "ba5465286b5e4f928426b8f5de440696",
        secret: "7ff62881976b4fc7b6f4f103d5679ff5",
    });

    spotify.search({ type: 'track', query: process.argv[3] }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        var artists = data.tracks.items[0].artists;
        for (i=0; i <artists.length; i++){
            console.log(artists[i].name);
        }
        
        var name = data.tracks.items[0].name;
        console.log(name);

        var album = data.tracks.items[0].album.name;
        console.log(album);
      
        var preview = data.tracks.items[0].preview_url;
        console.log(preview);

    })
};