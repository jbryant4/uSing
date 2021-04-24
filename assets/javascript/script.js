// Global Variables 

// Test Variables
var artist = 'drake'
var song = 'one dance'
// Api call for Spotify
function deezerSearchApi() {
    var apiUrl = 'https://deezerdevs-deezer.p.rapidapi.com/search?q=' + artist;

    fetch(apiUrl, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "3eecc6021amshac1c709273a57dfp1b6f7bjsnc415d9bda09d",
            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com"
        }
    })
        .then(function (response) {
            if (response.ok) {
                response.json()
                .then(function (data){
                    console.log(data.data[0].title)  //grab song title 
                    console.log(data.data[0].album.cover) //song album cover   
                    console.log(data.data[0].preview) //song album cover   
                });
            };

        });
};


deezerSearchApi()

// Api call for Audiodb(bio)
function audiodbApi() {
    var apiUrl = 'https://www.theaudiodb.com/api/v1/json/1/search.php?s=' + artist

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json()
                    .then(function (data) {
                        console.log(data.artists[0].strBiographyEN)  //grab bio
                        console.log(data.artists[0].strArtistThumb)  //grab thumb photo
                    });
            };
        });
};

// audiodbApi() un comment to run function 

// Api call for Bandsintown (upcoming event)

function bandsintownApi() {
    var apiKey = '4874927f-ca28-438a-b6af-43773b79657a'
    var apiUrl = 'https://rest.bandsintown.com/v4/artists/' + artist + '/events/?app_id=yOUrSuP3r3ven7aPp-id'

    fetch(apiUrl, { headers: { accept: 'application/json' } })
        .then(function (response) {
            if (response.ok) {
                response.json()
                    .then(function (data) {
                        console.log(data);
                    });
            };
        });
};
// ! getting error will try and fix 
// bandsintownApi()
// Api call for Lyrics (song lyrics)
function lyricApi() {
    var apiUrl = 'https://api.lyrics.ovh/v1/' + artist + '/' + song

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json()
                    .then(function (data) {
                        console.log(data.lyrics) // grab lyrics 
                    });
            };
        });
};

// lyricApi() un comment to run function 


// Function to load page from local Storage
// Function to save searches to local Storage
