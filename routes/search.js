var express = require('express');
var router = express.Router();
var pg = require('pg');

var client = new pg.Client({
	user: 'ldbgswgxwuvsjp',
	password: '088cf36a1362fd7cf2b231a5d982510df58203b3a4d0b2495ca8d8fe361cccd6',
	database: 'd2ldvtjdepq0tj',
	port: 5432,
	host: 'ec2-54-204-32-145.compute-1.amazonaws.com',
	ssl: true
});

client.connect();

/* GET query results*/
router.post('/', function(req,res) {
  // "a search query" -> "a | search | query"
  var search_query = req.data.query.split(/(\s+)/).filter( function(e) { return e.trim().length > 0; } ).join(' | ');
	var q = "SELECT * FROM cars WHERE search @@ to_tsquery("+search_query+");"
	console.log(q);
	var results = client.query(q, function(error) {
		if(error) {
			res.status(400).json({
				status: 'failed',
				message: 'failed to add new user'
			});
		}
		else {
			res.status(201).json({
				status: 'success',
				message: 'successfully added new user'
			});
		}
	});

});


module.exports = router;
