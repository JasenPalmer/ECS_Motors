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

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
  	title: 'ECS Motors'
   });
});

router.post('/',function(req,res) {

});

module.exports = router;
