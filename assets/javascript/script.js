// Global Variables 

// Api call for Artist Search
function deezerSearchApi(searchType, searchText) {
    // give a class to the for form section
    $('#form-section').addClass('l3')

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

                            // make artist content section visable and hide track section
                            $('.track-search').hide(1000);
                            $('.artist-search').show(1000);

                            // display top 25 songs by artist
                            displaySongList(data.data, searchType);



                        } else if (searchType === 'Track') {

                            // make track content section visable and hide artist section
                            $('.artist-search').hide(1000);
                            $('.track-search').show(1000);

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

    var trackAlbumCover = $('<img>').attr({ 'src': songAlbumCover, 'alt': 'Album Cover' });
    var trackTitle = $('<p>').text(songTitle);
    var trackArtist = $('<p>').text(songArtist);

    //! still need to figure out audio 
    // var songPreview = $('<audio>').addClass('col s3').attr('src',songPreview);

    trackInfo.append(trackAlbumCover);
    trackInfo.append(trackTitle);
    trackInfo.append(trackArtist);

    trackDiv.append(trackInfo);
    trackDiv.append(previewDiv);


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
                            tmApi(artist)

                        };
                    });
            };
        });
};

// function to display the bio and rhumb to the page 
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
function tmApi(artist) {
    var apiKey = 'GvuG9sFzxt6XO7L3yZz0IgWgb4upTz6D'
    var apiUrl = 'https://app.ticketmaster.com/discovery/v2/events.json?size=5&keyword=' + artist + '&apikey=' + apiKey


    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json()
                    .then(function (data) {
                        futureEvents(data);
                    });
            };
        });
};

// function to display furture events 
function futureEvents(data) {

    console.log(data)
    var eventDate = data._embedded.events[0].dates.start.localDate;
    var eventTime = data._embedded.events[0].dates.start.localTime;
    var eventCity = data._embedded.events[0]._embedded.venues[0].city.name;
    var eventCountry = data._embedded.events[0]._embedded.venues[0].country.countryCode;
    var eventLink = data._embedded.events[0].url;

    console.log(eventDate, eventTime, eventCity, eventCountry, eventLink)

    //! make a for loop for the 5 events and append to the page 
}

// Api call for Lyrics (song lyrics)
function lyricApi() {
    var apiUrl = 'https://api.lyrics.ovh/v1/' + artist + '/' + song

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json()
                    .then(function (data) {
                        displayLyrics(data.lyrics) // grab lyrics 
                    });
            };
        });
};

// funciton to display lyrics on page
function displayLyrics(lyrics) {

    console.log(lyrics)

}


// Function to load page from local Storage
function loadSearch() {
    var searchList = localStorage.getItem("searchList");

    if (searchList === null) {
        console.log("empty");
    } else {
        var searchList = JSON.parse(searchList);

        for (i = 0; i < searchList.length; i++) {

            searchText = searchList[i].searchText;
            searchType = searchList[i].searchType;
            // create button with class
            var savedBtn = $("<button>").text(searchText).addClass('saved-btn').attr('search', searchType);

            // apend to page
            $('#saved-search').append(savedBtn);
            ;
        }
    }
};

// Function to save searches to local Storage
function saveSearch(searchType, searchText) {

    // create button with class
    var savedBtn = $("<button>").text(searchText).addClass('saved-btn').attr('search', searchType);

    // apend to page
    $('#saved-search').append(savedBtn);

    // check if their is a local storage
    var searchList = localStorage.getItem("searchList");

    if (searchList === null) {

        var listObj = JSON.stringify([{ searchType: searchType, searchText: searchText }]);
        var searchList = localStorage.setItem("searchList", listObj);

    } else {

        searchList = JSON.parse(searchList);
        searchList.push({ searchType: searchType, searchText: searchText });
        localStorage.setItem("searchList", JSON.stringify(searchList));
    }

};

// Function for search btns
$('.searchBtn').each(function () {
    $(this).on('click', function (event) {
        event.preventDefault();

        // grab input text and button text
        var searchType = $(this).text().trim();
        var searchText = $('#search-bar').val().trim();

        // clear text area 
        $('#search-bar').val('');

        // save search function
        saveSearch(searchType, searchText)
        // send to search function
        deezerSearchApi(searchType, searchText);
    });
});

// delete button function
$('#delete-btn').on('click', function (event) {
    event.preventDefault
    // clear local storage and search history div
    $('#saved-search').empty();
    localStorage.clear();
});


// function for when search buttons are clicked 
$('#saved-search').on('click','button', function (event) {
    event.preventDefault();
    
    // grab input text and button text
    var searchType = $(this).attr('search');
    var searchText = $(this).text().trim();
    console.log(searchType)

    deezerSearchApi(searchType, searchText);
});


loadSearch();