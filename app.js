require("dotenv").config();
let keys = require("./keys.js");
var Spotify = require('node-spotify-api');
let axios = require('axios');

// var spotify = new Spotify(keys.spotify);
// console.log(spotify);

let omdbKey = keys.omdb;
// console.log(omdbKey); 

/* ======================================================
   - COMMAND
   $> node liri.js concert-this <artist/band name here>

   - This will search the Bands in Town Artist Events API ("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp") for an artist and render the following information about each event to the terminal:

        * Name of the venue
        * Venue location
        * Date of the Event (use moment to format this as "MM/DD/YYYY") 

=================================================================== */
let searchTerm = "";

function concertSearch(query) {

    let artist = query.toLowerCase();
    let newQuery = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
    console.log(newQuery);

    axios.get(newQuery).then(function(response) {
        console.log("Found Results")
        // console.log(response.data);
        let results = response.data;
        results.forEach(function(event) {
            console.log("=========================");
            console.log("Event for " + artist.toUpperCase());
            console.log(event.offers[0].type + ", Status: " + event.offers[0].status);
            console.log("Playing at: " + event.venue.name);
            console.log("In " + event.venue.city + ", " + event.venue.region + " (" + event.venue.country + ")");
            console.log("Date: " + event.datetime);
            console.log("=========================");
            console.log("");
            // console.log("******************");
        });
    }).catch(function(err){
        console.log(err);
    }); 
}

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

=================================================================== */
function movieSearch(movie) {
    // http://www.omdbapi.com/?apikey=[yourkey]&
    let userInput = movie.toLowerCase();
    // var queryURL = "https://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=trilogy";

    // Let's build our query search 
    let queryURL = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=" + omdbKey.apikey;
    // console.log(queryURL);

    // Send our constructed query string to the API
    axios
      .get(queryURL)
      .then(function(response) {
        console.log(response.data);
        let result = response.data;
        console.log("******************");
        console.log(`Title: ${result.Title}`);
        console.log(`Year Released: ${result.Year}`);
        console.log(`IMDB Rating: ${result.imdbRating}`);
        console.log(`Country Produced: ${result.Country}`);
        console.log(`Rotten Tomatoes Rating: ${result.Ratings[1].Value}`);
        console.log(`Language: ${result.Language}`);
        console.log(`Movie Plot: ${result.Plot}`);
        console.log(`Actors: ${result.Actors}`);
        console.log("******************");
      })
      .catch(function(err) {
        console.log(err);
      });
}

// let title = "Jaws"
movieSearch("avatar");