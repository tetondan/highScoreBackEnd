# highScoreBackEnd
Develop a back end returning the top 10 high scores.

##Requires
Node
MySQL

##Instructions
To get started:
With MySQL running enter on command line: 
1.) mysql -u <your username> -p < schema.sql
(you will need to change the username/password in the MySQLdb/index.js file to your own)
2.) npm install
3.) npm start

Server will be up and running. 

Only valid users already entered will be able to enter new scores.
If the new score is a high score for the user and the current top ten, new score will be added to the top ten.

##API routes

1.) '/api/highScores' will retrieve an ordered list of the top ten high scores in the database.

2.) '/api/?username=username&score=score' will add the score supplied to the list of all scores and check if new high score.


