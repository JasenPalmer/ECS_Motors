var express = require('express');
var router = express.Router();
var pg = require('pg');

var cookieParser = require('cookie-parser');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);

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

router.use(googlePass.initialize());
router.use(googlePass.session());

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

// googlePass.serializeUser(function(user, done) {
//   done(null, user);
// });

// googlePass.deserializeUser(function(obj, done) {
//   done(null, obj);
// });


// googlePass.use(new GoogleStrategy( {
// 	clientID: '1089414033551-gvss8q3gd8v816aivucn4e0sntkqq2d8.apps.googleusercontent.com',
// 	clientSecret: 'oON3PNNIn2u1sObvA1wBY3Am',
// 	callbackURL: "https://ecsmotors.herokuapp.com/auth/google/callback",
// 	passReqToCallback: true
// 	},
// 	function(request, accessToken, refreshToken, profile, done) {
//     process.nextTick(function () {
//     	//return done(null, profile);
//     	var user = isUser(profile, accesToken);
//     	if(user) {
//     		return done(null, user);
//     	}else {
//     		console.log("didnt find a user, creating one");
//     		var newUser = newUser(profile, accessToken);
//     		if(!newUser) {
//     			return done(null);
//     		}
//     		return done(null, newUser);
//     	}
//     });
//   }
// ));

// function newUser(profile, accessToken) {
// 	//var firstname = "thisisaname";
// 	console.log(profile);
// 	console.log(profile.displayname);
// 	var q = "INSERT INTO user (firstname, token) VALUES ('thisisaname', '"+accessToken+"');";
// 	//var q = "INSERT INTO todo (item, completed) VALUES ('"+req.body.item+"', "+req.body.completed+");";
// 	console.log(q);
// 	var query = client.query(q, function(err) {
// 		if(err) {
// 			return false;
// 		}
// 		return true;
// 	});

// 	//saveUser(newUser);
// }

// function saveUser(newUser) {
	
// }

// function isUser(profile, accessToken) {
// 	var query = client.query("SELECT * FROM users WHERE token = "+accessToken+";");
// 	var results = [];
// 	query.on('row',function(row){
// 		results.push(row);
// 	});
// 	if(results.length = 0) {
// 		return false;
// 	}
// 	else {
// 		console.log("Found a user");
// 		return results[0];
// 	}
// }

// router.get('/auth/google', 
// 	googlePass.authenticate('google', 
// 		{scope:['openid email profile'], failwithError: true})
// );

// router.get( '/auth/google/callback', 
//     	googlePass.authenticate( 'google', { 
//     		successRedirect: '/',
//     		failureRedirect: '/'
// }));

router.get('/logout', function(req, res){
  req.logout();
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