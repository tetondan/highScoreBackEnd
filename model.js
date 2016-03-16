var db = require('./mySQLdb');

var getUserId = function(username){
  return new Promise(function(resolve, reject){
    db.connection.query('SELECT id FROM users WHERE username = ?;',username, function(err, result){
      if(err){
        console.log('in model:',err)
        reject(err)
      } else if (result[0] === undefined){
        console.log('in model nothing found')
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
        console.log('in model:',err)
        reject(err)
      } else {
        console.log(res.insertId)
        resolve(res.insertId);
      }
    })
  });
};

var getHighScores = function(){

}
module.exports = {
  getUserId: getUserId,
  setScore: setScore
}

  