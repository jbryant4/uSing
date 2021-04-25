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

                            // check if artist
                            audiodbApi(searchText);
                            // display top 25 songs by artist
                            displaySongList(data.data, searchType);


                        } else if (searchType === 'Tracks') {

                            displaySongList(data.data, searchType);

                        }
                    });
            };

        });
};

// list results from song search 
function displaySongList(data, searchType) {
    // set for loop length depending on the searchType
    if (searchType === 'Artist') {
        var loopLength = data.length;
    } else if (searchType === 'Tracks') {
        var loopLength = 5;
    };
console.log(data)
    // run for loop to display tracks on the page 
    // for (i = 0; i <= loopLength - 1; i++) {
        // grab all elements
        var i = 0; 
        songTitle = data[i].title;
        songArtist = data[i].artist.name;
        songAlbumTitle = data[i].album.title;
        songAlbumCover = data[i].album.cover_small;
        songPreview = data[i].preview;

        var trackDiv = $('<div>').addClass('row')
        var trackInfo = $('<div>').addClass('col s8');
        var previewDiv = $('<div>').addClass('col s4').text('preview');

        var trackAlbumCover = $('<img>').attr({'src':songAlbumCover, 'alt':'Album Cover'});
        var trackTitle = $('<p>').text(songTitle);
        var trackArtist = $('<p>').text(songArtist);
        
        //! still need to figure out auto 
        // var songPreview = $('<audio>').addClass('col s3').attr('src',songPreview);

        trackInfo.append(trackAlbumCover);
        trackInfo.append(trackTitle);
        trackInfo.append(trackArtist);

        trackDiv.append(trackInfo);
        trackDiv.append(previewDiv);

        $('#tracks').append(trackDiv);
    // }
    //! still need the tracks to show up nice 
    // make a div that can hold the album cover/songtitle + songartist in colums
};


// Api call for Audiodb(bio)
function audiodbApi(artist) {

    var apiUrl = 'https://www.theaudiodb.com/api/v1/json/1/search.php?s=' + artist

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json()
                    .then(function (data) {
                        if (data.artists === null) {

                            // put modal here 
                            alert('not and artist');
                            location.reload();

                        } else {

                            var artistBio = data.artists[0].strBiographyEN  //grab bio
                            var artistThumb = data.artists[0].strArtistThumb  //grab thumb photo

                            // build bio section
                            buildBio(artistBio, artistThumb);


                        };
                    });
            };
        });
};

function buildBio(bio, thumb) {

    // set variables 
    var bioDiv = $('<div>').addClass('bio-div');
    var bioImg = $('<img>').attr({ 'src': thumb, 'alt': 'Artist' });
    var bioText = $('<p>').text(bio);

    // make a bio div
    bioDiv.append(bioImg);
    bioDiv.append(bioText);
    // ! append to the page whereever we want 

}

// Api call for TicketMaster (upcoming event)
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

