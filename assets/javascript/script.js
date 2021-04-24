// Global Variables 
var spotifyAuth = 'BQAkLl-vlm9D59bFA7L8ZGVnQuTXgpFt5sgbkmR86pjQTej5q_cugrYuJgWMpYBFhIISkQ0PjldK0jshQhoEKGUpNdZ0vv8dOeTgRzqol-F-w7-5g0XVmH2Q4JvAV88WeeDFKYkvboJUbqk'
// Test Variables
var artist = 'drake'
var song = 'one dance'
// Api call for Spotify
function spotifySearchApi() {
    var apiUrl = 'https://api.spotify.com/v1/search?q=' + artist + '&type=artist&market=US&limit=5'

    fetch(apiUrl, {
        headers: {authorization: 'Bearer ' + spotifyAuth}
    })
        .then(function (response) {
            if (response.ok) {
                response.json()
                    .then(function (data) {
                        console.log(data.artists.items[0].id)  //grab id
                        console.log(data.artists.items[0].name) // grab name 
                    });
            };
        });
};

// spotifyApi()  un comment to run function


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
    var apiUrl = 'https://rest.bandsintown.com/artists/' + artist + '/events?app_id=' + apiKey +'&date=upcoming'

    fetch(apiUrl, {headers: {accept: 'application/json'}})
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
// bandsintownApi() un comment to run function 
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
