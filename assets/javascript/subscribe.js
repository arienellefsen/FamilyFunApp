//Store subscriber information in FireBase
//including the subscriber's name,
//the email address and the zip codes for the interested events' locations

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


//add handler for the subscribe button that upon click
//check if the subscriber already exists in the DB by querying with the entered email address
//For the case of existing subscriber, update the subscriber's zipcode to include the entered zipcode if the zipcode new
//For the case of new subscriber, create the record with the entered zipcode, name and email address
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
    console.log('subscribe with' + email + ' for zipcode ' + zipcode);

    var queryWithEmail = database.ref().orderByChild('email').equalTo(email);
    queryWithEmail.once('child_added', function(snapshot){
      //this is an existing user
      //console.log("find key: " + snapshot.key);
      var subscribedZipcodes = snapshot.val().zipcode;
      if(subscribedZipcodes.indexOf(zipcode) == -1){
        //console.log("not found zipcode " + zipcode + " in " + subscribedZipcodes);
        subscribedZipcodes += ',' + zipcode;
        //console.log("update " + snapshot.key + ' with zipcode ' + subscribedZipcodes);
        database.ref().child(snapshot.key).update({zipcode: subscribedZipcodes});
        $('.modal-title').text('Subscribed information successfully updated');
      }
    }); //handle add the data into DB

    queryWithEmail.once("value", function(snapshot){
      if (!snapshot.exists()){
          //this is an new user
          console.log('No child exists');
          var newSubscriber = {
            zipcode: zipcode,
            username: name,
            email: email
          };

          // Uploads employee data to the database
          database.ref().push(newSubscriber);
          $('.modal-title').text('Subscriber successfully added');
      }
    });

    // Clears all of the text-boxes
    $("#zipcode").val("");
    $("#name").val("");
    $("#email").val("");
  }); //add listener
}

$(document).ready(function(){
  //Initialize Firebase
  initUserDB();

  //get the current time for display
  var currentTime = moment([]);
  $('#current-time').text(currentTime.format());

  //add handler to add or update subscriber information
  addSubBtnClickListener();
});