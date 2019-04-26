var mysql = require('mysql');


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


