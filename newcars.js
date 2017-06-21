$(document).ready(function(e) {

	$('#carClick').click(function() {
		//get the car id number
		$.ajax({
			url: '/newcars/'+id,
			method: 'GET',
			dataType: 'json',
			data: JSON.stringify({
				'id': id
			}
			contentType: "application/json; charset=utf-8",
			success: function(result) {
				console.log("Found the car");
				appendInfoToModal(result);
			},
			error: function(result) {
				console.log("No car with that id found");
			}
		});
		//construct modal
		$('#carInfo').modal();
	});

	appendInfoToModal(car) {
		var modalHtml = '<div class="modal-dialog">';
		modalHtml += '<div class="modal-content">';
		modalHtml += '<div class="modal-header">';
		modalHtml += '<div class="modal-header">';
		modalHtml += '<h4 class="modal-title">'+car.brand+' '+car.model+'</h4>';
		modalHtml += '</div>';
		modalHtml += '<div class="modal-body">';
		modalHtml += '<p> Here goes all the car info/image/etc</p>';
		modalHtml += '</div>';
		modalHtml += '<div class="modal-footer">';
		modalHtml += '</div></div></div>';

		$('#carInfo').append()
	}
});


				
					
		        		
					
					
					
					
					