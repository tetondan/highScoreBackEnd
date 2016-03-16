var express = require('express');
var db = require('./mySQLdb');
var models = require ('./model.js');
var app = express();
var port = process.env.PORT || 3000;

var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('listening at http://%s:%s', host, port);
});

app.put('/api/', function (req, res) {
  //collect username and score
  //scores must be in query string format ?username=username&score=score
  var username = req.query.username;
  var score = Number(req.query.score);
  models.getUserId(username)
    .then(function(id){
      return models.setScore(id, score)
    })
    .then(function(id){
      res.json(id)
    })
    .catch(function(err){
      console.log(err);
      res.send(404)
    })
});

app.get('/api/highScores', function (req, res) {
  //get all high scores and return as JSON object

})

