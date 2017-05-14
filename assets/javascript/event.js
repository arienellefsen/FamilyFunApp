var familyFun = {
    keyApi: 'qCDfKZL82TkzJCrr',
    limit: '10',
    category: 'family_fun_kid',
    displayEvent: function(radius, zip, categoryFilter, dateEvent) {
        var urlQuery = 'https://api.eventful.com/json/events/search?location=' + zip + '&within=' + radius +
            '&q=' + categoryFilter + '&c=' + this.category + '&date=' + dateEvent + '&app_key=' + 'qCDfKZL82TkzJCrr'
        console.log(urlQuery);
        console.log("date:" + dateEvent);
        $.ajax({
            url: urlQuery,
            method: 'GET',
            dataType: 'jsonp',
            success: function(response) {
                //Check if we got data from API 
                if (response.page_count === '0') {
                    $('#message-no-result').css('display', 'block');
                    $('#message-no-result').text('No results found. Please try another zip code');
                    return;
                } else {
                    $('#message-no-result').css('display', 'none');

                    for (var i = 0; i < 10; i++) {
                        var builHTML = '';
                        //console.log("my title: "+response.events.event[i].title);
                        builHTML += '<div class = "col-md-3 col-sm-4 card">';
                        //builHTML += '<img src="'+response.events.event[i].image +'" class="img-responsive">';
                        builHTML += '<b class="title">' + response.events.event[i].title + '</b>';
                        builHTML += '<p> Event Address:' + response.events.event[i].venue_address + '</p>';
                        builHTML += '<p> Start Time:' + response.events.event[i].start_time + '</p>';
                        builHTML += '<p> Postal code:' + response.events.event[i].postal_code + '</p>';
                        builHTML += ' </div>';
                        //$('#result').append("<img src='"+response.events.event[i].img+"'");
                        $('#result').append(builHTML);
                    }
                    //you have  abug when you serach for the second time, slide doesn't work
                    slideContent();
                    $("#weather").css('display', 'block');
                    $("#map").css('display', 'block');
                }
            },
        }) // end ajax
    },
};

//Create a click event on search button and call display event function
$("#btnSearch").click(function() {
    $('#result').empty();
    $("#weather").empty();
    $("#map").empty();
    $("#weather").css('display', 'none');
    $("#map").css('display', 'none');

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

function resetSearch() {
    //Clean input fields for new search       
    var radius = $('#radius').val('');
    var zip = $('#search').val('');
    var categoryFilter = $('#activities').val('');
    var dateEvent = $('#event-date').val('');
}

//Call slide
function slideContent() {
    $(".regular").slick({
        dots: true,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 3
    });
}