var familyFun = {
    keyApi: 'qCDfKZL82TkzJCrr',
    limit:'10',
    category:'family_fun_kid',
    displayEvent: function(radius,zip, categoryFilter, dateEvent){
       var urlQuery= 'https://api.eventful.com/json/events/search?location='+zip+'&within='+radius+
        '&q='+categoryFilter+'&c='+this.category+'&date='+dateEvent+'&app_key='+'qCDfKZL82TkzJCrr'
        console.log(urlQuery);
        console.log("date:" + dateEvent);
        $.ajax({
        url: urlQuery,
         method: 'GET',
         dataType: 'jsonp',
         success: function(response){

             //create html
             for(var i=0; i < 10; i++){
                console.log("my title: "+response.events.event[i].title);
                  $('#result').append("<div class='col-md-4'>");
                  $('#result').append("<b> Title Event: "+response.events.event[i].title+"</b></div>");
                  $('#result').append("<p> Event Address: "+response.events.event[i].venue_address+"</p>");
                  $('#result').append("<p> Start Time: "+response.events.event[i].start_time+"</p>");
                  $('#result').append("<p> Postal code: "+response.events.event[i].postal_code+"</p>");
                  $('#result').append("<img src='"+response.events.event[i].img+"'");
                  $('#result').append("</div>");
                }
             }
        })// end ajax
    },
};

//Create a click event on search button and call display event function
$("#btnSearch").click(function(){
    var radius = $('#radius').val();
    var zip = $('#search').val();
    var  categoryFilter = $('#activities').val();
    var dateEvent = $('#event-date').val();
        familyFun.displayEvent(radius,zip, categoryFilter, dateEvent);
 });         




