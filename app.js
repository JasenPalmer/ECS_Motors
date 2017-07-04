var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var pg = require('pg');
var passport = require('passport');
var googlepass = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var bcrypt = require('bcrypt');
var session = require('express-session');
var squel = require('squel');
var localStrategy = require('passport-local').Strategy;
var port = process.env.PORT || 8080;

var app = express();

var client = new pg.Client({
	user: 'ldbgswgxwuvsjp',
	password: '088cf36a1362fd7cf2b231a5d982510df58203b3a4d0b2495ca8d8fe361cccd6',
	database: 'd2ldvtjdepq0tj',
	port: 5432,
	host: 'ec2-54-204-32-145.compute-1.amazonaws.com',
	ssl: true
});
client.connect();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '/auth')
	res.setHeader('Access-Control-Allow-Methods', 'GET');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-AllowHeaders');
	next();
});

function isLoggedIn (req, res, next) {
	if(req.user) {
		return next();
	}
	res.redirect('/');
}

app.use(session({
	secret: 'THIS IS THE SECRET',
	resave: false,
	saveUninitialized: true
}));

// app.use(passport.initialize());
// app.use(passport.session());

app.use(googlepass.initialize());
app.use(googlepass.session());


googlepass.serializeUser(function(user, done) {
	done(null, user.id);
});

googlepass.deserializeUser(function(user, done) {
	isUser(token, function(user) {
		var fixed = {
				    id: user.token,
				    firstname: user.firstname,
				    lastname: user.lastname,
				    username: user.username,
				    email: user.email
				};
		done(null, fixed);
	});
})



// passport.serializeUser(function(user, done) {
// 	done(null, user.id);
// });

// passport.deserializeUser(function(token, done) {
// 	var tokenVal = parseInt(token);
// 	if(tokenVal > 1000) { // need this to distinguish between google oauth and local users
// 		isUser(token, function(user) {
// 			var fixed = {
// 					    id: user.token,
// 					    firstname: user.firstname,
// 					    lastname: user.lastname,
// 					    username: user.username,
// 					    email: user.email
// 					}
// 			done(null, fixed);
// 		});
// 	}
// 	else {
// 		findById(tokenVal, function(err, user) {
// 			if(err) {
// 				done(err);
// 			}
// 			if(user) {
// 				done(null, user);
// 			}
// 			done(user);
// 		});
// 	}
// });

// passport.use(new localStrategy({
// 		passReqToCallback: true
// 	},
// 	function(req,username, password, done) {
// 		findByUsername(username, function(err, user) {
// 			if(err) {
// 				console.log("Which");
// 				return done(err);
// 			}
// 			if(!user) {
// 				console.log("one");
// 				return done(null, false, {message: 'Incorrect username'});
// 			}

// 			if(!comparePass(user.password, password)) {
// 				console.log("is being");
// 				return done(null, false, {message: 'Incorrect password'});
// 			}
// 			console.log("called?");
// 			return done(null, user);
// 		});
// 	}
// ));

// function comparePass(pass, pass2) {
// 	return true;
// }


// function findByUsername(username, callback) {
// 	var q = squel.select().from("users").where("username = ?", username).toString();
// 	//var q = "SELECT * FROM users WHERE username = '"+username+"';";
// 	client.query(q, function(err, results) {
// 		if(err) {
// 			callback && callback(err, false);
// 		}
// 		console.log("Row from DB");
// 		console.log(results.rows);
// 		if(results.rows[0] == undefined) {
// 			callback && callback(null, false);
// 			return;
// 		}
// 		var user = {
// 			id: results.rows[0].id,
// 			firstname: results.rows[0].firstname,
// 			lastname: results.rows[0].lastname,
// 			username: results.rows[0].username,
// 			email: results.rows[0].email
// 		}
// 		console.log("Constructed user");
// 		console.log(user);
// 		callback && callback(null, user);
// 	});
// }

// function findById(id, callback) {
// 	var q = "SELECT * FROM users WHERE id = "+id+";";
// 	console.log("query: "+q);
// 	client.query(q, function(err, results) {
// 		if(err) {
// 			console.log("what");
// 			callback && callback(err, false);
// 		}
// 		if(results.rows == []) {
// 			console.log("IS");
// 			callback && callback(null, false);
// 			return false;
// 		}
// 		console.log("Happening");
// 		var user = {
// 			id: results.rows[0].id,
// 			firstname: results.rows[0].firstname,
// 			lastname: results.rows[0].lastname,
// 			username: results.rows[0].username,
// 			email: results.rows[0].email
// 		}
// 		callback && callback(null, user);
// 		return user;
// 	});
// }



googlepass.use(new GoogleStrategy( {
	clientID: '1089414033551-gvss8q3gd8v816aivucn4e0sntkqq2d8.apps.googleusercontent.com',
	clientSecret: 'oON3PNNIn2u1sObvA1wBY3Am',
	callbackURL: "https://ecsmotors.herokuapp.com/auth/google/callback",
	//callbackURL: "http://localhost:8080/auth/google/callback",
	passReqToCallback: true
	},
	function(request, accessToken, refreshToken, profile, done) {
	    process.nextTick(function () {
	    	isUser(profile.id, function(user) {
				if(user) {
					var fixed = {
			    				id: user.token,
			    				firstname: user.firstname,
			    				lastname: user.lastname,
			    				username: user.username,
			    				email: user.email
			    				}
		    		return done(null, fixed);
		    	}else {
					createNewUser(profile, id, function(newUser) {
		    			saveUser(newUser, function(saved) {
		    				if(saved) {
		    					console.log("HERE");
			    				var fixed = {
			    				id: newUser.token,
			    				firstname: newUser.firstname,
			    				lastname: newUser.lastname,
			    				username: newUser.username,
			    				email: newUser.email
			    				}
			    			console.log("New User: "+fixed);
			    			return done(null, fixed);
		    				}
		    				console.log("IT REALLY SHOULDNT BE HERE");
		    				return done(null);
		    			});
		    		});
		    	}
	    	});

	    });
	}
));

