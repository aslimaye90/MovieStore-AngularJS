var express = require('express');
var router = express.Router();
var pool = require('./MySQLConnectionPool')

/* GET home page. */
router.get('/', function(req, res) {

	//var x = req.params.letter;
  var queryString = 'select MovieName, category from MovieList LIMIT 100';
  var countQuery = 'select count(*) AS count from MovieList';

  console.log(req.params.pageNumber);

  /*if(!(typeof req.body.pageNumber === 'undefined')){
    var x = 100*req.body.pageNumber;
    queryString = 'select MovieName, category from MovieList LIMIT '+x+', 100';
    console.log("changed");
  }*/

	pool.getConnection(function(err,connection){
		if (err){throw err;}

    connection.query(countQuery, function(err, totRows){
      if(err){throw err;}

      connection.query(queryString, function(err, rows, fields) {
        if (err){throw err;}      

        res.render('pages/moviesNew',
        { 
            title: 'Movie Page', 
            data: JSON.parse(JSON.stringify(rows)),
            rowCount: totRows[0].count
        });
      });
    });
    connection.release();
    });
});



router.get('/:searchReq', function(req, res) {

  var x = req.params.searchReq;
  var queryString = 'select MovieName, category from MovieList where MovieName LIKE "'+x+'%" LIMIT 100';
  var countQuery = 'select count(*) AS count from MovieList where MovieName LIKE "'+x+'%"';

  pool.getConnection(function(err,connection){
    if (err){throw err;}

    connection.query(countQuery, function(err, totRows){
      if(err){throw err;}

      connection.query(queryString, function(err, rows, fields) {
      if (err){throw err;}      
          res.render('pages/movies',
          { 
              title: 'Movie Page', 
              data : JSON.parse(JSON.stringify(rows)),
              rows: totRows[0].count
          });
        });
    });
    connection.release();
    });
});

module.exports = router;
