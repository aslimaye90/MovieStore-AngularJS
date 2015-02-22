var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('pages/index',
  	{ 
  		title: 'Home Page',
  		name: 'random',
  		page: 'Home Page'
  	});
});

module.exports = router;
