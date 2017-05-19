//Create variables for map
var map;
var markers = [];
$("#imgSpinner1").hide();

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
                beforeSend: function() {
                    $("#imgSpinner1").show();
                },
                // hides the loader after completion of request, whether successfull or failor.             
                complete: function() {
                    $("#imgSpinner1").hide();
                },
                success: function(response) {
                    handleResponse(response);
                },
            }) // end ajax
        },
    };

    function handleResponse(response) {
      $('#btnSearch').removeAttr('disabled');

        //Check if we got data from API 
        //If there is no reponse, display message
        if (response.page_count === '0') {
            $('#message-no-result')
                .css('display', 'block')
                .text('Please try another zip code');
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

                var dateTime = new Date(response.events.event[i].start_time);
                var month = monthNames[dateTime.getMonth()];
                var date = ("0" + dateTime.getDate()).slice(-2);
                var hours = dateTime.getHours(); //returns 0-23
                var minutes = dateTime.getMinutes();
                if (minutes === 0)
                    minutes = '00';

                latMap = response.events.event[i].latitude;
                longMap = response.events.event[i].longitude;
                //build html     
                var builHTML = '';
                builHTML += '<div class = "col-md-4">'; ('very long string'.slice(0,10))+'...'
                builHTML += '<div class="card-content">';
                builHTML += '<h2 class="title">' + (response.events.event[i].title.slice(0,60))+'...' + '</h2>';
                builHTML += '<h1 class="card-date">' + month + ' ' + date + ' at ' + hours + ':' + minutes + '</h1>';
                builHTML += '<p class="card-address"><b>Venue Name</b>: ' + response.events.event[i].venue_name + '</p>';
                builHTML += '<p class="card-address">' + response.events.event[i].venue_address + ' - ' + response.events.event[i].region_abbr + ' - ' + response.events.event[i].postal_code + '</p>';
                builHTML += ' <div class="card-action"><a href="' + response.events.event[i].url + '" target="_blank">Learn More</a>';
                builHTML += ' </div></div></div>';
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
                map.setZoom(10);
                map.panTo(marker.position);
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

        if (zip !== '' && categoryFilter !=='' && radius !== '' && dateEvent !=='') {
             $(this).attr("disabled","disabled");

            familyFun.displayEvent(radius, zip, categoryFilter, dateEvent);
            getWeatherInfoByZipCode(zip);
            resetSearch();
            $('#message').css('display', 'none');
        } else {
            $('#message').css('display', 'block');
           
            $('#message').text('Please all the fields are required!');
        }
    });

    //Clean input fields for new search 
    function resetSearch() {
        var radius = $('#radius').val('radius');
        var zip = $('#search').val('');
        var categoryFilter = $('#activities').val('activity');
        var dateEvent = $('#event-date').val('');
    }

    //Call library slide slick to create an infinite carousel
    function slideContent() {
        $(".regular").slick({
            dots: false,
            infinite: true,
            slidesToShow: 4,
            slidesToScroll: 3,

            responsive: [{
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }

            ]
        });
    }
}