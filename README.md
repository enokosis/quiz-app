Web Software Development Course Project 2

To start the server on your machine follow the steps

1. Configure config/config.js file with your SQL server config one database for
   production and another one for testing

2. Create the following tables on the sql server.

CREATE TABLE users ( id SERIAL PRIMARY KEY, email VARCHAR(255) UNIQUE, password
CHAR(60) );

CREATE TABLE questions ( id SERIAL PRIMARY KEY, user_id INTEGER REFERENCES
users(id), title VARCHAR(256) NOT NULL, question_text TEXT NOT NULL );

CREATE TABLE question_answer_options ( id SERIAL PRIMARY KEY, question_id
INTEGER REFERENCES questions(id), option_text TEXT NOT NULL, is_correct BOOLEAN
DEFAULT false );

CREATE TABLE question_answers ( id SERIAL PRIMARY KEY, user_id INTEGER
REFERENCES users(id), question_id INTEGER REFERENCES questions(id),
question_answer_option_id INTEGER REFERENCES question_answer_options(id),
correct BOOLEAN DEFAULT false );

CREATE UNIQUE INDEX ON users((lower(email)));

3. Run the below command: deno run --allow-all --unstable .\run-locally.js

App will be lauched http://localhost:7777 by default

Test can be run from app_test.js file

Check the below link for the same application deployed in heroku:
https://pr2-quiz.herokuapp.com/projects
