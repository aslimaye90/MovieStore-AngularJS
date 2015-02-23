var express = require('express');
var router = express.Router();
var pool = require('./MySQLConnectionPool')

/* GET movies home page. */
router.get('/', function(req, res) {

  var queryString = 'select MovieName, category from MovieList LIMIT 100';
  var countQuery = 'select count(*) AS count from MovieList';

	pool.getConnection(function(err,connection){
		if (err){throw err;}

    connection.query(countQuery, function(err, totRows){
      if(err){throw err;}

      connection.query(queryString, function(err, rows, fields) {
        if (err){throw err;}      

        res.render('pages/movies',
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


/* GET movies based on keywords*/
router.get('/:searchReq', function(req, res) {

  var x = req.params.searchReq;
  var queryString = 'select MovieName, category from MovieList where MovieName LIKE "%'+x+'%" LIMIT 100';
  var countQuery = 'select count(*) AS count from MovieList where MovieName LIKE "%'+x+'%"';

  pool.getConnection(function(err,connection){
    if (err){throw err;}

    connection.query(countQuery, function(err, totRows){
      if(err){throw err;}

      connection.query(queryString, function(err, rows, fields) {
        if (err){throw err;}     
        res.json({data: rows, totRows: totRows[0].count});
      });
    });
    connection.release();
  });
});


/*GET different pages for the same search request*/
router.get('/:searchReq/:pgNo', function(req, res) {

  var x = req.params.searchReq;
  var pgNo = req.params.pgNo;
  var queryString = 'select MovieName, category from MovieList where MovieName LIKE "%'+x+'%" LIMIT '+pgNo+', 100';
  var countQuery = 'select count(*) AS count from MovieList where MovieName LIKE "%'+x+'%"';

  if(req.params.searchReq == "secret987asdhfqpw8oapi"){
    queryString = 'select MovieName, category from MovieList LIMIT '+pgNo+', 100';
    countQuery = 'select count(*) AS count from MovieList';
  }

  pool.getConnection(function(err,connection){
    if (err){throw err;}

    connection.query(countQuery, function(err, totRows){
      if(err){throw err;}

      connection.query(queryString, function(err, rows, fields) {
        if (err){throw err;}     
        res.json({data: rows, totRows: totRows[0].count});
      });
    });
    connection.release();
  });
});

module.exports = router;
