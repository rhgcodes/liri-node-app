# LIRI

## Table of contents
  * [Demo](#demo)
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
  	* [Display last 20 tweets](#tweets)
  	* [Display movie information for specified movie (when movie name is 1 word)](#movie-specified)
    * [Display movie information for specified movie (when movie name is 2 words or longer)](#movie-specified-two)
  	* [Display movie information for Mr. Nobody when no movie is specified](#movie-not-specified)
  	* [Display top 10 songs on Spotify for the specified song name](#spotify-this-song)
  	* [Display top 10 songs on Spotify for the song, I want it that way](#do-what-it-says)
  	* [Display song information for The Sign by Ace of Base when no song is specified](#song-not-specified)
  * [Technologies used to create app](#technologies-used)
  * [Future code development](#feature-enhancements)
  * [Issues](#issues)

## <a name="demo"></a> Demo
Video demo: https://www.youtube.com/watch?v=ZdbBocqG4NE&feature=youtu.be

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
  git clone https://github.com/philipstubbs13/liri-node-app.git
  cd liri-node-app
</pre>

### <a name="install-node"></a> Install Node.js
<p>If you don't already have Node.js installed on your computer, you can install the latest version here: https://nodejs.org/en/.</p>

#### <a name="structure-of-project"></a> Structure of the project
<p>After you clone the repository, navigate to the project root directory (liri-node-app). The project directory structure is set up as follows:</p>
<ul>
  <li> <b>keys.js</b>: Allows access to the keys that are used to send and retrieve data to and from the Twitter and Spotify APIs.
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
	<li>Twitter npm package (https://www.npmjs.com/package/twitter) - used to send requests to Twitter API and receive tweets.</li>
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

#Twitter API keys

TWITTER_CONSUMER_KEY=your-twitter-consumer-key
TWITTER_CONSUMER_SECRET=your-twitter-consumer-secret
TWITTER_ACCESS_TOKEN_KEY=your-access-token-key
TWITTER_ACCESS_TOKEN_SECRET=your-twitter-access-token-secret
</pre>

<p>This file will be used by the dotenv package to set what are known as environment variables to the global process.env object in node. These are values that are meant to be specific to the computer that node is running on, and since we are gitignoring this file, they won't be pushed to GitHub — keeping the API key information private.</p>

### <a name="obtain-keys"></a> Obtain API keys
<p>To retrieve data from the APIs, you need to obtain API keys for Twitter and Spotify.</p>

#### <a name="twitter-api"></a> Obtain Twitter API keys
<p>To obtain the Twitter API keys:</p>
<ol>
  <li>Go to https://apps.twitter.com/app/new.</li>
  <li>In the <b>Application Details</b> form, enter a name and description for the application to be used with the Twitter API.</li>
  <li>For <b>Website</b>, enter <input>http://google.com</input>.</li>
  <li>Leave the <b>Callback URL</b> field blank.</li>
  <li>In the <b>Developer Agreement</b> section, select the check box indicating that you agree to the Twitter Developer Agreement.</li>
  <li>Click <b>Create your Twitter application</b>.</li>
  <li>To get your consumer key and secret, click the <b>Keys and Access Tokens</b> tab.</li>
  <li>Copy and paste the <b>Consumer Key (API Key)</b> and <b>Consumer Secret (API Secret)</b> values into your .env file, replacing the your-twitter-consumer-key and your-twitter-consumer-secret placeholders, respectively.</li>
  <li>At the bottom of the page, click <b>Create my access token</b> to get your access token key and secret.</li>
  <li>Copy the <b>Access Token</b> and <b>Access Token Secret</b> displayed at the bottom of the next screen. Paste them into your .env file, replacing the placeholders for your-twitter-access-token-key and your-twitter-access-token-secret, respectively.</li>
</ol>

#### <a name="spotify-api"></a> Obtain Spotify API keys
<p>To obtain the Spotify API keys:</p>
<ol>
  <li>Go to https://developer.spotify.com/my-applications/#!/</li>
  <li>Either log in to your existing Spotify account or create a new one and log in.</li>
  <li>After you are logged in, click <b>CREATE AN APP</b> to register a new application to be used with the Spotify API. You can fill in whatever you like for these fields. When finished, click <b>Complete</b>.</li>
  <li>Copy the <b>Client ID</b> and <b>Client Secret</b> values down somewhere as you'll need them to use the Spotify API and the node-spotify-api package.</li>
  <li>Paste the <b>Client ID</b> and <b>Client Secret</b> values into your .env file, replacing the placeholders for your-spotify-id and your-spotify-secret, respectively.</li>

## <a name="command-reference"></a> Running LIRI from the command line
<p>In LIRI, there are five commands that you can run. These commands allow you to receive access to a list of tweets from Twitter, song information from Spotify, and movie information from OMDB. Review the command syntax and various arguments you can use for the command you want to run.</p>

### <a name="command-syntax"></a> Command line syntax
<p>The syntax for the LIRI command line interface is:</p>
<pre>node liri.js <i>command</i> [<i>arguments</i>]</pre>

### <a name="available-commands"></a> Available commands
<p>There are five LIRI commands available from the command line.</p>

Command | Description
------------ | -------------
my-tweets | Shows the last 20 tweets from Twitter timeline and when they were created. 
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

## <a name="examples"></a> Examples

### <a name ="tweets"></a> Display last 20 tweets
<pre>
$ node liri.js my-tweets
  __  __         _                     _
 |  \/  |_   _  | |___      _____  ___| |_ ___
 | |\/| | | | | | __\ \ /\ / / _ \/ _ \ __/ __|
 | |  | | |_| | | |_ \ V  V /  __/  __/ |_\__ \
 |_|  |_|\__, |  \__| \_/\_/ \___|\___|\__|___/
         |___/

My last 20 tweets
==========================================================================
Tweet #1
Tweet: RT @NOTSportsCenter: When you know you’re about to get fired and you just DGAF anymore https://t.co/phbBNKxZMH
Created at: Sat Jan 27 03:02:24 +0000 2018
==========================================================================
==========================================================================
Tweet #2
Tweet: RT @TheFostersTV: "What is an American?" ✊🏻✊🏼✊🏽✊🏾✊🏿
______
Song: "Don't Give Up" by @RyanStar https://t.co/FvJkDkZLZi
Created at: Sat Jan 27 03:01:53 +0000 2018
==========================================================================
==========================================================================
Tweet #3
Tweet: RT @Fullscreen: Awwwwkward. https://t.co/PrsaEcBsd9
Created at: Mon Jan 01 06:32:42 +0000 2018
==========================================================================
==========================================================================
Tweet #4
Tweet: RT @KarlTowns: Happy New Years to everyone! Hope 2018 brings everyone blessings, positivity, and success! God bless!
Created at: Mon Jan 01 05:25:52 +0000 2018
==========================================================================
==========================================================================
Tweet #5
Tweet: RT @NFL: 2017 Division WINNERS! https://t.co/4KZyG4dR5y
Created at: Mon Jan 01 03:43:26 +0000 2018
==========================================================================
==========================================================================
Tweet #6
Tweet: RT @DukeMBB: If you start watching the 2015 National Championship Game on your DVR at about 10:51:41 PM and skip commercials/halftime, Tyus…
Created at: Mon Jan 01 03:43:07 +0000 2018
==========================================================================
==========================================================================
Tweet #7
Tweet: “Why I Left My $100,000+ Developer Job at Google” by YK Sugishita https://t.co/KS6N8pF9BN
Created at: Sun Dec 31 02:17:12 +0000 2017
==========================================================================
==========================================================================
Tweet #8
Tweet: “One Hour of Side Project Coding a Day*— a New Year’s Resolution Worth Making” by @LeMarquisOfAndy https://t.co/VIglVFbMZX
Created at: Sun Dec 31 02:08:02 +0000 2017
==========================================================================
==========================================================================
Tweet #9
Tweet: RT @lindseyvonn: Good ol’ Buck Hill!!! Where I grew up❤️ https://t.co/Vcg9BwSRwd
Created at: Sat Dec 30 02:47:32 +0000 2017
==========================================================================
==========================================================================
Tweet #10
Tweet: RT @UKCoachCalipari: You only know if you’re going to win or lose when you win or lose, so why create any anxiety and look ahead? If you st…
Created at: Fri Dec 29 23:39:31 +0000 2017
==========================================================================
==========================================================================
Tweet #11
Tweet: RT @Timberwolves: Hey Jimmy Butler, can you name someone more clutch than you?

3️⃣9️⃣ points and an #NBAVote! https://t.co/bNQAiLpsnK
Created at: Thu Dec 28 15:28:12 +0000 2017
==========================================================================
==========================================================================
Tweet #12
Tweet: RT @espn: Jimmy Butler in overtime: money. https://t.co/0DABuIHwyE
Created at: Thu Dec 28 15:28:06 +0000 2017
==========================================================================
==========================================================================
Tweet #13
Tweet: RT @MNWolfDen: THANK YOU JIMMY! Wolves fans retweet to vote him into the All-Star game because he just single handily won us the game!

Jim…
Created at: Thu Dec 28 04:10:45 +0000 2017
==========================================================================
==========================================================================
Tweet #14
Tweet: RT @NOTSportsCenter: Today’s bowl schedule:

Florida State/Southern Miss: The Yes FSU Is Bowl Eligible Somehow Bowl

Iowa/Boston College:…
Created at: Wed Dec 27 23:56:19 +0000 2017
==========================================================================
==========================================================================
Tweet #15
Tweet: RT @TheFostersTV: The second you graduate college, parents be like: https://t.co/YdjQPYLLX6
Created at: Wed Dec 27 23:55:29 +0000 2017
==========================================================================
==========================================================================
Tweet #16
Tweet: RT @lecrae: Sometimes it’s not a loss. It’s just God helping you clean house.
Created at: Wed Dec 27 23:55:12 +0000 2017
==========================================================================
==========================================================================
Tweet #17
Tweet: RT @LukeKennard5: Happy birthday Jesus! Merry Christmas everyone!
Created at: Mon Dec 25 15:45:21 +0000 2017
==========================================================================
==========================================================================
Tweet #18
Tweet: RT @lecrae: Celebrate Jesus.
Eat terribly.
Destroy someone’s soul in monopoly.
Open gifts. #ChristmasEve
Created at: Mon Dec 25 03:45:02 +0000 2017
==========================================================================
==========================================================================
Tweet #19
Tweet: RT @bigballerbrand: It's not about the money for the Ball Brothers. They have a passion to play Basketball and to experience playing as pro…
Created at: Mon Dec 18 00:38:51 +0000 2017
==========================================================================
==========================================================================
Tweet #20
Tweet: RT @AthleteSwag: Funniest video on Twitter 😂 https://t.co/cRnb21ZxW9
Created at: Fri Nov 24 16:39:14 +0000 2017
==========================================================================
</pre>


### <a name ="movie-specified"></a> Display movie information for specified movie (when movie name is 1 word)
<pre>
$ node liri.js movie-this Miracle
   __  __ _                _
  |  \/  (_)_ __ __ _  ___| | ___
  | |\/| | | '__/ _` |/ __| |/ _ \
  | |  | | | | | (_| | (__| |  __/
  |_|  |_|_|_|  \__,_|\___|_|\___|

=======================================================================================================
liri command: movie-this Miracle
=======================================================================================================
Title: Miracle
Year movie was released: 2004
IMDB movie rating (out of 10): 7.5
Rotten Tomatoes rating (out of 100%): 80%
Filmed in: Canada, USA
Language: English
Movie plot: Miracle tells the true story of Herb Brooks (Kurt Russell), the player-turned-coach who led the 1980 U.S. Olympic hockey team to victory over the seemingly invincible Russian squad.
Actors: Kurt Russell, Patricia Clarkson, Noah Emmerich, Sean McCann
=======================================================================================================
</pre>

### <a name="movie-specified-two"></a> Display movie information for specified movie (when movie name is 2 words or longer)
<pre>
$ node liri.js movie-this Social Network
   ____             _       _   _   _      _                      _
  / ___|  ___   ___(_) __ _| | | \ | | ___| |___      _____  _ __| | __
  \___ \ / _ \ / __| |/ _` | | |  \| |/ _ \ __\ \ /\ / / _ \| '__| |/ /
   ___) | (_) | (__| | (_| | | | |\  |  __/ |_ \ V  V / (_) | |  |   <
  |____/ \___/ \___|_|\__,_|_| |_| \_|\___|\__| \_/\_/ \___/|_|  |_|\_\

=======================================================================================================
liri command: movie-this  social network
=======================================================================================================
Title: The Social Network
Year movie was released: 2010
IMDB movie rating (out of 10): 7.7
Rotten Tomatoes rating (out of 100%): 96%
Filmed in: USA
Language: English, French
Movie plot: Harvard student Mark Zuckerberg creates the social networking site that would become known as Facebook, but is later sued by two brothers who claimed he stole their idea, and the co-founder who was later squeezed out of the business.
Actors: Jesse Eisenberg, Rooney Mara, Bryan Barter, Dustin Fitzsimons
=======================================================================================================
</pre>

### <a name ="movie-not-specified"></a> Display movie information for Mr. Nobody when no movie is specified
<pre>
$ node liri.js movie-this
If you haven't watched Mr. Nobody, then you should: http://www.imdb.com/title/tt0485947/
It's on Netflix!
  __  __        _   _       _               _
 |  \/  |_ __  | \ | | ___ | |__   ___   __| |_   _
 | |\/| | '__| |  \| |/ _ \| '_ \ / _ \ / _` | | | |
 | |  | | |    | |\  | (_) | |_) | (_) | (_| | |_| |
 |_|  |_|_|    |_| \_|\___/|_.__/ \___/ \__,_|\__, |
                                              |___/
=======================================================================================================
liri command: movie-this Mr Nobody
=======================================================================================================
Title: Mr. Nobody
Year movie was released: 2009
IMDB movie rating (out of 10): 7.9
Rotten Tomatoes rating (out of 100%): 66%
Filmed in: Belgium, Germany, Canada, France, USA, UK
Language: English, Mohawk
Movie plot: A boy stands on a station platform as a train is about to leave. Should he go with his mother or stay with his father? Infinite possibilities arise from this decision. As long as he doesn't choose, anything is possible.
Actors: Jared Leto, Sarah Polley, Diane Kruger, Linh Dan Pham
=======================================================================================================
</pre>

### <a name ="spotify-this-song"></a> Display top 10 songs on Spotify for the specified song name
<pre>
$ node liri.js spotify-this-song What Ifs
  __        ___           _     ___  __
  \ \      / / |__   __ _| |_  |_ _|/ _|___
   \ \ /\ / /| '_ \ / _` | __|  | || |_/ __|
    \ V  V / | | | | (_| | |_   | ||  _\__ \
     \_/\_/  |_| |_|\__,_|\__| |___|_| |___/

Top 10 songs on Spotify with the name,  What ifs
==========================================================================
Song #1
Artist: Kane Brown
Song title: What Ifs
Preview song: https://p.scdn.co/mp3-preview/9a1bc6de88d686138b641e6022a4b30c6e75de74?cid=090b6f40fd9e40eaa389e1a6e6aa1cfd
Album: Kane Brown
==========================================================================
==========================================================================
Song #2
Artist: Kane Brown
Song title: What Ifs
Preview song: https://p.scdn.co/mp3-preview/38694be1b7496f8ff0f308340855c9d8dfc5cf01?cid=090b6f40fd9e40eaa389e1a6e6aa1cfd
Album: Kane Brown (Deluxe Edition)
==========================================================================
==========================================================================
Song #3
Artist: Kane Brown
Song title: What Ifs (Remix)
Preview song: https://p.scdn.co/mp3-preview/b05441ecafdf40446beb4bc8f8835b1a2421d447?cid=090b6f40fd9e40eaa389e1a6e6aa1cfd
Album: What Ifs (Remix)
==========================================================================
==========================================================================
Song #4
Artist: boyChild
Song title: Counting What Ifs (feat. Soundmouse) - Original
Preview song: https://p.scdn.co/mp3-preview/70d964d280f453940f23b78f5bc8233742ebbc2e?cid=090b6f40fd9e40eaa389e1a6e6aa1cfd
Album: Counting What Ifs (feat. Soundmouse)
==========================================================================
==========================================================================
Song #5
Artist: boyChild
Song title: Counting What Ifs (feat. Soundmouse) - Darkhorse Ambient Room Remix
Preview song: https://p.scdn.co/mp3-preview/307753756f5d7f6cdebc8112a50bf31512bdb7d6?cid=090b6f40fd9e40eaa389e1a6e6aa1cfd
Album: Counting What Ifs (feat. Soundmouse)
==========================================================================
==========================================================================
Song #6
Artist: Melanie Baker
Song title: What Ifs
Preview song: https://p.scdn.co/mp3-preview/9de234644b9cc922ae56869b0b7f98a2d62c16cf?cid=090b6f40fd9e40eaa389e1a6e6aa1cfd
Album: What Ifs
==========================================================================
==========================================================================
Song #7
Artist: boyChild
Song title: Counting What Ifs - Vika Remix
Preview song: https://p.scdn.co/mp3-preview/f672b9ef58af0e8a32f5525ae52e312716253db3?cid=090b6f40fd9e40eaa389e1a6e6aa1cfd
Album: Counting What Ifs (feat. Soundmouse)
==========================================================================
==========================================================================
Song #8
Artist: Jaguar Wright
Song title: The What If's
Preview song: https://p.scdn.co/mp3-preview/0d1d44193e56b600f0f549591ddb7145fab70b52?cid=090b6f40fd9e40eaa389e1a6e6aa1cfd
Album: Denials Delusions And Decisions
==========================================================================
==========================================================================
Song #9
Artist: boyChild
Song title: Counting What Ifs (feat. Soundmouse) - No Beats
Preview song: https://p.scdn.co/mp3-preview/0d1d44193e56b600f0f549591ddb7145fab70b52?cid=090b6f40fd9e40eaa389e1a6e6aa1cfd
Album: Counting What Ifs (feat. Soundmouse)
==========================================================================
==========================================================================
Song #10
Artist: Ryan Krysiak
Song title: What Ifs (feat. Brenna Nicole Bone)
Preview song: https://p.scdn.co/mp3-preview/7b49eeca51d768df6692c553973484c212171015?cid=090b6f40fd9e40eaa389e1a6e6aa1cfd
Album: What Ifs (feat. Brenna Nicole Bone)
==========================================================================
</pre>


### <a name = "do-what-it-says"></a> Display top 10 songs on Spotify for the song, I want it that way
<pre>
$ node liri.js do-what-it-says
  _ _ ___  __        __          _     _ _     _____ _           _    __        __          _ _
 ( | )_ _| \ \      / /_ _ _ __ | |_  (_) |_  |_   _| |__   __ _| |_  \ \      / /_ _ _   _( | )
  V V | |   \ \ /\ / / _` | '_ \| __| | | __|   | | | '_ \ / _` | __|  \ \ /\ / / _` | | | |V V
      | |    \ V  V / (_| | | | | |_  | | |_    | | | | | | (_| | |_    \ V  V / (_| | |_| |
     |___|    \_/\_/ \__,_|_| |_|\__| |_|\__|   |_| |_| |_|\__,_|\__|    \_/\_/ \__,_|\__, |
                                                                                      |___/
Top 10 songs on Spotify with the name, "I Want it That Way"
==========================================================================
Song #1
Artist: Backstreet Boys
Song title: I Want It That Way
Preview song: https://p.scdn.co/mp3-preview/e72a05dc3f69c891e3390c3ceaa77fad02f6b5f6?cid=090b6f40fd9e40eaa389e1a6e6aa1cfd
Album: The Hits--Chapter One
==========================================================================
==========================================================================
Song #2
Artist: Backstreet Boys
Song title: I Want It That Way
Preview song: https://p.scdn.co/mp3-preview/f9f504a705fcaaf2f24b004b629725451014ad6c?cid=090b6f40fd9e40eaa389e1a6e6aa1cfd
Album: The Essential Backstreet Boys
==========================================================================
==========================================================================
Song #3
Artist: Backstreet Boys
Song title: I Want It That Way
Preview song: https://p.scdn.co/mp3-preview/b8c2410a5acb68b462be6ac85f1312430e2b149c?cid=090b6f40fd9e40eaa389e1a6e6aa1cfd
Album: Millennium
==========================================================================
==========================================================================
Song #4
Artist: Anthem Lights
Song title: I Want It That Way
Preview song: https://p.scdn.co/mp3-preview/4a163fbfa2dbbe4433f277e0e7395dca656364f5?cid=090b6f40fd9e40eaa389e1a6e6aa1cfd
Album: Covers Part IV
==========================================================================
==========================================================================
Song #5
Artist: Glee Cast
Song title: Bye Bye Bye / I Want It That Way (Glee Cast Version)
Preview song: https://p.scdn.co/mp3-preview/3aa63b5c98b98ae333e567813e5c720abb2914f0?cid=090b6f40fd9e40eaa389e1a6e6aa1cfd
Album: Bye Bye Bye / I Want It That Way (Glee Cast Version)
==========================================================================
==========================================================================
Song #6
Artist: Manuel Costa
Song title: I Want It That Way
Preview song: https://p.scdn.co/mp3-preview/cdde86f49ca4ef217ac08bbbb0c6295c16f015b0?cid=090b6f40fd9e40eaa389e1a6e6aa1cfd
Album: I Want It That Way
==========================================================================
==========================================================================
Song #7
Artist: Backstreet Boys
Song title: I Want It That Way
Preview song: https://p.scdn.co/mp3-preview/2f96341eb8415a3efb27375db1c4d59928408c2f?cid=090b6f40fd9e40eaa389e1a6e6aa1cfd
Album: 90 Sweet 90s Hits!
==========================================================================
==========================================================================
Song #8
Artist: "Weird Al" Yankovic
Song title: Ebay (Parody of "I Want It That Way" by the Backstreet Boys)
Preview song: https://p.scdn.co/mp3-preview/e217ea111ab84a777f204252fce4b18d5de3ae80?cid=090b6f40fd9e40eaa389e1a6e6aa1cfd
Album: Poodle Hat
==========================================================================
==========================================================================
Song #9
Artist: Dynamite Boy
Song title: I Want It That Way
Preview song: null
Album: Punk Goes Pop
==========================================================================
==========================================================================
Song #10
Artist: Landon Austin & Julia Sheer
Song title: I Want It That Way
Preview song: https://p.scdn.co/mp3-preview/e777be5446dc3df34abc2eaec241edb5a590976c?cid=090b6f40fd9e40eaa389e1a6e6aa1cfd
Album: I Want It That Way
==========================================================================
</pre>

### <a name = "song-not-specified"></a> Display song information for The Sign by Ace of Base when no song is specified
<pre>
$ node liri.js spotify-this-song
  _____ _            ____  _
 |_   _| |__   ___  / ___|(_) __ _ _ __
   | | | '_ \ / _ \ \___ \| |/ _` | '_ \
   | | | | | |  __/  ___) | | (_| | | | |
   |_| |_| |_|\___| |____/|_|\__, |_| |_|
                             |___/
Artist: Ace of Base
Song title: The Sign
Preview song: https://p.scdn.co/mp3-preview/4c463359f67dd3546db7294d236dd0ae991882ff?cid=090b6f40fd9e40eaa389e1a6e6aa1cfd
Album: The Sign (US Album) [Remastered]
</pre>

## <a name="technologies-used"></a> Technologies used to build app

  * Node.js (https://nodejs.org/en/)
  * Javascript

## <a name="feature-enhancements"></a> Future code development
<p>Source code will be developed over time to handle new features in the future.</p>
<p>The following is a list of potential feature enhancements:</p>

## <a name ="Issues"></a> Issues
<p>If you find an issue while using the app or have a request, <a href="https://github.com/philipstubbs13/liri-node-app/issues/" target="_blank">log the issue or request here</a>. These issues will be addressed in a future code update.</p>

<p>Known issues</p>
<ul>
  <li>The Rotten Tomatoes rating is not available for every movie. For future code update, tell the user that the "Rating is not available" for Rotten Tomatoes rating.</li>
</ul>

