// This is our api.openweathermap.org API key
    var APIKey = "9653db8b375a737b2906b1e0b371726c";

    // Here we are building the URL we need to query the database
    /*var queryURL = "http://api.openweathermap.org/data/2.5/weather?" +
      "q=Princeton,US&appid=" + APIKey;*/

function getWeatherInfoByZipCode(zipcode){
    var queryURL = "http://api.openweathermap.org/data/2.5/forecast/daily?zip=" 
                    + zipcode + ",us&units=metric&cnt=10&APPID=9653db8b375a737b2906b1e0b371726c";

    // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({
        url: queryURL,
        method: "GET"
      })
      // We store all of the retrieved data inside of an object called "response"
      .done(function(response) {


        // Log the resulting object
        $("#zipcode").html("Weather Forecase for " + zipcode + " <small>based on info from station at "  + response.city.name + "</small>");

        $.each(response.list, function(index, val){
            //var checkDate = new Date(this.dt*1000);
            //var todayFirstTrainTime = moment(todayFirstTrainTimeStr, "YYYY-MM-DDTHH:mm:ss Z");
            var checkDate = moment.unix(this.dt).format("ddd, MM/DD/YY");
            var maxfdegree = Math.round(this.temp.max * 9 / 5 + 32);
            var minfdegree = Math.round(this.temp.min * 9 / 5 + 32);
            var iconid = this.weather[0].icon;


            $("#weather").append("<tr><td>" 
                //+ this.weather[0].main 
                + "<img src='http://openweathermap.org/img/w/" + this.weather[0].icon + ".png'>"
                + "</td><td>" 
                + checkDate + "</td><td>" 
                + this.weather[0].description + "</td><td>" 
                + maxfdegree + '&deg;/' + minfdegree + "&deg;</td></tr>"); 
      });
    });

  }

