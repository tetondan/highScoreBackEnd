var express = require('express');
var models = require ('./model.js');
var app = express();
var port = process.env.PORT || 3000;

var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('listening at http://%s:%s', host, port);
});

app.post('/api/', function (req, res) {
  //collect username and score
  //scores must be in query string format ?username=username&score=score
  var username = req.query.username;
  var score = Number(req.query.score);
  //set variables for use later
  var userId
  models.getUserId(username)
    .then(function(id){
      userId = id;
      return models.setScore(id, score);
    })
    .then(function(){
      return models.getAndCheckHighScores(score, userId);
    })
    .then(function(newEntry){
      if(newEntry === false){
        res.status(201).json('Sorry, not a new high score')
      } else {
        return models.setNewHighScore(newEntry)
      }
    })
    .then(function(result){
      res.status(201).json('New High Score!')
    })
    .catch(function(err){
      console.log(err);
      res.status(404).send(err)
    })
});

app.get('/api/highScores', function (req, res) {
  models.getHighScoresNoId()
    .then(function(scores){
      res.status(200).send(scores)
    })
})

