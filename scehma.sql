/*creating a database and schema*/

CREATE DATABASE usersandscores;

USE usersandscores;

CREATE TABLE users (
  id int NOT NULL AUTO_INCREMENT,
  username TEXT,
  email TEXT,
  PRIMARY KEY (id)
);

CREATE TABLE scores (
  id int NOT NULL AUTO_INCREMENT,
  score int NOT NULL,
  user_id int,
  FOREIGN KEY (user_id) REFERENCES users (id),
  PRIMARY KEY (id)
);

CREATE TABLE highscores (
  id int NOT NULL AUTO_INCREMENT,
  score_id int,
  user_id int,
  FOREIGN KEY (user_id) REFERENCES users (id),
  FOREIGN KEY (score_id) REFERENCES scores (id),
  PRIMARY KEY (id)
);

INSERT users (username, email) VALUES 
  ('Daniel', 'daniel@gmail.com'),
  ('Sara', 'sara@yahoo.com'),
  ('James', 'james@gmail.com'),
  ('John', 'john@dyahoo.com'),
  ('Mike', 'mike@gmail.com'),
  ('Jessica', 'jessica@hotmail.com'),
  ('Jose', 'jose@gmail.com'),
  ('Yoni', 'yoni@yahoo.com'),
  ('Raj', 'raj@gmail.com'),
  ('Tessa', 'tessa@yahoo.com'),
  ('Gisella', 'gisella@gmail.com'),
  ('Erik', 'erik@yahoo.com'),
  ('Erica', 'erica@gmail.com'),
  ('Laura', 'laura@gmail.com'),
  ('Katie', 'katie@gmail.com')

/*mysql -u <username>root <-p?> < server/schema.sql*/

