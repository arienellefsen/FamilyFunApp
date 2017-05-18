/* global firebase moment */
// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new train schedules - then update the html + update the database
// 3. Create a way to retrieve train schedules from the train database upon record been added or deleted from DB
// 4. adding remove buttons for each train. Let the user delete the train
// 5. Create a way to calculate the next arrival time and minutes to arrival for the trains every minute. Using difference between start and current time.
//    Then use moment.js formatting to set difference in current time and the scheduled arrival time.

var database = null;

//Initialize Firebase
function initUserDB(){
  var config = {
    apiKey: "AIzaSyCDS7biKyndh6lJJOExBSm36xvrde87-7g",
    authDomain: "supportusers-90f71.firebaseapp.com",
    databaseURL: "https://supportusers-90f71.firebaseio.com",
    projectId: "supportusers-90f71",
    storageBucket: "supportusers-90f71.appspot.com",
    messagingSenderId: "895161493012"
  };
  firebase.initializeApp(config);
  database = firebase.database();
}


//add handler for the Add button been clicked to add the train into DB and the schedule dashboard
function addSubBtnClickListener(){
  $("#subscribe").on("click", function(event) {
    event.preventDefault();

    // Grabs user input
    var zipcode = $("#zipcode").val().trim();
    var name = $("#name").val().trim();
    var email = $("#email").val().trim();
    if(zipcode.length==0 || name.length==0 || email.length==0){
      // Alert
      alert("Please fill in all the information.");
      return;
    }

    // Creates local "temporary" object for holding employee data
    var newSubscriber = {
      zipcode: zipcode,
      username: name,
      email: email
    };

    // Uploads employee data to the database
    database.ref().push(newSubscriber);
    // Alert
    alert("Subscriber successfully added");

    // Clears all of the text-boxes
    $("#zipcode").val("");
    $("#name").val("");
    $("#email").val("");
  });
}

$(document).ready(function(){
  //Initialize Firebase
  initUserDB();

  //get the current time for display
  var currentTime = moment([]);
  $('#current-time').text(currentTime.format());

  addSubBtnClickListener();

});