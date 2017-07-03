var express = require('express');
var router = express.Router();
var pg = require('pg');

var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');


var TOKEN_SECRET = "THIS IS A SECRET";

var client = new pg.Client({
	user: 'ldbgswgxwuvsjp',
	password: '088cf36a1362fd7cf2b231a5d982510df58203b3a4d0b2495ca8d8fe361cccd6',
	database: 'd2ldvtjdepq0tj',
	port: 5432,
	host: 'ec2-54-204-32-145.compute-1.amazonaws.com',
	ssl: true
});

client.connect();

/* GET users listing. */
router.put('/', function(req, res, next) {
	console.log("HERE");
	console.log(req.body);
	console.log(req.body.username);
	console.log(req.body.password);
	// var query = "SELECT * FROM users WHERE username='"+req.data.username+"' AND password='"+req.data.password+"';";
	// console.log(query);
	// res.send(query);
});

router.post('/register', function(req,res) {
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

module.exports = router;
