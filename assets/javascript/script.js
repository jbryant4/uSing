// Global Variables 

// Api call for Artist Search
function deezerSearchApi(searchType, searchText) {

    var apiUrl = 'https://deezerdevs-deezer.p.rapidapi.com/search?q=' + searchText;

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
                    .then(function (data) {
                        if (searchType === 'Artist') {

                            audiodbApi(searchText);

                        } else if (searchType === 'Tracks') {

                            displaySongList(data);

                        }
                    });
            };

        });
};


// Api call for Audiodb(bio)
function audiodbApi(artist) {
    
    var apiUrl = 'https://www.theaudiodb.com/api/v1/json/1/search.php?s=' + artist

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json()
                    .then(function (data) {
                        console.log(data.artists);
                        if(data.artists === null ){

                            console.log('not and artist');

                        } else {

                        console.log(data.artists[0].strBiographyEN)  //grab bio
                        console.log(data.artists[0].strArtistThumb)  //grab thumb photo

                        };
                    });
            };
        });
};


// Api call for Bandsintown (upcoming event)

function tmApi() {
    var apiKey = 'GvuG9sFzxt6XO7L3yZz0IgWgb4upTz6D'
    var apiUrl = 'https://app.ticketmaster.com/discovery/v2/events.json?size=1&keyword=' + artist + '&apikey=' + apiKey
    

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json()
                    .then(function (data) {
                        console.log(data);
                    });
            };
        });
};

// tmApi()


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
// Function for search
$('.searchBtn').each(function () {
    $(this).on('click', function (event) {
        event.preventDefault();

        // grab input text and button text
        var searchType = $(this).text().trim();
        var searchText = $('#search-bar').val().trim();

        // clear text area 
        $('#search-bar').val('');

        // send to search function
        deezerSearchApi(searchType, searchText);
    });
});

