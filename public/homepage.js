$(document).ready(function(e) {

	$('#login').click(function() {
		$('#loginReq').modal();
		$('#user').focus();
	});

	$('#submitLogin').click(function () {
		var user = $('#user').val();
		var pass = $('#pass').val();
		if(user === "" || pass === ""){return;} //do some sort of error message here
		alert("Username: "+user+" Password: "+pass);
		console.log("Username: "+user+" Password: "+pass);
		$('#user').val("");
		$('#pass').val("");
	});

	$('#register').click(function() {
		alert("REGISTER");
	}); 

	$('#srch-btn').click(function() {
		var query = $('#srch-trm').val();
		if(query === ""){return;}
		alert("Search for "+query);
		// send query to the database
	});

});