# Liri-Node

### A Node based CLI application that helps you search for your favorite entertainment information.

## Project Information:

#### The LIRI app is a Language Interpretation and Recognition Interface  Command Line Interface(CLI) Node/JavaScript application that takes in user search input and returns requested data.

#### LIRI searches The Spotify API for songs, artists and albums. Bands in Town API for concert info, and the OMDB API for movie information. The Inquirer.js package was used to make the interface more interactive. Axios and Promises were used to handle the request/response cycle. Basic file system read allows for 'random' search pulled from a txt file in the application directory

## LIRI can perform four basic functions:

* To find movie information: Search OMDB API
* To find concert information: Search Bands In Town API
* To find song track, artist or album information: Search Spotify API 
* For a surprise search, Then the program will read a command written in a text file and return the information to you.

* LIRI will also log all of your search results to a text file, called log.txt, so you can refer back to your newfound information!


## Technologies Used:

* Javascript
* Node
* API calls with Axios library
* Inquirer - for better user interaction
* FS- Read/Write data to file


## How to download and play with application:

```javascript
// Clone a local copy to your machine
$> git clone https://github.com/ehoversten/Liri-Node.git

// Change directories into the new project
$> cd Liri-Node

// Install required libraries and dependancies
$> npm install

// Run the app.js file 
$> node app.js

```

#### Follow the prompts, use the up/down arrow keys to make selections, Enjoy!!!