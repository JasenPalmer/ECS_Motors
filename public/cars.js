$(document).ready(function(e) {

	$('.carClick').click(function() {
		//get the car id number
		$.ajax({
			url: '/newcars/1',
			method: 'GET',
			dataType: 'json',
			data: JSON.stringify({
				'id': 1
			}),
			contentType: "application/json; charset=utf-8",
			success: function(result) {
				console.log("Found the car");
				appendInfoToModal(result);
			},
			error: function(result) {
				console.log("Something went wrong");
			}
		});
	});

	function appendInfoToModal(car) {
		var modalHtml = '<div class="modal-dialog" id="carmodal">';
		modalHtml += '<div class="modal-content">';
		modalHtml += '<div class="modal-header">';
		modalHtml += '<div class="modal-header">';
		modalHtml += '<h4 class="modal-title">'+car[0].brand+' '+car[0].model+'</h4>';
		modalHtml += '</div>';
		modalHtml += '<div class="modal-body">';
		modalHtml += '<p> Here goes all the car info/image/etc</p>';
		modalHtml += '</div>';
		modalHtml += '<div class="modal-footer">';
		modalHtml += '</div></div></div>';

		$('#carInfo').empty().append(modalHtml);
		$('#carInfo').modal();
	}
});




				
					
		        		
					
					
					
					
					