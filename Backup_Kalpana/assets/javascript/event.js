//Create variables for map
var map;
var markers = [];

//initialize map
function initMap() {
    var populateMap = {
        lat: 42.877742,
        lng: -97.380979
    };
	var monthNames = ["January", "February", "March", "April", "May", "June",
	"July", "August", "September", "October", "November", "December"
		];


    //Center map in the using USA lat and long coordinates
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: populateMap,
    });

    //Create a object called family with proprties to be used to search Api eventful 
    var familyFun = {
        keyApi: 'qCDfKZL82TkzJCrr',
        limit: '10',
        category: 'family_fun_kid',
        displayEvent: function(radius, zip, categoryFilter, dateEvent) {
            var urlQuery = 'https://api.eventful.com/json/events/search?location=' + zip + '&within=' + radius +
                '&q=' + categoryFilter + '&c=' + this.category + '&date=' + dateEvent + '&app_key=' + 'qCDfKZL82TkzJCrr'
            $.ajax({
                url: urlQuery,
                method: 'GET',
                dataType: 'jsonp',
                success: function(response) {
                    handleResponse(response);
                },
            }) // end ajax
        },
    };

    function handleResponse(response) {
        //Check if we got data from API 
        //If there is no reponse, display message
        if (response.page_count === '0') {
            $('#message-no-result')
                .css('display', 'block')
                .text('No results found. Please try another zip code');
            return;
        } else {
            //If we did get the data call build html to display data 
            $('#message-no-result').css('display', 'none');

            //clean google markers everytime the map is loaded
            clearMarkers();

            //display map
            $("#map").css('visibility', 'visible');
            
            //loop through results
            for (var i = 0; i < 10; i++) {
                latMap = response.events.event[i].latitude;
                longMap = response.events.event[i].longitude;
				var dateTime = new Date(response.events.event[i].start_time);
				var month = monthNames[dateTime.getMonth()];
				var date = ("0" + dateTime.getDate()).slice(-2);
				var hours = dateTime.getHours(); //returns 0-23
				var minutes = dateTime.getMinutes();
				if(minutes === 0)
					minutes = '00';
				
            //build html     
                var builHTML = '';
				builHTML += '<div class="col-sm-6 col-md-6">';
				builHTML += '<div class="panel panel-primary"><div class="panel-heading card-link"><a href="' + response.events.event[i].venue_url +'" > ' + response.events.event[i].title + ' </a></div><div class="panel-body">';
                builHTML += '<div class="card"><div class="card-block">';
                //builHTML += '<h4 class="card-title">' + response.events.event[i].title + '</h4>';
                builHTML += '<h4 class="card-title mb-2">' + response.events.event[i].venue_name + '</h4>';
				builHTML += '<div class="col-sm-6 col-md-6">';
				builHTML += '<div class="card-text">' + response.events.event[i].venue_address + ', ' + response.events.event[i].city_name + ', ' + response.events.event[i].region_abbr ;
				builHTML += '</div></div><div class="col-sm-6 col-md-6">';
                builHTML += '<div class="card-text"><b>' + month + '</b> ' + date + ' at ' + hours + ':' + minutes + '</div>';
				builHTML += '</div></div>';
                //builHTML += '<a href="'+ response.events.event[i].venue_url +'" class="card-link"> Venue URL </a>';
                builHTML += ' </div></div></div></div>';
                $('#result').append(builHTML);

            //Call funtion to set markers on map
                setMapOnAll(map);

            //Populate map with markers
                populateMap = new google.maps.LatLng(Number(latMap), Number(longMap));
                var marker = new google.maps.Marker({
                    position: populateMap,
                    map: map,
                });
            //Push markes to an array markers      
                markers.push(marker);
            }
            //call slide function to display slider
            slideContent();
            //Display weather and map html
            $("#weather").css('display', 'block');
            $("#map").css('visibility', 'visible');
        }
    }

    // Removes the markers from the map, but keeps them in the array.
    function clearMarkers() {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
        }
        markers = [];
    }
    // Set markers on map
    function setMapOnAll(map) {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
            console.log("markers: ", markers[i]);
        }
    }

    //Create a click event on search button and call display event function
    $("#btnSearch").click(function() {
        $('#result').empty();
        $("#weather").empty();
        $("#weather").css('display', 'none');
        $("#map").css('visibility', 'hidden');
        $("section.slider").removeClass('slick-initialized slick-slider slick-dotted');
        var radius = $('#radius').val();
        var zip = $('#search').val();
        var categoryFilter = $('#activities').val();
        var dateEvent = $('#event-date').val();
        // Need to validate if fields are not empty
        if (zip !== '') {
            familyFun.displayEvent(radius, zip, categoryFilter, dateEvent);
            getWeatherInfoByZipCode(zip);
            resetSearch();
            $('#message').css('display', 'none');
        } else {
            console.log('zip cannot be empty');
            $('#message').css('display', 'block');
            $('#message').text('Search cannot be empty');
        }
    });

    //Clean input fields for new search 
    function resetSearch() {
        var radius = $('#radius').val('20');
        var zip = $('#search').val('');
        var categoryFilter = $('#activities').val('museum');
        var dateEvent = $('#event-date').val('');
    }

    //Call library slide slick to create an infinite carousel
    function slideContent() {
        $(".regular").slick({
            dots: true,
            infinite: true,
            slidesToShow: 4,
            slidesToScroll: 3
        });
    }
}