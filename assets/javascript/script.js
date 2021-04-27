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
    } else if (searchType === 'Track') {
        var loopLength = 5;
    };

    // run for loop to display tracks on the page 
    for (i = 0; i <= loopLength - 1; i++) {
        // grab all elements

        songTitle = data[i].title;
        songArtist = data[i].artist.name;
        songAlbumTitle = data[i].album.title;
        songAlbumCover = data[i].album.cover_small;
        songPreview = data[i].preview;

        var trackInfo = $('<div>').addClass('track-info generated')
        var imgDiv = $('<div>').addClass('img-div generated')
        var trackDiv = $('<div>').addClass('track generated')


        var trackAlbumCover = $('<img>').attr({ 'src': songAlbumCover, 'alt': 'Album Cover', 'id': 'album-cover' }).addClass('generated');
        var trackTitle = $('<p>').text(songTitle).addClass('generated');
        var trackArtist = $('<p>').text('By: ' + songArtist).addClass('generated');


        // ! TEST 
        var songBtn = $('<audio>').addClass('generated').attr('controls', '');
        var songSource = $('<source>').attr({ src: songPreview, type: 'audio/mpeg' })
        songBtn.append(songSource)


        imgDiv.append(trackAlbumCover);

        trackInfo.append(trackTitle);
        trackInfo.append(trackArtist);

        trackDiv.append(imgDiv);
        trackDiv.append(trackInfo);
        trackDiv.append(songBtn);

        $('.track-list').append(trackDiv)
    }
    //! still need the tracks to show up nice 

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
                            buildBio(artistBio, artistThumb,);
                            tmApi(artist)

                        };
                    });
            };
        });
};

// function to display the bio and rhumb to the page 
function buildBio(bio, thumb) {

    // set variables 
    var bioImg = $('<img>').attr({ 'src': thumb, 'alt': 'Artist', 'id': 'bio-img' }).addClass('generated');
    var bioText = $('<p>').text(bio).addClass('generated');

    // make a bio div
    $('#bio-thumb').append(bioImg);
    $('#bio-text').append(bioText);

}

// Api call for TicketMaster (upcoming event)
function tmApi(artist) {
    var apiKey = 'GvuG9sFzxt6XO7L3yZz0IgWgb4upTz6D'
    var apiUrl = 'https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&size=4&keyword=' + artist + '&apikey=' + apiKey


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


    if (data.page.totalElements === 0) {

        var noEvents = $('<p>')
            .text('This Artist does not have any upcoming events. Sorry!')
            .attr('id', 'no-events').addClass('generated');

        $('#future-events').append(noEvents);
    }

    for (i = 0; i <= data._embedded.events.length - 1; i++) {

        // set variables
        var eventName = data._embedded.events[i].name;
        var eventDate = data._embedded.events[i].dates.start.localDate;
        var eventTime = data._embedded.events[i].dates.start.localTime;
        var eventCity = data._embedded.events[i]._embedded.venues[0].city.name;
        var eventCountry = data._embedded.events[i]._embedded.venues[0].country.countryCode;
        var eventLink = data._embedded.events[i].url;

        // create element
        var eventDiv = $('<div>').addClass('col s6 m3 events generated');

        // create html elements
        var name = $('<h4>').text(eventName).addClass('generated');
        var date = $('<p>').addClass('event-text generated').text('Date:' + eventDate + ' @ ' + eventTime);
        var city = $('<p>').addClass('event-text generated').text('City' + eventCity + ', ' + eventCountry);
        var link = $('<a>').addClass('event-text generated').text('Click Here for more Details').attr('href', eventLink)

        // apend to the page
        eventDiv.append(name);
        eventDiv.append(date);
        eventDiv.append(city);
        eventDiv.append(link);

        $('#future-events').append(eventDiv);

    };
}

// Api call for Lyrics (song lyrics)
function lyricApi(song, artist) {
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

    $('.lyrics').html("");

    var ogLyrics = $('<pre>').text(lyrics).addClass('generated')
    $('.lyrics').append(ogLyrics);


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

        // clear all previous generated content 
        $('.generated').remove();

        var searchText = $('#search-bar').val().trim();
        // make sure that their is text in search bar
        if (searchText === '') {
            alert('need search input') //! add modal
            window.location.reload();
        } else {
        // grab input text and button text
        var searchType = $(this).text().trim();
        var searchText = $('#search-bar').val().trim();



        // clear text area 
        $('#search-bar').val('');

        // save search function
        saveSearch(searchType, searchText)
        // send to search function
        deezerSearchApi(searchType, searchText);
        }
    });
});

// delete button function
$('#delete-btn').on('click', function (event) {
    event.preventDefault
    // clear local storage and search history div
    $('#saved-search').empty();
    localStorage.clear();
});

//  ! note to self add class generated to all generated content so that i can clear you you with out lines and lines of code 

// function for when search buttons are clicked 
$('#saved-search').on('click', 'button', function (event) {
    event.preventDefault();

    // grab input text and button text
    var searchType = $(this).attr('search');
    var searchText = $(this).text().trim();

    // clear all previous generated content 
    $('.generated').remove();

    deezerSearchApi(searchType, searchText);
});

function trackDisplay(song, artist, album) {
    console.log(song, artist, album)
    var trackTi = $('<p>').text('Song Title: ' + song).addClass('generated');
    var trackArt = $('<p>').text('By: ' + artist).addClass('generated');
    var trackAlb = $('<p>').text('From the Album: ' + album).addClass('generated');

    console.log(trackTi, trackArt, trackAlb)
    $('.track-art-alb').append(trackTi);
    $('.track-art-alb').append(trackArt);
    $('.track-art-alb').append(trackAlb);
}

// play track preview
$('.track-list').on('click', 'button', function (event) {
    event.preventDefault();

    var songTitle = $(this).attr('title');
    var songArtist = $(this).attr('artist');
    var songAlbum = $(this).attr('album');

    lyricApi(songTitle, songArtist);

    trackDisplay(songTitle, songArtist, songAlbum);

});



loadSearch();