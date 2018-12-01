//Read and set any environment variables with the dotenv package:
require("dotenv").config();

//To retrieve the data that will power this app, we'll need to send requests to the Twitter, Spotify and OMDB APIs. 
//Grab the Node packages.
//Grab the request package to send requests to the OMDB API.
var request = require("request");
//Grab the Spotify package to send requests to the Spotify API.
var Spotify = require('node-spotify-api');
//Grap the Twitter package to send requests to the Twitter API.
var Twitter = require('twitter');
//Grab columnify package to display command line help output in columns.
//https://www.npmjs.com/package/columnify
var columnify = require('columnify')
//Grab the figlet package to create drawings from text.
var figlet = require('figlet');
// fs is a core Node package for reading and writing files
var fs = require("fs");

//Using the require keyword, let's access all of the keys in the keys.js file
var keys = require("./keys.js");

//process.argv will print out any command line arguments.
var input = process.argv;

//Create variable to hold all the possible liri commands you can enter
//my-tweets, spotify-this-song, movie-this, do-what-it-says
var liriCommand = input[2];

//If the liriCommand is movie-this, we will need a variable to hold the movie name.
var movieName = "";

//If the liriCommand is spotify-this-song, we will need a variable to hold the song name.
var songName = "";

//Create variable. This variable will contain text to tell user that the information they requested was added to log file.
var addedToLogFile = "Results added to log.txt file."

//Code to access keys information.
//var client = new Twitter(keys.twitter);

//If the liriCommand is movie-this...
//Output information about that movie.
if (liriCommand === "movie-this") {
	getMovieInfo();
}

//If the liriCommand is my-tweets, show last 20 tweets and when they were created...
else if (liriCommand === "my-tweets") {
	//log liriCommand to log.txt.
	logData("liri command: my-tweets");
	getLatestTweets();
}

//If the liriCommand is spotify-this-song, show song info for the specified song.
else if (liriCommand === "spotify-this-song") {
	getSongInfo(songName);
}

//If the liriCommand is do-what-it-says, take the text inside of random.txt and then use it to run spotify-this-song for "I want it that way."
else if (liriCommand === "do-what-it-says") {
	//log liriCommand to log.txt.
	logData("liri command: do-what-it-says");
	doWhatItSays();
}

//If the liriCommand is help, display command line help page.
else if (liriCommand === "help") {
	showHelp();
}

//If the user enters a command that is not available, notify the user that the command was not found.
else {
	console.log("Command not found. Run 'node liri.js help' to see a list of available commands.");
}

//Get movie info function... Run this function to get movie info for the specified movie.
function getMovieInfo() {

	//If the movie name is longer than one word, join the words together on one line so that the movie name is all one string.
	//Rather than having separate lines for each word.
	for (var i = 3; i < input.length; i++) {

	  if (i > 2 && i < input.length) {
	    movieName = movieName + " " + input[i];
	  }
	  //For example, if the user enters "node liri.js movie this social network", movieName should be "social network" when the value is logged the terminal.
	  //console.log(movieName);
	}

	//If no movie name is specified on the command line, then show the movie info for the movie, Mr. Nobody.
	 if (!movieName) {
	 	//If no movie is specified, set movieName equal to Mr. Nobody.
	 	movieName = "Mr Nobody";
	 	console.log("If you haven't watched Mr. Nobody, then you should: http://www.imdb.com/title/tt0485947/");
	 	console.log("It's on Netflix!")
	}

	//Use the figlet npm package to convert the movieName text to art/drawing.
	figlet(movieName, function(err, data) {
	    if (err) {
	        console.log('Something went wrong...');
	        console.dir(err);
	        return;
	    }
	    console.log(data)
	});

	//Then, run a request to the OMDB API with the movieName value.
	request("http://www.omdbapi.com/?t=" + movieName + "&apikey=trilogy", function(error, response, body) {

		//If the request is successful (i.e. if the response status code is 200)
		if (!error && response.statusCode === 200) {
			//Parse the body of the JSON object that holds the movie data and display the movie info.
			var movieInfo = JSON.parse(body);
			//console.log(movieInfo);

			// Create variable to hold Rotten Tomatoes Rating.
			var tomatoRating = movieInfo.Ratings[1].Value;

			//Output the following information about movieName.
			// \r\n is used as a new line character in Windows: https://stackoverflow.com/questions/15433188/r-n-r-n-what-is-the-difference-between-them 
			var movieResult = 
				//Line break
				"=======================================================================================================" + "\r\n" +
				//Output the liri command plus movieName
				"liri command: movie-this " + movieName + "\r\n" +
				//Line break
				"=======================================================================================================" + "\r\n" +
				//Title of the movie.
				"Title: " + movieInfo.Title + "\r\n" +
				//Year the movie came out.
				"Year movie was released: " + movieInfo.Year + "\r\n" +
				//IMDB Rating of the movie.
				"IMDB movie rating (out of 10): " + movieInfo.imdbRating + "\r\n" +
				//Rotten Tomatoes rating of the movie.
				"Rotten Tomatoes rating (out of 100%): " + tomatoRating + "\r\n" +
				//Country where the movie was produced.
				"Filmed in: " + movieInfo.Country + "\r\n" +
				//Language of the movie.
				"Language: " + movieInfo.Language + "\r\n" + 
				//Plot of the movie.
				"Movie plot: " + movieInfo.Plot + "\r\n" +
				//Actors in the movie.
				"Actors: " + movieInfo.Actors + "\r\n" +
				//Line break
				"======================================================================================================="

			//Output the movie information to the terminal.
			console.log(movieResult);
			//Output the movie information to the log.txt file.
			logData(movieResult);
		}
	});
 }

