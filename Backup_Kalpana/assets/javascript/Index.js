$(document).ready(function(){
var myAccountClicked = false;
		
		$('#radiusOptions li a').click(function(){
			$('#radius').text($(this).text());
			
		  });
		$('#allActivities li a').click(function(){
			$('#activities').text($(this).text());
			
		  });
		
		
		
		
		/*$("#btnSearch").click(function() {
		if( /^\d{5}(-\d{4})?$/.test($("#search").val())){
				$("#headerError").text("");
				
			}
			else{
				$("#headerError").text("Incorrect Zip Code entered!");
				
				
			}
		});*/
		
		
});

function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}