$(document).ready(function(e) {

	var cart = [];

	$('.carClick').click(function() {
		var id = $(this).attr("id"); //get the car id number
		var imgSrc = $(this).attr("src");
		findById(id, imgSrc);
	});

	function findById(id, imgSrc, callback) {
		var car;
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
				if(imgSrc){
					appendInfoToModal(result, imgSrc);
				}
				car = result;
				console.log("car = ");
				console.log(car);
				callback && callback(car);
			},
			error: function(result) {
				console.log("Something went wrong");
			}
		});
		callback && callback(car);
	}

	//create Html for the modal to display car information
	function appendInfoToModal(car, imgSrc) {
		var modalHtml; 
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
		modalHtml += '<button carId='+car[0].id+' id="AddNow" class="btn btn-info btn-block" data-dismiss="modal">Add To Cart</button>';
		modalHtml += '</div></div></div>';

		$('#carInfo').empty().append(modalHtml);
		$('#carInfo').modal();
	}

	$(document).on('click', '#AddNow', function() {

		
		console.log("THIS BUTTON WAS CLICKED");
		var id = $(this).attr("carId")
		console.log("id: "+id);

		var car = findById(id, null, function(car) {
			console.log("Car: ");
			console.log(car);
			if(car == undefined){return;}
			car[0].count = 1;
			console.log("car: ");
			console.log(car);
			console.log("cart: ");
			console.log(cart);
			var inCart = false;
			for(i = 0; i < cart.length; i++) {
				if(cart[i][0].id == car[0].id) {
					inCart = true;
					cart[i][0].count += 1;
					break;
				}
			}
			if(!inCart) {
				cart.push(car);
			}
		});
		swal('Car added to cart','','success');
	})

	$('#displayCart').click(function() {
		$('#cartInfo').empty().append(createCartHtml(cart));
		$('#cartInfo').modal();
	})

	function createCartHtml() {
		var totalPrice = 0;
		var modalHtml;
		modalHtml = '<div class="modal-dialog" id="cartmodal">';
		modalHtml += '<div class="modal-content">';
		modalHtml += '<div class="modal-header">';
		modalHtml += '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
		modalHtml += '<div class="modal-header">';
		modalHtml += '<h2 class="modal-title">Cart</h2>';
		modalHtml += '</div>';
		modalHtml += '<div class="modal-body">';
		if(cart.length == 0) {
			modalHtml += '<div class="row"<div class="col-sm-6"> <p>Cart is Empty</p></div></div>';
		}
		for(i = 0; i < cart.length;  i++) {
			modalHtml += '<div class="row"> <div class="col-sm-3"> <p>Brand: '+cart[i][0].brand+'</p></div>';
			modalHtml += '<div class="col-sm-3"> <p>Model: '+cart[i][0].model+'</p></div>';
			modalHtml += '<div class="col-sm-3"> <p>Price: $'+cart[i][0].price+'</p></div>';
			modalHtml += '<div class="col-sm-3"> <p> x'+cart[i][0].count+'</p></div></div>';
			totalPrice += parseInt(cart[i][0].price) * parseInt(cart[i][0].count);
		}
		console.log(totalPrice);
		modalHtml += '</div>';
		modalHtml += '<div class="modal-footer">';
		modalHtml += '<p>Total: $'+totalPrice+'</p>';
		modalHtml += '<button id="buyNow" class="btn btn-warning btn-block" data-dismiss="modal">Buy Now</button>';
		modalHtml += '</div></div>';
		return modalHtml;
	}

	$(document).on('click', '#buyNow', function() {
		if(cart.length > 0) {
		cart = [];
		swal('All cars purchased!','Your cedit card has been charged','success');
		}
	});

});		