//Get tweets function... Run this function to get last 20 tweets and when they were created.
function getLatestTweets(){
	//Use figlet npm package to convert text to art/drawing.
    figlet('My tweets', function(err, data) {
	    if (err) {
	        console.log('Something went wrong...');
	        console.dir(err);
	        return;
	    }
    console.log(data)
	});

	//Code to access Twitter keys information.
	var client = new Twitter({
		consumer_key: process.env.TWITTER_CONSUMER_KEY,
		consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
		access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
		access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
	});

	//Parameters. Show the tweets from my timeline. Limit to the last 20 tweets.
	var params = {screen_name: 'iamPhilStubbs', limit: 20};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	    //console.log(tweets);
	    //Show last 20 tweets from my timeline.
	    console.log("My last 20 tweets");
	    logData("My last 20 tweets");
	    for (var i=0; i < tweets.length; i ++) {
	    	//output the tweets
	    	// \r\n is used as a new line character in Windows: https://stackoverflow.com/questions/15433188/r-n-r-n-what-is-the-difference-between-them
	    	var myTweetResults = 
	    		"==========================================================================" + "\r\n" +
	    		//Display tweet number for each tweet. For example, the first tweet returned will be tweet #1, the second returned will be tweet #2, etc.
	    		"Tweet #" + (i+1) + "\r\n" +
	    		//Output the tweet text from Twitter to the terminal.
	    		"Tweet: " + tweets[i].text + "\r\n" +
	    		//Output the date/time when the tweet was created to the terminal.
	    		"Created at: " + tweets[i].created_at + "\r\n" +
	    		"==========================================================================" 

	    	//output the results to the terminal
	    	console.log(myTweetResults);
	    	//output the results to the log.txt file.
	    	logData(myTweetResults);
	    }
	  }
	});
}

