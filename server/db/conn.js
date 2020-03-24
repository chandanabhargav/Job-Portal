var mysql = require('mysql')

var conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "teachzone"
});

conn.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = conn