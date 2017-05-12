$(function() {
    $( "#datepicker" ).datepicker();
});


// Initialize Firebase
  var config = {
    apiKey: "AIzaSyAJEi_JvE0H6KMiVJbPFwhtyf7UtW9vzaE",
    authDomain: "familyfun-248fa.firebaseapp.com",
    databaseURL: "https://familyfun-248fa.firebaseio.com",
    projectId: "familyfun-248fa",
    storageBucket: "familyfun-248fa.appspot.com",
    messagingSenderId: "983154250049"
  };
  
  firebase.initializeApp(config);

//set variables for search criteria
var location2 = "07901";
var criteria = "family";
var radiuns = 50;
var limit =10;

//create function to run search

function runSearch(){
    var key = "&app_key=qCDfKZL82TkzJCrr";
    var queryURL = "https://api.eventful.com/json/events/search?location=New%20York&category=music&date=future&app_key=qCDfKZL82TkzJCrr";

    //build query
    var stringQuery = location2+"&within="+radiuns+"&category="+"&total_items="+limit+criteria+"&date=future";
    var queryURL = "https://api.eventful.com/json/events/search?location="+stringQuery+key;
    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET",
        dataType: "jsonp",
        success: function(response){
        console.log(response);

        //loop trough data json file

            for(i=0; i< 10; i++){
                var eventTitle = response.events.event[i].description;
                console.log("Event name:" + eventTitle);
                    

                    $(".title").append(eventTitle);
            }



            //append to html

     

        }
    })// end ajax
}

    //Call run fucntion

    $("#btnSearch").click(function(){

        runSearch();

    });


//https://api.eventful.com/json/events/search?location=New%20York&category=music&date=future&app_key=qCDfKZL82TkzJCrr
//Get key and url for Api

//var queryURL = "https://api.eventful.com/json/events/search?location=New%20York&category=music&date=future&app_key=qCDfKZL82TkzJCrr";

//Create search criteria

//address - separate by space
// date - YYYYMMDD00-YYYYMMDD00's
// radius - within 
//activities - categories
//for date we need to use momentum js



