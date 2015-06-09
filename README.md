# MovieStore-AngularJS

/**************MySQL database setup***************/

CREATE TABLE MovieStore;

CREATE TABLE MovieList
(
id int,
MovieName varchar(255),
MovieBanner varchar(255),
ReleaseDate int,
RentAmount varchar(10),
AvailableCopies int,
category varchar(255)
);

//now import the file "movies.csv" into MySQL
LOAD DATA LOCAL INFILE '/path/to/csvfile/movies.csv' INTO TABLE Movies FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n';

/****************before starting NodeJS server*****************/
//make changes to the file "routes/MySQLConnectionPool.js"

var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'xx',               //change here
  password        : 'xx',               //change here
  database        : 'MovieStore'
});


/************start NodeJS server**************/
//from the terminal, cd into the MovieStore folder and execute:
"DEBUG=app ./bin/www"
  OR
"npm start"

//point your browser to "localhost:8080" to see the running app!
