$(document).ready(function(e) {

	$('.carClick').click(function() {
		var id = $(this).attr("id"); //get the car id number
		var imgSrc = $(this).attr("src");
		$.ajax({
			url: '/cars/'+id,
			method: 'GET',
			dataType: 'json',
			contentType: "application/json; charset=utf-8",
			success: function(result) {
				console.log("Successfull request");
				if(result.length == 0){
					console.error("The car was not found");
					return;
				}
				appendInfoToModal(result, imgSrc);
			},
			error: function(result) {
				console.log("Something went wrong");
			}
		});
	});

	var Cart = [];
	var newToCart = [];
	function addItemToCart(car){
		for(var i in newToCart){
			if(newToCart[i].id === car.id){
				//newToCart[i].count++;
			$.ajax({
				url: '/cars/'+newToCart[i].id,
				method: 'PUT',
				dataType: 'json',
				contentType: "application/json; charset=utf-8",
				success: function(result) {
					console.log("Successfull request");
			},
			error: function(result) {
				console.log("Something went wrong");
			}
		});

		return;
		}
	}
		newToCart.push(car);
	}

	var total = 0;
	$('#DisplayCart').click(function(){		
		$('#cartInfo').empty();
		appendInfoToCartModalTest(newToCart);
	})

	var modalHtmlTest;
	function appendInfoToCartModalTest(cars) {
		var total = 0;
		modalHtmlTest = '<div class="modal-dialog" id="carmodal">';
		modalHtmlTest += '<div class="modal-content">';
		modalHtmlTest += '<div class="modal-header">';
		modalHtmlTest += '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
		modalHtmlTest += '<div class="modal-header">';
		
		for(var n in cars){
			var data = $.parseJSON($.ajax({
        	url:  '/cars/'+cars[n].id,
        	method: 'GET',
        	dataType: "json", 
        	async: false
   		 }).responseText);

		total += (cars[n].price*data[0].count);
		modalHtmlTest += '<h3 class="modal-title">'+cars[n].brand+' '+cars[n].model+' Quantity '+data[0].count+'</h3>';
		modalHtmlTest += '</br>';
		modalHtmlTest += '<h4 align="center">'+cars[n].transmission+'</h4>';
		modalHtmlTest += '<h4 align="center">'+cars[n].year+'</h4>';
		modalHtmlTest += '<h4 align="center">Price: $'+(cars[n].price*data[0].count)+'</h4>';
		modalHtmlTest += '</br>';
		modalHtmlTest += '</br>';
		}	//end of for loop
		modalHtmlTest += '<div class="col-sm-6">';
		modalHtmlTest += '<h3 align="center">Total Price: '+total+'</h3>';
		modalHtmlTest += '</div>';
		modalHtmlTest += '<div class="modal-footer">';
		modalHtmlTest += '<button id="cartBuyButton" type="button" class="btn btn-success btn-block">Buy Chosen Cars</button>';
		modalHtmlTest += '</div>';
		modalHtmlTest += '</div></div></div></div>';
		$('#cartInfo').append(modalHtmlTest);
		$('#cartInfo').modal();


		for (var i = document.getElementsByTagName('button').length - 1; i >= 0; i--) {
			if(document.getElementsByTagName('button')[i].id == "cartBuyButton"){
				document.getElementsByTagName('button')[i].addEventListener("click",function(e){
					$('#cartInfo').empty();
					newToCart = [];
					$.ajax({
						url: '/payment',
						method: 'PUT',
						dataType: 'json',
						contentType: "application/json; charset=utf-8",
						success: function(result) {
							console.log("Successfull request");
						},
						error: function(result) {
							console.log("Something went wrong");
						}
					});
					swal('Payment Successful','Dont Drink And Drive','success');
				});
			}
		}
	}

	var modalHtml;
	var butTemp;
	//create Html for the modal to display car information
	function appendInfoToModal(car, imgSrc) {
		modalHtml = '<div class="modal-dialog" id="carmodal">';
		modalHtml += '<div class="modal-content">';
		modalHtml += '<div class="modal-header">';
		modalHtml += '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
		modalHtml += '<div class="modal-header">';
		modalHtml += '<h2 class="modal-title">'+car[0].brand+' '+car[0].model+'</h2>';
		modalHtml += '</div>';
		modalHtml += '<div class="modal-body">';
		modalHtml += '<img style="margin: auto" class="img-responsive" src='+imgSrc+' alt="car" width="500" height="350">';
		modalHtml += '</br>';
		modalHtml += '<div class="row">';
		modalHtml += '<div class="col-sm-6">';
		modalHtml += '<h3 align="center">Color: '+car[0].color+'</h3>';
		modalHtml += '<h3 align="center">Year: '+car[0].year+'</h3>';
		modalHtml += '</div>';
		modalHtml += '<div class="col-sm-6">';
		modalHtml += '<h3 align="center">'+car[0].transmission+'</h3>';
		modalHtml += '<h3 align="center">Price: $'+car[0].price+'</h3>';
		modalHtml += '</div></div></div>';
		modalHtml += '<div class="modal-footer">';
		modalHtml += '</div></div></div>';

		$('#carInfo').empty().append(modalHtml);

		for (var i = document.getElementsByTagName('button').length - 1; i >= 0; i--) {
			if(document.getElementsByTagName('button')[i].id == "AddNow"){
				document.getElementsByTagName('button')[i].addEventListener("click",function(e){
					$('#carInfo').empty();
					addItemToCart(car[0]);
					swal('This Car Is Added To Cart!','Buy Them Soon','success');
				});
			}
		}
		$('#carInfo').modal();
	}

});
