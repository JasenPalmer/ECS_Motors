var express = require('express');
var router = express.Router();
var pg = require('pg');

var googlePass = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
//var passport = require('passport', LocalStrategy = require('passport-local').Strategy;

var client = new pg.Client({
	user: 'ldbgswgxwuvsjp',
	password: '088cf36a1362fd7cf2b231a5d982510df58203b3a4d0b2495ca8d8fe361cccd6',
	database: 'd2ldvtjdepq0tj',
	port: 5432,
	host: 'ec2-54-204-32-145.compute-1.amazonaws.com',
	ssl: true
});


client.connect();

// passport.use(new LocalStrategy (
// 	function(username, password, done) {
// 		User.findOne({username: username}, function(err, user) {
// 			if(err) {return done(err);}
// 			if(!user) {
// 				return done(null, false, {message: 'Incorrect Username.'});
// 			}
// 			if(!user.validPassword(password)) {
// 				return done(null, false, {message: 'Incorrect Password'});
// 			}
// 			return done(null, user);
// 		});
// 	}
// ));


googlePass.use(new GoogleStrategy( {
	clientID: '1089414033551-gvss8q3gd8v816aivucn4e0sntkqq2d8.apps.googleusercontent.com',
	clientSecret: 'oON3PNNIn2u1sObvA1wBY3Am',
	callbackURL: "https://ecsmotors.herokuapp.com/auth/callback"
	},
	function(accessToken, refreshToken, profile, done) {
		User.findOrCreate({googleId: profile.id}, function(err, user) {
			return done(err, user);
		});
	}
));

router.get('/auth/google', 
	googlePass.authenticate('google', 
		{scope:['openid']})
	);

router.get('/auth/callback', 
	googlePass.authenticate('google', {failureRedirect: '/'}),
	function(req, res) {
		res.redirect('/');
	});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
  	title: 'ECS Motors'
   });
});

router.get('/cars', function(req, res) {
	res.render('Cars', {
		title: 'ECS Motors'
	});
});

router.get('/contact', function(req, res) {
	res.render('Contact', {
		title: 'ECS Motors'
	});
});

router.get('/cars/:id', function(req, res) {
	var id = parseInt(req.params.id);
	console.log("Car id: "+id);
	var query = client.query("SELECT * FROM cars WHERE id = "+id+";");
	var results = [];
	//Stream results back one row at a time
	query.on('row',function(row){
		results.push(row);
	});

	//After all data is returned, close connection and return results
	query.on('end', function(){
		//client.end();
		res.send(results);
	});
});



router.post('/',function(req,res) {

});

module.exports = router;
