var mysql = require('mysql');
//setting up a connection to the database and exporting the connection
exports.connection = mysql.createConnection({
  //host is either localhost or host URI
  host: 'localhost',
  user: 'root',
  password: 'a',
  database: 'usersandscores',
  multipleStatements: true
});
