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

	//create Html for the modal to display car information
	function appendInfoToModal(car, imgSrc) {
		console.log("Image: "+imgSrc);
		var modalHtml = '<div class="modal-dialog" id="carmodal">';
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
		modalHtml += '<button class="btn btn-info btn-block">Buy Now</button>';
		modalHtml += '</div></div></div>';

		$('#carInfo').empty().append(modalHtml);
		$('#carInfo').modal();
	}
});




				
					
		        		
					
					
					
					
					