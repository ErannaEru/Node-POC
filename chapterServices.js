var mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');
var qs = require('querystring'); 

//---- 
var cors = require('cors');

// Cross Origin Issues
// after the code that uses bodyParser and other cool stuff
var originsWhitelist = [
  'http://localhost:4200'      //this is my front-end url for development
];

var corsOptions = {
  origin: function(origin, callback){
        var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
        callback(null, isWhitelisted);
  },
  credentials:true
}
//here is the magic
app.use(cors(corsOptions));



app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
}); 
 


//---

app.use(bodyparser.json());


var fs = require('fs');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "DXCroot123",
  database: "mydb"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connection successful");
});

app.listen(8044, () => console.log("Express Server is running"));

app.get('/home', (req, res) => {
	fs.readFile(index.html, function(err, data) {
		if (err) {
		res.writeHead(404, {'Content-Type': 'text/html'});
		return res.end("404 Not Found");
		}  
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write(data);
		return res.end();
	});
});

app.get('/chapters', (req, res)=> {
	con.query("SELECT * FROM mydb.dxc_chapter", (err, result, fields)=>{
		if(!err){
			res.send(result);
		}else{
			console.log(err + "here");
		}
	})
});

app.get('/chapter/:id', (req, res)=> {
	con.query("SELECT * FROM mydb.dxc_chapter where dc_id = ? ", [req.params.id], (err, result, fields)=>{
		if(!err){
			res.send(result);
		}else{
			console.log(err + "here");
		}
	})
});

app.get('/employee', (req, res)=> {
	con.query("SELECT * FROM mydb.employee", (err, result, fields)=>{
		if(!err)
			res.send(result);
		else
			console.log(err);
	})
});

app.get('/employee/:eid', (req, res)=> {
	con.query("SELECT * FROM mydb.employee where eid = ? ", [req.params.eid], (err, result, fields)=>{
		if(!err)
			res.send(result);
		else
			console.log(err);
	})
});

app.get('/chapterDetails/:id', (req,res) => {
	con.query("select * from mydb.dxc_chapter join mydb.employee on dc_id = emp_chapter_id where dc_id = ? ", [req.params.id], (err, result, fields) => {
		if(!err)
			res.send(result);
		else
			console.log(err);
	})
});

app.post('/employee/add', function(req, res) {
	var chapterID = req.body.chapterID;
	var empName = req.body.eName;
	var empDesignation = req.body.eDesignation;
	var empAge = req.body.eAge;
	var empSalary = req.body.eSalary;
	 
	let qry = `INSERT INTO mydb.employee(emp_chapter_id, emp_name, emp_age, emp_designation, emp_salary) 
	           VALUES (' ${chapterID}', '${empName}', '${empAge}', '${empDesignation}','${empSalary}' )`;
	  
	console.log(qry);
	con.query(qry, function(err, results, fields) {
	if (err) {
	   return console.error(err.message);
	}
	   // get inserted rows
	    console.log('Row inserted:' + results.affectedRows);
		res.status(200).send("record inserted successfully");
		//res.send(200, "record inserted successfully");
	});
});

app.post('/chapters/add', function (req, res) {
	var chapterName = req.body.chapterName;
	var manager = req.body.manager;
	 
	let qry = `INSERT INTO mydb.dxc_chapter(chapter_name, chapter_manager) VALUES ( ' ${chapterName} ',' ${manager} ' )`;
	  
	console.log(qry);
	con.query(qry, function(err, results, fields) {
	if (err) {
	   return console.error(err.message);
	}
	   // get inserted rows
	    console.log('Row inserted:' + results.affectedRows);
		res.status(200).send("record inserted successfully");
		//res.send(200, "record inserted successfully");
	});
});

app.post('/employee/update', function (req, res) {
	var eID = req.body.eID;
	var chapterID = req.body.chapterID;
	var eName = req.body.eName;
	var eDesignation = req.body.eDesignation;
	var eAge = req.body.eAge;
	var eSalary = req.body.eSalary;
	 
	let qry = `UPDATE mydb.employee set emp_chapter_id = ' ${chapterID} ', emp_name = '${eName}', emp_age = '${eAge}',
			   emp_designation = '${eDesignation}', emp_salary = '${eSalary}' where eid = '${eID} ' `;
	  
	console.log(qry);
	con.query(qry, function(err, results, fields) {
	if (err) {
	   return console.error(err.message);
	}
	   // get inserted rows
	    console.log('Row inserted:' + results.affectedRows);
		res.status(200).send("record inserted successfully");
		//res.send(200, "record inserted successfully");
	});
});

app.post('/chapter/update', function (req, res) {
	var cID = req.body.cID;
	var chapterName = req.body.chapterName;
	var chapterManager = req.body.chapterManager;
	 
	let qry = `UPDATE mydb.dxc_chapter set chapter_name = ' ${chapterName} ', chapter_manager = '${chapterManager}' where dc_id = '${cID} ' `;
	  
	console.log(qry);
	con.query(qry, function(err, results, fields) {
	if (err) {
	   return console.error(err.message);
	}
	   // get inserted rows
	    console.log('Row inserted:' + results.affectedRows);
		res.status(200).send("record inserted successfully");
		//res.send(200, "record inserted successfully");
	});
});

