var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var pg = require('pg');
var googlePass = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var bcrypt = require('bcrypt');
var session = require('express-session');

var port = process.env.PORT || 3000;

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

app.use(googlePass.initialize());
app.use(googlePass.session());
//app.use(session);


googlePass.serializeUser(function(user, done) {
  done(null, user);
});

googlePass.deserializeUser(function(obj, done) {
  done(null, obj);
});


googlePass.use(new GoogleStrategy( {
	clientID: '1089414033551-gvss8q3gd8v816aivucn4e0sntkqq2d8.apps.googleusercontent.com',
	clientSecret: 'oON3PNNIn2u1sObvA1wBY3Am',
	callbackURL: "https://ecsmotors.herokuapp.com/auth/google/callback",
	//passReqToCallback: true
	},
	function(request, accessToken, refreshToken, profile, done) {
	    process.nextTick(function () {
	    	console.log(profile);
	    	return done(null, profile);
    	});
  	}
));


app.put('/users', function(req, res, next) {
	console.log("HERE");
	console.log(req.body);
	console.log(req.body.username);
	console.log(req.body.password);
	// var query = "SELECT * FROM users WHERE username='"+req.data.username+"' AND password='"+req.data.password+"';";
	// console.log(query);
	// res.send(query);
});

app.post('/users/register', function(req,res) {
	var passDigest = bcrypt.hashSync(req.body.password, 10);

	var q = "INSERT INTO users (firstname, lastname, username, email, password) VALUES ('"+req.body.firstname+"', '"+req.body.lastname+"', '"+req.body.username+"', '"+req.body.email+"', '"+req.body.password+"');";
	console.log(q);
	var query = client.query(q, function(error) {
		if(error) {
			res.status(400).json({
				status: 'failed',
				message: 'failed to add new user'
			});
		}
		else {
			var userToken = jwt.sign({"username": req.body.username}, TOKEN_SECRET);
			res.status(201).json({
				status: 'success',
				data: userToken,
				message: 'successfully added new user'
			});
		}
	});
});


app.get('/auth/google', 
	googlePass.authenticate('google', 
		{scope:['openid email profile']})
);

app.get( '/auth/google/callback', 
    	googlePass.authenticate( 'google', { 
    		successRedirect: '/',
    		failureRedirect: '/'
}));

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

/* GET home page. */
app.get('/', function(req, res, next) {
  res.render('index', { 
  	title: 'ECS Motors'
   });
});

app.get('/cars', function(req, res) {
	res.render('Cars', {
		title: 'ECS Motors'
	});
});

app.get('/contact', function(req, res) {
	res.render('Contact', {
		title: 'ECS Motors'
	});
});

app.get('/cars/:id', function(req, res) {
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




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port,function() {
	console.log('TO-DO List app listening on port '+port+'!');
});


module.exports = app;
