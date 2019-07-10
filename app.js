require("dotenv").config();
let keys = require("./keys.js");
let axios = require('axios');

/* -----------------------------------------------
*   COMMAND
*   $> node liri.js concert-this <artist/band name here>
*
*   This will search the Bands in Town Artist Events API ("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp") for an artist and render the following information about each event to the terminal:
*
*   Name of the venue
*   Venue location
*   Date of the Event (use moment to format this as "MM/DD/YYYY") 
*
--------------------------------------------------- */ 
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

concertSearch("Spoon");