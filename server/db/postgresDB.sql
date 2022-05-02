/* uuid extension */
create extension if not exists "uuid-ossp";

/* create database */
CREATE DATABASE comp484_final;

/* holds user account info */
CREATE TABLE users (
  user_id uuid PRIMARY KEY DEFAULT
  uuid_generate_v4(),
  name VARCHAR(35) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL,
  habit_id BIGINT REFERENCES user_habits(id),
  UNIQUE(email)
);

/* holds each user habit in a seperate table */
CREATE TABLE user_habits (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  user_habit text
);

/* sample user info/habits to practice queries */
INSERT INTO users (id, name, email, password) values ('
  







