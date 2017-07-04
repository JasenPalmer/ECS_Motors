$(document).ready(function(e) {



	$('.carClick').click(function() {
		var id = $(this).attr("id"); //get the car id number
		var imgSrc = $(this).attr("src");
		console.log("Image: "+imgSrc);
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
	var Item = function(id,name,price,count){
		this.id = id;
		this.name = name;
		this.price = price;
		this.count = count;
	}

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
		//var item = new Item(id,name,price,count);
		newToCart.push(car);
	}

	function displayCart(){
		for(var i in newToCart){
			console.log(newToCart[i]);
		}
	}

	
	$('#DisplayCart').click(function(){
		//displayCart();
		$('#cartButton').modal();
		$('#cartInfo').empty();

	  for(var i in newToCart){
	   	$.ajax({
			url: '/cars/'+newToCart[i].id,
			method: 'GET',
			dataType: 'json',
			contentType: "application/json; charset=utf-8",
			success: function(result) {
				console.log("Successfull request");
				if(result.length == 0){
					console.error("The car was not found");
					return;
				}
				//console.log(newToCart[i].count);
				appendInfoToCartModal(result);
			},
			error: function(result) {
				console.log("Something went wrong");
			}
		});

	  }
	  
	})

	function appendInfoToCartModal(car) {
		//console.log(car[0].count);
		var modalHtml = '<div class="modal-dialog" id="carmodal">';
		modalHtml += '<div class="modal-content">';
		modalHtml += '<div class="modal-header">';
		modalHtml += '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
		modalHtml += '<div class="modal-header">';
		modalHtml += '<h2 class="modal-title">'+car[0].brand+' '+car[0].model+' Quantity '+car[0].count+'</h2>';
		modalHtml += '</div>';
		modalHtml += '<div class="modal-body">';
		//modalHtml += '<img style="margin: auto" class="img-responsive" src='+imgSrc+' alt="car" width="500" height="350">';
		modalHtml += '</br>';
		modalHtml += '<div class="row">';
		modalHtml += '<div class="col-sm-6">';
		modalHtml += '<h3 align="center">Color: '+car[0].color+'</h3>';
		modalHtml += '<h3 align="center">Year: '+car[0].year+'</h3>';
		modalHtml += '</div>';
		modalHtml += '<div class="col-sm-6">';
		modalHtml += '<h3 align="center">'+car[0].transmission+'</h3>';
		modalHtml += '<h3 align="center">Price: $'+(car[0].price*car[0].count)+'</h3>';
		modalHtml += '</div></div></div>';
		modalHtml += '<div class="modal-footer">';
		//modalHtml += '<button id="buyNow" class="btn btn-info btn-block">Buy Now</button>';
		modalHtml += '</div></div></div>';

		$('#cartInfo').append(modalHtml);
		$('#cartInfo').modal();
	}






	var modalHtml; 
	var butTemp;
	//create Html for the modal to display car information
	function appendInfoToModal(car, imgSrc) {
		console.log("Image: "+imgSrc);
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
		modalHtml += '<button id="AddNow" class="btn btn-info btn-block">Add To Cart</button>';
		modalHtml += '</div></div></div>';

		$('#carInfo').empty().append(modalHtml);
		
		for (var i = document.getElementsByTagName('button').length - 1; i >= 0; i--) {
			if(document.getElementsByTagName('button')[i].id == "AddNow"){
				document.getElementsByTagName('button')[i].addEventListener("click",function(e){
					$('#carInfo').empty();
					//console.log(car[0].count);
					//addItemToCart(car[0].id,car[0].brand,car[0].price,car[0].count);
					addItemToCart(car[0]);
					swal('This Car Is Added To Cart!','Buy Them Soon','success');
				});
			}
		}
		$('#carInfo').modal();
	}

});




				
					
		        		
					
					
					
					
					