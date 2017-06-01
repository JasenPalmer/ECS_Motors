<?php
$bool = null;
if (isset($_POST['name']) && isset($_POST['email']) && isset($_POST['message'])){
	$name = $_POST['name'];
	$email = $_POST['email'];
    $message = $_POST['message'];
	$to = 'kapeteni7@gmail.com';
	$subject = "Feedback";
	$body = '<html>
				<body>
					<h2>Booking</h2>
					<hr>
					<p>Name:' .$name. '</p><br><br>
					<p>Email:'.$email.'</p><br><br>
                    <p>Message:'.$message.'</p>
				</body>
			<html>';
	
	$headers = "From: ".$name." <".$email.">\r\n";
	$headers = "Reply:" .$email."\r\n";
	$headers = "MIME-Version: 1.0\r\n";
	$headers = "Content-type: text/html; charset-utf-8";
	//send
	$send = mail($to, $subject, $body, $headers);
	$bool = $send;
}
?>

<!doctype html>
<html>
<head>
	<meta charset="utf-8">
	<title>EC CARS</title>

	<!-- Mobile Specific Settings -->
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

	<!-- Google Fonts: Lato -->
	<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Lato:400,400italic,700,700italic">

	<!-- Icon Fonts: Entypo -->
	<link rel="stylesheet" href="css/icons.css">

	<!-- CSS Styles -->
	<link rel="stylesheet" href="css/normalize.css">
	<link rel="stylesheet" href="css/skin-green.css">
	<noscript><link rel="stylesheet" href="css/no-js.css"></noscript>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/sweetalert/1.1.3/sweetalert.css">
</head>

<body>
<?php
if (isset($result)){ echo "<div class=alert success hidden>" . $result . "</div>";}
?>
<header id="header">
			<h1><a href="index.html">ECS CARS</a></h1>
			<h2> Once You Drive One, You'll Never Stop</h2>	<!--<span class="amp">&amp;</span>-->
</header>

<div id="container">
			
			<nav id="mainnav" role="navigation">
				<ul>
                    <li><a href="index.html"><i class="icon-home"></i> Home</a></li>
                    <li><a href="EC_About.html"><i class="icon-users"></i> About us</a></li>
                    <li><a href="EC_Service.html"><i class="icon-suitcase"></i> Employment</a></li>
                    <li><a href="EC_Photo.html"><i class="icon-picture"></i> Photos</a></li>
                    <li><a href="EC_NewCars.html"><i class="icon-feather"></i> New Cars</a></li>
                    <li class="active"><a href="EC_ContactForm.php"><i class="icon-mail"></i> Contact</a></li>
				</ul>
			</nav>
			
			<div class="main-content">
				
				<div class="address">
					<div class="row">
						<div class="span6">
							<p><strong>Parris Quinn</strong></p>
						</div>
						<div class="span6">
							<p><i class="icon-phone"></i> <strong>Phone:</strong> (+64) 27 9144 207</p>
						</div>
					</div>
					<div class="row">
						<div class="span6">
							<p><strong>Porirua, Wellington</strong></p>
						</div>
						<div class="span6">
							<p><i class="icon-mail"></i> <strong>E-mail:</strong> heartparcels@gmail.com</p>
						</div>
					</div>
				</div>
				
				<!-- <p class="centered"><a class="button small popup-gmaps" href="http://maps.google.com/maps?q=San+Francisco,+CA,+United+States&amp;hl=en&amp;ll=37.773089,-122.405033&amp;spn=0.057939,0.132093&amp;sll=51.523704,-0.158553&amp;sspn=0.011402,0.033023&amp;oq=san+fransisco&amp;t=m&amp;hnear=San+Francisco,+California&amp;z=14">View my location</a></p> -->
				
				<div class="content-switch">
					<div class="controls">
						<h2><span>Contact form</span></h2>
					</div>
					<div class="panes">

						<div id="postcard-container">
							<div>
								<div id="postcard">
									<form action="" method="post" novalidate data-validate="parsley">
										<h2>Message:</h2>
										<fieldset>
											<p>To: Parris Quinn</p>
											<p><label>From: <input type="text" name="name" required placeholder="Your name"></label></p>
											<p><label>Return e-mail: <input type="email" name="email" required placeholder="Your e-mail address"></label></p>
											<textarea name="message" required placeholder="Enter Your Message"></textarea>
										</fieldset>
										<button type="submit">Send</button>
										<div class="stamp">
											<div class="v1"></div>
											<div class="v2"></div>
											<div class="v3"></div>
										</div>
										<div class="stamp-mark"></div>
									</form>
								</div>
							</div>
						</div>
						
					</div>
				</div> <!-- /content-switch -->
					
			</div> <!-- /main-content -->

			<div class="content-footer">
				<div class="social-media-block">
                    <h2 class="section-heading visible">CONNECT WITH US<span class="helper"></span></h2>
                    <ul class="social-media">
                       <li><a class="tooltip visible" href="https://www.facebook.com/heartparcels/?ref=br_rs"><i class="icon-facebook"></i></a></li>               
                    </ul>
				</div>
			</div>
		</div> <!-- /container -->

<footer id="footer">
</footer> <!-- /footer -->

<!-- JavaScript -->
<script src="js/jquery.min.js"></script>
<script src="js/parsley.min.js"></script>
<script src="js/jquery.backstretch.min.js"></script>
<script src="js/jquery.cycle2.min.js"></script>
<script src="js/jquery.cycle2.swipe.min.js"></script>
<script src="js/jquery.tooltipster.min.js"></script>
<script src="js/jquery.mixitup.min.js"></script>
<script src="js/jquery.placeholder.min.js"></script>
<script src="js/twitter-fetcher.min.js"></script>
<script src="js/jquery.magnific-popup.min.js"></script>
<script src="js/scripts.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/sweetalert/1.1.3/sweetalert.min.js"></script>

<?php
if($bool != null){
if($bool){
      echo "<script>". "swal('Good job!','Email sent sucessfully','success')" . "</script>";
    }
else{
	  echo "<script>". "swal('Unfortunately!','There was a problem on sending email','error')" ."</script>";
}
}
?>

</body>
</html>