//create a new user  from the google information
function createNewUser(profile, accessToken, callback) {
	var user = {
		'firstname': profile.name.givenName,
		'lastname': profile.name.familyName,
		'username': profile.displayName,
		'email': profile.emails[0],
		'token': accessToken
	};
	callback && callback(user);
	return user;
}
r
// save a user into database
function saveUser(user, callback) {
	var q = squel.insert().into("users").setFieldsRows([{
			firstname: user.firstname,
			lastname: user.lastname,
			username: user.username,
			email: user.email,
			token: user.token
		}
	]).toString();
	client.query(q, function(err) {
		if(err) {
			callback && callback(false);
			return false;
		}else {
			callback && callback(true);
			return true;
		}
	});
}

function isUser(accessToken, callback) {
	var q = "SELECT * FROM users WHERE token = '"+accessToken+"';";
	var results = [];
	client.query(q, function(err, result) {
		if(result.rows == []) {
			callback && callback(false);
			return false;
		}
		var user = {
		'firstname': result.rows[0].firstname,
		'lastname': result.rows[0].lastname,
		'username': result.rows[0].username,
		'email': result.rows[0].email,
		'token': result.rows[0].token
		};
		callback && callback(user);
		return user;
	});
}

app.post('/users/register', function(req,res) {
	var passDigest = bcrypt.hashSync(req.body.password, 10);
	//var q = "INSERT INTO users (firstname, lastname, username, email, password) VALUES ('"+req.body.firstname+"', '"+req.body.lastname+"', '"+req.body.username+"', '"+req.body.email+"', '"+passDigest+"');";
	var q = squel.insert().into("users").setFieldsRows([{
			firstname: req.body.firstname, 
			lastname: req.body.lastname, 
			username: req.body.username, 
			email: req.body.email,
			password: passDigest
		}]).toString();

	client.query(q, function(error, results) {
		console.log(results.rows);
		if(error) {
			res.status(400).json({
				status: 'failed',
				message: 'failed to add new user'
			});
		}
		else {
			res.status(201).json({
				status: 'success',
				message: 'successfully added new user',
			});
		}
	});
});


app.post('/users/login', function(req, res) {
	var username = req.body.username;
	var password = req.body.password;

	findByUsername(username, function(err, user) {
		if(err) {
			console.log(err);
			return;
		}
		if(!user) {
			console.log(err);
			return;
		}
		res.send({redirect: '/',
		user: user});
	})
});


app.get('/auth/google',
	googlepass.authenticate('google',
		{scope:['openid email profile']})
);

app.get( '/auth/google/callback',
    	passport.authenticate( 'google', {
    		successRedirect: '/',
    		failureRedirect: '/login'
}));

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

/* GET home page. */
app.get('/', function(req, res, next) {
	console.log("REQ.USER");
	console.log(req.user);
  res.render('index', {
  	title: 'ECS Motors',
  	user: req.user
   });
});

app.get('/cart', function(req, res) {
	res.render('Cart', {
		title: 'ECS Motors'
	});
});


app.get('/cars', function(req, res) {
	res.render('Cars', {
		title: 'ECS Motors',
		user: req.user
	});
});

app.get('/contact', function(req, res) {
	res.render('Contact', {
		title: 'ECS Motors',
		user: req.user
	});
});

var r;
app.post('/search', function(req, res){
    var search_query = req.body.query.split(/(\s+)/).filter( function(e) { return e.trim().length > 0; } ).join(' | ');
  	var q = "SELECT * FROM cars WHERE cars.tsv @@ to_tsquery('"+search_query+"')"
  	var query = client.query(q, function(error,result) {
	r = result
  		if(error) {
            console.log(error)
  			res.status(400).json({
  				status: 'failed',
  				message: 'failed to search'
  			});
  		}
  		else {
        	query.on('end', function(){
                console.log(r);
                res.render('search', {
                    title: 'ECS Motors',
                    data: r
                });
        	});
  		}
  	});
});

app.get('/search',function(req,res){
    res.render('search', {
        title: 'ECS Motors',
        data: r,
	user: req.user
    });
});

app.get('/cars/:id', function(req, res) {
	var id = parseInt(req.params.id);
	console.log("Car id: "+id);
	var query = client.query("SELECT * FROM cars WHERE id = "+id+";");
	var results = [];
	query.on('row',function(row){
		results.push(row);
	});
	query.on('end', function(){
		res.send(results);
	});
});

app.put('/cars/:id', function(req, res) {
	var id = parseInt(req.params.id);
	console.log("Car id: "+id);
	var query = client.query("UPDATE cars SET count = (count+1) WHERE id = "+id+";");
});


app.get('/authorisedPage', isLoggedIn, function(req, res, next) {
	console.log("REQ.USER: ");
	console.log(req.user);
	res.render('authorisedPage', {
		title: 'ECS Motors',
		user: req.user
	});
});

app.listen(port,function() {
	console.log('TO-DO List app listening on port '+port+'!');
});

module.exports = app;
