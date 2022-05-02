/* uuid extension */
create extension if not exists "uuid-ossp";

/* create database */
CREATE DATABASE comp484_final;

/* holds user account info */
CREATE TABLE users (
  user_id uuid PRIMARY KEY DEFAULT
  uuid_generate_v4(),
  user_name VARCHAR(35) NOT NULL,
  name VARCHAR(35) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL,
  UNIQUE(email),
  UNIQUE(user_name)
);

/* holds each user habit in a seperate table */
CREATE TABLE user_habits (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  linked_user BIGINT NOT NULL REFERENCES users(useR_id)
  user_habit TEXT NOT NULL
);

/* sample user info/habits to practice queries */
INSERT INTO users (name, email, password) values ('isaac', 'sample@biz.com', '12345');
INSERT INTO users (name, email, password) values ('izak', 'sample2@biz.com', 'abcde');
INSERT INTO users (name, email, password) values ('isac', 'sample3@biz.com', 'qwerty');

INSERT INTO user_habits (user_habit) values ('clean up my room');
                                                  
                                                 
  







