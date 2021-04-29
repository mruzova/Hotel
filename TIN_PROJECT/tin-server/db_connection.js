var mysql = require('mysql2');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: 'tin_project'
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});
// var query = con.query(('SELECT count(*) as total_rows from room'), function(err, res) {
//     console.log(res);
// });

module.exports = con;