var db = require('./mySQLdb');

var getUserId = function(username){
  return new Promise(function(resolve, reject){
    db.connection.query('SELECT id FROM users WHERE username = ?;',username, function(err, result){
      if(err){
        reject(err)
      } else if (result[0] === undefined){
        reject(undefined)
      } else {
        resolve(result[0].id);
      }
    })
  });
};

var setScore = function(userID, score){
  return new Promise(function(resolve, reject){
    var scoreObj = {score: score, user_id: userID}
    db.connection.query('INSERT INTO scores SET ?', scoreObj, function(err, res){
      if(err){
        reject(err)
      } else {
        resolve(res.insertId);
      }
    })
  });
};

var getAndCheckHighScores = function(currentScore, userId){
  return new Promise(function(resolve, reject){
    db.connection.query('SELECT * FROM highscores;', function(err, res){
      if(err){
        reject(err)
      } else {
        var highScores = res
        highScores.sort(function(a,b){return b.score - a.score})
        if(highScores.length < 10 || highScores[9].score < currentScore){
          var previousHighScore = 0;
          var previousId
          var newEntry = {id: 0, score: currentScore, user_id: userId};
          //if score by same user already exists, set it to previousHighScore
          highScores.forEach(function(x){
            if(x.user_id === userId){
              previousHighScore = x.score;
              previousId = x.id;
            }
          })
          //if previousScore exists and it is larger than the current score return false
          if(previousHighScore){
            if(previousHighScore >= currentScore){
              resolve(false)
            } else {
              newEntry.id = previousId
            }
          }
          //if highscores has not yet reached 10 proceed with new score in place
          if(highScores.length < 10){
            newEntry.id = (highScores.length + 1)
            resolve(newEntry)
          //else if bottom score < new score, remove bottom score and proceed with new score in the mix
          } else {
            var old = highScores.pop()
            newEntry.id = old.id
            newEntry.bool = true
            resolve(newEntry)
          } 
        } else {
          resolve(false)
        }
      }
    });
  });
};

var setNewHighScore = function(newEntry){
  return new Promise(function(resolve, reject){
    if(newEntry.bool){
      db.connection.query('UPDATE highscores SET user_id= ?, score= ? WHERE id= ?;', [newEntry.user_id, newEntry.score, newEntry.id], function(err, res){
        if(err){
          reject(err);
        } else {
          resolve(res);
        }
      }) 
    } else {
      db.connection.query('INSERT highscores SET ?', newEntry, function(err, result){
        if(err){
          console.log('error', err)
          reject(err);
        } else {
          resolve(result);
        }
      }) 
    }
  })
}

var getHighScoresNoId = function(){
  return new Promise(function(resolve, reject){
    db.connection.query('SELECT users.username, highScores.score FROM highScores INNER JOIN users ON users.id = highScores.user_id;', function(err, result){
      if(err){
        reject(err)
      } else {
        result.sort(function(a,b){return b.score - a.score})
        resolve(result);
      }
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

  