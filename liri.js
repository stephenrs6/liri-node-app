// set variable
var fs = require("fs");
var request = require("request");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var omdb = require('omdbapi');
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
    var nodeArgs = process.argv;
    var songName = "";
    if (process.argv[3] === undefined) {
        songName = "The Sign Ace of Base";
    }
    

    for (var i = 3; i < nodeArgs.length; i++) {
        if (i > 3 && i < nodeArgs.length) {
            songName = songName + "+" + nodeArgs[i];
        }
        else {
            songName += nodeArgs[i];
        }
    }

    spotify.search({ type: 'track', query: songName }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        var artists = data.tracks.items[0].artists;
        for (i = 0; i < artists.length; i++) {
            console.log("Artist: " + artists[i].name);
        }

        var name = data.tracks.items[0].name;
        console.log("Track: " + name);

        var album = data.tracks.items[0].album.name;
        console.log("Album: " + album);

        var preview = data.tracks.items[0].preview_url;
        console.log("Preview: " + preview);

    })
};

if (userInput === "movie-this") {
    var nodeArgs = process.argv;
    var movieName = "";
    if (process.argv[3] !== undefined) {

        for (var i = 3; i < nodeArgs.length; i++) {
            if (i > 3 && i < nodeArgs.length) {
                movieName = movieName + "+" + nodeArgs[i];
            }
            else {
                movieName += nodeArgs[i];
            }
        }
    } else {
        movieName = "Mr. Nobody";
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    request(queryUrl, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
        }
    });
}

if (userInput === "do-what-it-says") {
    fs.readFile('random.txt', 'utf8', function (err, data) {
        var arr = data.split('\n');
        var firstLine = arr[0];

        var spotify = new Spotify({
            id: "ba5465286b5e4f928426b8f5de440696",
            secret: "7ff62881976b4fc7b6f4f103d5679ff5",
        });
        spotify.search({ type: 'track', query: firstLine.split(',')[1] }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            var artists = data.tracks.items[0].artists;
            for (i = 0; i < artists.length; i++) {
                console.log("Artist: " + artists[i].name);
            }

            var name = data.tracks.items[0].name;
            console.log("Track: " + name);

            var album = data.tracks.items[0].album.name;
            console.log("Album: " + album);

            var preview = data.tracks.items[0].preview_url;
            console.log("Preview: " + preview);

        })
    })
}
