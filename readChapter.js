var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "DXCroot123",
  database: "mydb"
});

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM mydb.dxc_chapter", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});