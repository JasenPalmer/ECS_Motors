$(document).ready(function(e) {

	$('#login').click(function() {
		$('#loginReq').modal();
	});

	$('#submitLogin').click(function () {
		var user = $('#user').val();
		var pass = $('#pass').val();
		if(user === "" || pass === ""){return;} //do some sort of error message here
		//alert("Username: "+user+" Password: "+pass);
		console.log("Username: "+user+" Password: "+pass);
		$.ajax({
	      url: '/users',
	      method: 'PUT',
	      data: JSON.stringify({
	      	username: user,
	      	password: pass
	      }),
	      dataType: 'json',
	      contentType: "application/json; charset=utf-8",
	      success: function(result) {
	      	console.log("Successfully sent");
	      },
	      error: function(result) {
	        console.log(result);
	      }
	  	});
	  	$('#user').val("");
		$('#pass').val("");
	});

	$('#register').click(function() {
		$('#registerModal').modal();
	});

	$('#registerUser').click(function() {
		var firstname = $('#firstname').val();
		var lastname = $('#lastname').val();
		var username = $('#username').val();
		var email = $('#email').val();
		var password = $('#password').val();
		if(firstname === "" || lastname === "" || username === "" || email ===
			"") {return;}
		$.ajax({
			url:'/users/register',
			method: 'POST',
			data: JSON.stringify({
				'firstname': firstname,
				'lastname': lastname,
				'username': username,
				'email': email,
				'password': password
			}),
			dataType: 'json',
			contentType: "application/json; charset=tf-8",
			success: function(result) {
	      		console.log("Successfully added new user");
		    },
		    error: function(result) {
		    	console.log("Failed to add new user");
		    }
		});
		$('#firstname').val("");
		$('#lastname').val("");
		$('#username').val("");
		$('#email').val("");
		$('#password').val("");
		$('#register-suc').modal();
	});

	$('#srch-btn').click(function(event) {
        event.preventDefault();
		var query = $('#srch-trm').val();
		if(query === ""){return;}

    $.ajax({
      url:'/search',
      method: 'POST',
      data: JSON.stringify({
        'query': query
      }),
      dataType: 'json',
      contentType: "application/json; charset=tf-8",
      success: function(result) {
            console.log(query);
        },
        error: function(result) {
          $.get('/search');
        }
    });
	});

	$('#google-login').click(function () {
		$.ajax({
			url: '/auth',
			method: 'GET'
		});
	});

    $('#butSub').click(function() {
        swal('Get Back To You Soon!','Email Sent Successfully','success');
    });

});
