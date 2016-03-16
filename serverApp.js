var express = require('express');
var http = require('http');
var db = require('./mySQLdb')
var app = express();

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('listening at http://%s:%s', host, port);
});

app.put('/api/:username', function (req, res) {
  //collect username and score
  var params = req.params.username
  var user = ['Don', 'don@gmail.com']
  db.connection.query('SELECT * FROM users;', function(err, result) {
    if (err) {return res.send(err)};
    res.send(result);
  })
  db.connection.end()
});

app.get('/api/highScores', function (req, res) {
  //get all high scores and return as JSON object

})
