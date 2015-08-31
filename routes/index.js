var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/test';

var client = new pg.Client(connectionString);
client.connect();

/* GET home page. */
//  router.get('/api/v1/test', function(req, res) {
// //  res.render('index', { title: 'Express' });
//   var results = [];
//    pg.connect(connectionString, function(err, client, done) {
//    		console.log("in the pg connect");



//    		var qry = client.query("SELECT * FROM test_table");
		
// 		  // Stream results back one row at a time
//         qry.on('row', function(row) {
//             results.push(row);
//         });

//         // After all data is returned, close connection and return results
//         qry.on('end', function() {
//             client.end();
//             return res.json(results);
//         });

//         // Handle Errors
//         if(err) {
//           console.log(err);
//         }
			

//    	});

//  });
console.log("at least on the page");

/* POST home page */
router.use('/api/v1/test', function(req,res){
	var results = [];
	console.log("in router.post");
	
	pg.connect(connectionString, function(err, client, done){
		console.log("in here");
		client.query("INSERT INTO test_table(data) VALUES('{\"name\": \"Caroline\"}')");
		
		// SQL Query > Select Data
      var query = client.query("SELECT * FROM test_table");

       // Stream results back one row at a time
       query.on('row', function(row) {
           results.push(row);
       });

       // After all data is returned, close connection and return results
       query.on('end', function() {
           client.end();
           return res.json(results);
        });
		
		if(err) {
          console.log(err);
        }
	});
});






module.exports = router;