//Get song info function... Run this function to get information about the specified song.
function getSongInfo(songName) {
	//This for loop ensures that if the song name is longer than one word, all of the words in the song name stay on the same line.
	//Rather than putting each word in the song name on a different line.
	for (var i=3; i < input.length; i++){
		songName = songName + " " + input[i];
	}

	//console.log(songName);
	//Line break to keep log.txt file organized.
	logData("==========================================================================");
	//log liriCommand to log.txt.
	logData("liri command: spotify-this-song");

	//var spotify = new Spotify(keys.spotify);
	var spotify = new Spotify({
  		id: process.env.SPOTIFY_ID,
  		secret: process.env.SPOTIFY_SECRET
	});

	//If no song name is specified on the command line, show song info for "The Sign" by Ace of Base by default.
	if (!songName) {
		//If no song is specified, set the songName variable to "The Sign."
		songName = "The Sign";
	}

	//Use the figlet npm package to convert songName text to art/drawing.
	figlet(songName, function(err, data) {
	    if (err) {
	        console.log('Something went wrong...');
	        console.dir(err);
	        return;
	    }
	    console.log(data);
	});

	//Use the Spotify package to search for a song/track. Set search results limit to 10.
	spotify.search({ type: 'track', query: songName, limit: 10 }, function(err, data) {

  
  		//If there is an error, log it.
  		if (err) {
    		return console.log('Error occurred: ' + err);
  		}
 
 	// If there is no error... then print out the song data.
  	// Use JSON.stringify to print the data in string format.
  	// Use the JSON.stringify argument of "2" to make the format pretty.
  	// See link here: http://stackoverflow.com/questions/4810841/how-can-i-pretty-print-json-using-javascript
	//console.log(JSON.stringify(data, null, 2)); 

	//If no song is provided, then the app will default to "The Sign" by Ace of Base.
	if (songName === "The Sign") {
		//output the default song information
		var defaultSong = 
		//Output the artist
		"Artist: " + data.tracks.items[5].artists[0].name + "\r\n" + 
		//Output the song's name.
		"Song title: " + data.tracks.items[5].name + "\r\n" +
		//Output a preview link of the song from Spotify.
		"Preview song: " + data.tracks.items[5].preview_url + "\r\n" +
		//Output the album that the song is from.
		"Album: " + data.tracks.items[5].album.name + "\r\n" 

		//Output default song info to terminal
		console.log (defaultSong);
		console.log(addedToLogFile);
		//Output default song info to log.txt file.
		logData(defaultSong);
		logData("==========================================================================");
	}


	//If song name is provided, output first 10 songs with that name to the terminal.
	else {
		console.log("Top 10 songs on Spotify with the name, " + songName);
		logData("Top 10 songs on Spotify with the name, " + songName);
		//Loop through the JSON data to display the top songs.
		for (var i = 0; i < data.tracks.items.length; i++) {
			var trackInfo = data.tracks.items[i];

			//Create variable for song preview link.
			var previewSong = trackInfo.preview_url;
			//If the song preview is null (not available), tell the user that the song preview is not available.
			if (previewSong === null) {
				previewSong = "Song preview is not available for this song.";
			}
			//output the song results. 
			var songResults = 
			
				//Line break to keep log.txt file clean and organized.
				"==========================================================================" + "\r\n" +
				//Display song number for each song. For example, the first song returned will be Song #1, the second returned will be Song #2, etc.
				"Song #" + (i+1) + "\r\n" +
				//Output the artist
				"Artist: " + trackInfo.artists[0].name + "\r\n" +
				//Output the song's name.
				"Song title: " + trackInfo.name + "\r\n" +
				//Output a preview link of the song from Spotify.
				"Preview song: " + previewSong + "\r\n" +
				//Output the album that the song is from.
				"Album: " + trackInfo.album.name + "\r\n" +
				//Line break to keep log.txt file clean and organized.
				"==========================================================================";

			//This will display song info in the terminal.
			console.log(songResults);
			//This will display song info in the log.txt file.
			logData(songResults);
		}
	}
	});
}

//doWhatItSays function...
//If the liriCommand is do-what-it-says, take the text inside of random.txt and then use it to run spotify-this-song for "I want it that way."
function doWhatItSays() {
	//This code will read from the random.txt file.
	// It's important to include the "utf8" parameter or the code will provide stream data (garbage)
	// The code will store the contents of the reading inside the variable "data"
	fs.readFile("random.txt", "utf8", function(error, data) {
		// If the code experiences any errors it will log the error to the console.
  		if (error) {
    		return console.log(error);
  		}
  		 // We will then print the contents of data
 		//console.log(data);

 		// Then split it by commas (to make it more readable)
  		var songdataArray = data.split(",");

  		// We will then re-display the content as an array for later use.
  		//console.log(songdataArray);
  		//console.log(songdataArray[1]);
  		//Call the getSongInfo function to display the song info for "I want it that way."
  		getSongInfo(songdataArray[1]);
 	});
}

//Bonus: In addition to logging the data to the terminal/bash window, output the data to a .txt file called log.txt.
function logData(logResults) {
	// We then append the contents into the file
	// If the file didn't exist then it gets created on the fly.
	fs.appendFile("log.txt", logResults + "\r\n" , function(err) {

	// If an error was experienced we say it.
	if (err) {
		console.log(err);
	}

	// If no error is experienced, we'll log the phrase "Content Added" to our node console.
	else {
		//console.log("Content Added!");
	}
});

}

//Function to show command line help. Install columnify npm package to display contents in columns.
function showHelp() {
	//Use figlet npm package to convert text to art/drawing.
	figlet('LIRI help', function(err, data) {
	    if (err) {
	        console.log('Something went wrong...');
	        console.dir(err);
	        return;
	    }
	    console.log(data)
	});
	var helpInfo = "Usage: node liri.js <command> [arguments]" 
	var helpColumns = columnify([{
			Command: 'my-tweets',
			Description: "Shows the last 20 tweets from Twitter timeline and when they were created."
			}, {

			Command: "movie-this [movie_name]",
			Description: "Shows information about the specifid movie. If no movie is specified, Mr. Nobody is displayed by default."
			}, {

			Command: "spotify-this-song [song_name]",
			Description: "Shows top 10 songs on Spotify that have specified name. If no song is specified, The Sign by Ace of Base is displayed by default."
			}, {

			Command: 'do-what-it-says',
			Description: "Shows the top 10 songs on Spotify for the song, 'I want it that way.'"
			}])
	console.log("==================================================================================================");
	console.log(helpInfo);
	console.log("==================================================================================================");
	console.log(helpColumns);
}