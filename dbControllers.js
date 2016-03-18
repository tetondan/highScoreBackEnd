const db = require('./mySQLdb');

const getUserId = (username) => {
  return new Promise((resolve, reject) => {
    db.connection.query('SELECT id FROM users WHERE username = ?;',username, (err, result) => {
      if(err){
        reject(err)
      } else if (result[0] === undefined){
        reject('user not found')
      } else {
        resolve(result[0].id);
      }
    })
  });
};

const setScore = (userID, score) => {
  return new Promise((resolve, reject) => {
    const scoreObj = {score: score, user_id: userID}
    db.connection.query('INSERT INTO scores SET ?;', scoreObj, (err, res) => {
      if(err){reject(err)}
      resolve(res.insertId);
    })
  });
};

const getAndCheckHighScores = (currentScore, userId) => {
  return new Promise((resolve, reject) => {
    db.connection.query('SELECT * FROM highscores;', (err, res) => {
      if(err) {reject(err);}
      var highScores = res;
      highScores.sort((a,b) => {return b.score - a.score});
      if(highScores.length < 10 || highScores[9].score <= currentScore) {
        var previousHighScore, previousId;
        var newEntry = {id: 0, score: currentScore, user_id: userId};
        //if score by same user already exists, set it to previousHighScore
        highScores.forEach((x) => {
          if(x.user_id === userId){
            previousHighScore = x.score;
            previousId = x.id;
          }
        })
        //if previousScore exists and it is larger than the current score return false
        if(previousHighScore){
          if(previousHighScore >= currentScore){
            resolve(false);
          } else {
          //otherwise set current id to previous id this will make sure the same person can not enter more than one score
            newEntry.id = previousId;
            newEntry.bool = true;
          }
        //if highscores has not yet reached 10 proceed with new score in place
        } else if(highScores.length < 10){
          newEntry.id = (highScores.length + 1);

        //else if bottom score < new score, remove bottom score and proceed with new score in the mix
        } else {
          var old = highScores.pop();
          newEntry.id = old.id;
          newEntry.bool = true;
        } 
        resolve(newEntry);
      } else {
        resolve(false);
      }
    });
  });
};

const setNewHighScore = (newEntry) => {
  return new Promise((resolve, reject) => {
    if(newEntry.bool){
      db.connection.query('UPDATE highscores SET user_id= ?, score= ? WHERE id= ?;', [newEntry.user_id, newEntry.score, newEntry.id], (err, res) => {
        if (err) reject(err);
        resolve(res);
      }) 
    } else {
      db.connection.query('INSERT highscores SET ?;', newEntry, (err, result) => {
        if(err) {reject(err)};
        resolve(result);
      }) 
    }
  })
}

const getHighScoresNoId = () => {
  return new Promise((resolve, reject) => {
    db.connection.query('SELECT users.username, highScores.score FROM highScores INNER JOIN users ON users.id = highScores.user_id;', (err, result) => {
      if(err){reject(err)}
      result.sort((a,b) => {return b.score - a.score});
      resolve(result);
    })
  });
}

module.exports = {
  getUserId: getUserId,
  setScore: setScore,
  getHighScoresNoId: getHighScoresNoId,
  getAndCheckHighScores: getAndCheckHighScores,
  setNewHighScore: setNewHighScore
}

  