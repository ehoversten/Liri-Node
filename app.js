require("dotenv").config();
const keys = require("./keys.js");
const Spotify = require('node-spotify-api');
const axios = require('axios');
const chalk = require("chalk");
const fs = require('fs');

const spotify = new Spotify(keys.spotify);
// console.log(spotify);

const omdbKey = keys.omdb;
// console.log(omdbKey); 


let commandInput = process.argv[2];
let searchInput = process.argv[3];

// console.log(commandInput);
// console.log(searchInput);

switch (commandInput) {
    case 'concert-this':
        concertSearch(searchInput);
        break;
    case 'movie-this':
        movieSearch(searchInput);
        break;
    case 'spotify-this-song':
        songSearch(searchInput);
        break;
    case 'do-what-it-says':
        readFromFile();
        break;
    default:
        console.log("Please enter a valid command and search query");
}

/* ======================================================
   - COMMAND
   $> node liri.js concert-this <artist/band name here>

   - This will search the Bands in Town Artist Events API ("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp") for an artist and render the following information about each event to the terminal:

        * Name of the venue
        * Venue location
        * Date of the Event (use moment to format this as "MM/DD/YYYY") 

=================================================================== */
function concertSearch(query) {

    console.log("-----------------------");
    console.log("Searching for " + query);

    let artist = query.toLowerCase();
    let newQuery = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
    console.log(chalk.blue(newQuery));

    axios
      .get(newQuery)
      .then(function(response) {
            console.log("Found Results")
            // console.log(response.data);
            let results = response.data;
            results.forEach(function(event) {
                console.log(chalk.green("========================="));
                console.log("Event for " + chalk.red(artist.toUpperCase()));
                console.log(event.offers[0].type + ", Status: " + event.offers[0].status);
                console.log("Playing at: " + event.venue.name);
                console.log("In " + event.venue.city + ", " + event.venue.region + " (" + event.venue.country + ")");
                console.log("Date: " + event.datetime);
                console.log(chalk.green("========================="));
                console.log("");
            });
        })
      .catch(function(err){
            console.log(err);
      }); 
}

// ----- TESTING ----- //
// concertSearch("Spoon");


/* ===================================================================
    - COMMAND
    $> node liri.js movie-this '<movie name here>'

    - This will output the following information to your terminal/bash window:

        * Title of the movie.
        * Year the movie came out.
        * IMDB Rating of the movie.
        * Rotten Tomatoes Rating of the movie.
        * Country where the movie was produced.
        * Language of the movie.
        * Plot of the movie.
        * Actors in the movie.
        
    - If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

=================================================================== */
function movieSearch(movie) {
    console.log(chalk.yellow("-----------------------"));
    console.log("Searching for " + movie);

    let userInput;
    // Check to see if we were given a movie to search for
    if(movie == undefined) {
        userInput = "Mr+Nobody";
    } else {
        // userInput = movie.toLowerCase();
        userInput = movie;
    }

    console.log(chalk.red(userInput));
    // http://www.omdbapi.com/?apikey=[yourkey]&
    // let userInput = movie.toLowerCase();
    // var queryURL = "https://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=trilogy";

    // Let's build our query search 
    let queryURL = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=" + omdbKey.apikey;
    // console.log(queryURL);

    // Send our constructed query string to the API
    axios
      .get(queryURL)
      .then(function(response) {
        // console.log(response.data);
        let result = response.data;
        console.log(chalk.red("******************"));
        console.log(chalk.green("Title:" + result.Title));
        // console.log(`Title: ${result.Title}`);
        console.log(chalk.blue("Year Released:" + result.Year));
        // console.log(`Year Released: ${result.Year}`);
        console.log(`IMDB Rating: ${result.imdbRating}`);
        console.log(`Country Produced: ${result.Country}`);
        console.log(`Rotten Tomatoes Rating: ${result.Ratings[1].Value}`);
        console.log(`Language: ${result.Language}`);
        console.log(`Movie Plot: ${result.Plot}`);
        console.log(`Actors: ${result.Actors}`);
        console.log(chalk.red("******************"));
      })
      .catch(function(err) {
        console.log(err);
      });
}

// ----- TESTING ----- //
// let title = "Jaws"
// movieSearch("avatar");

/* ======================================================
    - COMMAND
    $> node liri.js spotify-this-song '<song name here>'

    - This will show the following information about the song in your terminal/bash window:
        * Artist(s)
        * The song's name
        * A preview link of the song from Spotify
        * The album that the song is from

    - If no song is provided then your program will default to "The Sign" by Ace of Base.

    - You will utilize the node-spotify-api package in order to retrieve song information from the Spotify API.

 ====================================================== */
function songSearch(song) {

    let songQuery = 'https://api.spotify.com/v1/search?query=bad&type=track&offset=0&limit=20';

    spotify
      .search({ type: "track", query: song, limit: 5 })
      .then(function(response) {
        //   let result = response;
        //   result.forEach(function(item) {
        //         console.log(chalk.green("***************"));
        //         console.log(`Song Title: ${response.tracks.items[0].name}`);
        //         console.log();
        //         console.log(`Artist: ${response.tracks.items[0].artists[0].name}`);
        //         console.log();
        //         console.log(`Album: ${response.tracks.items[0].album.name}`);
        //         console.log();
        //         if (response.tracks.items[0].preview_url) {
        //           console.log(`Song Preview: ${response.tracks.items[0].name}`);
        //           console.log(chalk.green("***************"));
        //         } else {
        //           console.log("Sorry no preview for this song");
        //           console.log(chalk.blue("***************"));
        //         }
        //   });

        // ------ TESTING ------- //
        console.log(chalk.green("***************"));
        console.log(response);
        console.log(chalk.green("***************"));
        console.log(response.tracks);
        console.log(chalk.red("***************"));
        // ------ TESTING ------- //

        console.log(response.tracks.items);
        console.log(chalk.blue("***************"));
        // Create a variable to hold our results so we can loop through it 
        let result = response.tracks.items;
        result.forEach(function(item) {
            console.log()
        });
        console.log(response.tracks.items[0]);
        console.log(chalk.green("***************"));
        console.log(`Song Title: ${response.tracks.items[0].name}`);
        // console.log(chalk.blue("***************"));
        console.log(`Artist: ${response.tracks.items[0].artists[0].name}`);
        // console.log(chalk.green("***************"));
        console.log(`Album: ${response.tracks.items[0].album.name}`);
        // console.log(chalk.green("***************"));
        if(response.tracks.items[0].preview_url){
            console.log(`Song Preview: ${response.tracks.items[0].name}`);
            console.log(chalk.green("***************"));
        } else {
            console.log("Sorry no preview for this song");
            console.log(chalk.blue("***************"));
        }

      })
      .catch(function(err) {
        console.log(err);
      });

    // axios
    //   .get(songQuery)
    //   .then(function(response) {
    //       console.log(response);
    //       console.log(chalk.green("***************"));
    //       console.log(response.data);
    //   })
    //   .catch(function(err) {
    //       console.log(err);
    //   })
}

// songSearch("smells like teen spirit");

/* ======================================================
    - COMMAND
    $> node liri.js do-what-it-says

    - Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

    - It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
      Edit the text in random.txt to test out the feature for movie-this and concert-this.

====================================================== */
function readFromFile() {
    fs.readFile('random.txt', 'utf8', function(err, data){
        if(err) {
            console.log(err);
        }
        console.log(data);
    });
}