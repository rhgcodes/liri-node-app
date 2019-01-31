# LIRI

## Table of contents
  * [About this project](#about-this-project)
  * [Getting started](#contribute)
    * [Clone the repository](#clone-repository)
    * [Install Node.js](#install-node)
    * [Install the dependencies](#dependencies)
    * [Create a .env file](#env-variables)
    * [Obtain API keys](#obtain-keys)
  * [Running LIRI from the command line](#command-reference)
  	* [Command line syntax](#command-syntax)
  	* [Available commands](#available-commands)
    * [Command line arguments](#arguments)
    * [Displaying my tweets](#tweets)
  * [Command line help](#command-line-help)
  * [Examples](#examples)
  * [Technologies used to create app](#technologies-used)
  * [Future code development](#feature-enhancements)
  * [Issues](#issues)
  * [Author](#author)

## <a name="about-this-project"></a> About this project
<p>LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters and gives you back tweets, songs, and movies.</p>

## <a name="contribute"></a> Getting started
To get started running LIRI on your computer and/or contribute to this project, perform the following steps:
  1. [Clone the repository](#clone-repository)
  2. [Install Node.js](#install-node)
  3. [Install the dependencies](#dependencies)
  4. [Create a .env file](#env-variables)
  5. [Obtain API keys](#obtain-keys)

### <a name="clone-repository"></a> Clone the repository
The first step is to clone the project repository to a local directory on your computer. To clone the repository, run the following commands:
<pre>
  git clone git@github.com:rhgcodes/liri-node-app.git
  cd liri-node-app
</pre>

### <a name="install-node"></a> Install Node.js
<p>If you don't already have Node.js installed on your computer, you can install the latest version here: https://nodejs.org/en/.</p>

#### <a name="structure-of-project"></a> Structure of the project
<p>After you clone the repository, navigate to the project root directory (liri-node-app). The project directory structure is set up as follows:</p>
<ul>
  <li> <b>keys.js</b>: Allows access to the key that is used to send and retrieve data to and from the Spotify API.
  </li>
  <li><b>liri.js</b>: Contains the code that is used to run the application from the command line.</li>
  <li><b>log.txt</b>: App log file. When you run a command, data gets logged to the terminal as well as to the log.txt file in the project's root directory.</li>
  <li><b>package.json</b>: Lists the project dependencies (third party npm packages) and their version numbers.</li>
  <li><b>random.txt</b>: Information inside this file is used to run the do-what-it-says command.</li>
  <li><b>.gitignore</b>: Any file or directory listed inside this file will not be tracked by GitHub when code is committed.</li>
  <li><b>package-lock.json</b>: Dependency tree for the project. Lists all the dependencies and their versions.</li>
</ul>

### <a name="dependencies"></a> Install the dependencies
<p>The following npm packages are dependencies to the project. You must install these packages in the project root directory (liri-node-app) to be able to run LIRI from the command line.</p>
<p>After you clone the repository to a local directory, change directory to the project root directory (liri-node-app) and run the following command to install the required npm packages:</p>
<pre>npm install</pre>
<ul>
	<li>Spotify npm package (https://www.npmjs.com/package/node-spotify-api) - used to send requests to Spotify API and receive song information.</li>
	<li>Request npm package (https://www.npmjs.com/package/request) - used to send requests to OMDB API and receive movie information.</li>
	<li>DotEnv npm package (https://www.npmjs.com/package/dotenv) - used to load environment variables from a .env file into process.env.</li>
	<li>Columnify npm package (https://www.npmjs.com/package/columnify) - used to display terminal output in columns.</li>
  <li>Figlet npm package (https://www.npmjs.com/package/figlet) - used to convert text into ASCII art - drawings made out of text characters.</li>
</ul>
<p>Version information for each of these packages is available in the package.json file in the project root directory.</p>

### <a name="env-variables"></a> Create a .env file
<p>To run LIRI on your computer, you need to provide your own .env file for it to work.</p>
<p>Create a file named .env in the project root directory (liri-node-app) with the following contents.</p>
<p>You will replace the placeholder values with the API keys you obtain in the next step.</p>
<pre>
#Spotify API keys

SPOTIFY_ID=your-spotify-id
SPOTIFY_SECRET=your-spotify-secret
</pre>

<p>This file will be used by the dotenv package to set what are known as environment variables to the global process.env object in node. These are values that are meant to be specific to the computer that node is running on, and since we are gitignoring this file, they won't be pushed to GitHub — keeping the API key information private.</p>

### <a name="obtain-keys"></a> Obtain API keys
<p>To retrieve data from the APIs, you need to obtain API key for Spotify.</p>

#### <a name="spotify-api"></a> Obtain Spotify API keys
<p>To obtain the Spotify API keys:</p>
<ol>
  <li>Go to https://developer.spotify.com/my-applications/#!/</li>
  <li>Either log in to your existing Spotify account or create a new one and log in.</li>
  <li>After you are logged in, click <b>CREATE AN APP</b> to register a new application to be used with the Spotify API. You can fill in whatever you like for these fields. When finished, click <b>Complete</b>.</li>
  <li>Copy the <b>Client ID</b> and <b>Client Secret</b> values down somewhere as you'll need them to use the Spotify API and the node-spotify-api package.</li>
  <li>Paste the <b>Client ID</b> and <b>Client Secret</b> values into your .env file, replacing the placeholders for your-spotify-id and your-spotify-secret, respectively.</li>

## <a name="command-reference"></a> Running LIRI from the command line
<p>In LIRI, there are five commands that you can run. These commands allow you to receive access to song information from Spotify, and movie information from OMDB. Review the command syntax and various arguments you can use for the command you want to run.</p>

### <a name="command-syntax"></a> Command line syntax
<p>The syntax for the LIRI command line interface is:</p>
<pre>node liri.js <i>command</i> [<i>arguments</i>]</pre>

### <a name="available-commands"></a> Available commands
<p>There are five LIRI commands available from the command line.</p>

Command | Description
------------ | -------------
movie-this [movie_name] | Shows information about the specifid movie. The movie name is optional. If no movie is specified, Mr. Nobody is displayed by default.
spotify-this-song [song_name] | Shows top 10 songs on Spotify that have specified name. Song name is optional. If no song is specified, The Sign by Ace of Base is displayed by default.
do-what-it-says | Shows the top 10 songs on Spotify for the song, I want it that way.
help | Shows help information for each command.

### <a name='arguments'></a> Command line arguments
<p>For the movie-this and spotify-this-song commands, you can pass an argument specifying the name of a movie (for the movie-this command) or the name of a song (for the spotify-this-song command). These arguments are optional.</p> 
<ul>
  <li>If no movie is passed to the movie-this command, then movie information will be displayed for the movie, Mr. Nobody, by default.</li>
  <li>If no song is passed to the spotify-this-song command, then song information will be displayed for the song, The Sign by Ace of Base, by default.</li>
</ul>

### <a name="tweets"></a> Displaying my tweets
<p>By default, the application displays tweets from my Twitter account (iamPhilStubbs). If you want LIRI to show tweets from your own Twitter account, replace iamPhilStubbs with your screen name in the liri.js file, as shown in the following example:</p>
<pre>
  //Parameters. Show the tweets from my timeline. Limit to the last 20 tweets.
  var params = {screen_name: 'iamPhilStubbs', limit: 20};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
</pre>

## <a name="command-line-help"></a> Command line help
<p>Help information is available for each command from the command line.</p>
<p>To access the command line help, run the following command in the project's root directory:</p>
<pre>node liri.js help</pre>



## <a name="examples"></a> Examples:

<img src="/screenshots/Start-1.png" alt="SS1">

<img src="/screenshots/Spotify-this1.png" alt="SS2">

<img src="/screenshots/Spotify-this2.png" alt="SS3">

<img src="/screenshots/movie-this-example.png" alt="SS4">

<img src="/screenshots/movie-this-example2.png" alt="SS5">

<img src="/screenshots/liri-does.png" alt="SS6">

## <a name="technologies-used"></a> Technologies used to build app

  * JavaScript
  * Node.js (https://nodejs.org/en/)

## <a name="feature-enhancements"></a> Future code development
<p>Source code will be developed over time to handle new features in the future.</p>
<p>The following is a list of potential feature enhancements:</p>

## <a name ="Issues"></a> Issues

<p>Known issues</p>
<ul>
  <li>The Rotten Tomatoes rating is not available for every movie. For future code update, tell the user that the "Rating is not available" for Rotten Tomatoes rating.</li>
</ul>

## <a name="author"></a> Author

* Ruben Galleguillos - *JS/Node.js* - [Ruben Galleguillos](https://github.com/rhgcodes)

