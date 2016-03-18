const express = require('express');
const db = require ('./dbControllers.js');
const app = express();
const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log('listening at http://%s:%s', host, port);
});

app.post('/api/',(req, res) => {
  //collect username and score
  //scores must be in query string format ?username=username&score=score
  const username = req.query.username;
  const score = Number(req.query.score);
  //set variables for use later
  var userId
  db.getUserId(username)
    .then((id) => {
      userId = id;
      return db.setScore(id, score);
    })
    .then(() => {
      return db.getAndCheckHighScores(score, userId);
    })
    .then((newEntry) => {
      if(newEntry === false){
        res.status(201).json('Sorry, not a new high score');
      } else {
        return db.setNewHighScore(newEntry);
      }
    })
    .then((result) => {
      res.status(201).json('New High Score!');
    })
    .catch((err) => {
      res.status(404).send(err);
    })
});

app.get('/api/highScores',(req, res) => {
  db.getHighScoresNoId()
    .then((scores) => {
      res.status(200).json(scores)
    })
})

