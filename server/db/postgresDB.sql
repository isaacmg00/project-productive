/* uuid extension */
create extension if not exists "uuid-ossp";

/* create the database */
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
  linked_user uuid NOT NULL REFERENCES users(user_id),
  user_habit TEXT NOT NULL
);

/* holds each user todo list in a seperate table */
CREATE TABLE user_todo (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  linked_user uuid NOT NULL REFERENCES users(user_id),
  todo_item TEXT NOT NULL,
  todo_item_order smallint NOT NULL
);

/* sample user info/habits to practice queries */
INSERT INTO users (user_name, name, email, password) values ('user1', 'isaac', 'sample@biz.com', '12345');
INSERT INTO users (user_name, name, email, password) values ('admin', 'izak', 'sample2@biz.com', 'abcde');
INSERT INTO users (user_name, name, email, password) values ('root', 'isac', 'sample3@biz.com', 'qwerty');

/* # select * from users;
               user_id                | user_name | name  |      email      | password
--------------------------------------+-----------+-------+-----------------+----------
 b4f1bff6-c72a-48bd-9956-298c3c8aa9ce | user1     | isaac | sample@biz.com  | 12345
 92cb53c1-ef16-4a49-bac2-a1f0657babb6 | admin     | izak  | sample2@biz.com | abcde
 c8ff7337-97a7-498a-b514-3e022a15b969 | root      | isac  | sample3@biz.com | qwerty
(3 rows)
*/

/* this will insert habits that are linked to user1's profile and associated with them. */
INSERT INTO user_habits (linked_user, user_habit) values ('b4f1bff6-c72a-48bd-9956-298c3c8aa9ce','walk for 2 miles');
INSERT INTO user_habits (linked_user, user_habit) values ('b4f1bff6-c72a-48bd-9956-298c3c8aa9ce','go to the gym');
INSERT INTO user_habits (linked_user, user_habit) values ('b4f1bff6-c72a-48bd-9956-298c3c8aa9ce','ride my bike');
INSERT INTO user_habits (linked_user, user_habit) values ('b4f1bff6-c72a-48bd-9956-298c3c8aa9ce','eat healthier');
INSERT INTO user_habits (linked_user, user_habit) values ('b4f1bff6-c72a-48bd-9956-298c3c8aa9ce','read before bed');

/* same goes for admin's profile, simply use their uuid when making the query to INSERT */
INSERT INTO user_habits (linked_user, user_habit) values ('92cb53c1-ef16-4a49-bac2-a1f0657babb6','exercise for 1 hour daily');

/* # select * from user_habits;
 id |             linked_user              |        user_habit
----+--------------------------------------+---------------------------
  1 | b4f1bff6-c72a-48bd-9956-298c3c8aa9ce | clean up my room
  2 | 92cb53c1-ef16-4a49-bac2-a1f0657babb6 | exercise for 1 hour daily
(2 rows)
*/

INSERT INTO user_todo (linked_user, todo_item, todo_item_order) values ('b4f1bff6-c72a-48bd-9956-298c3c8aa9ce','finish my fullstack projects.', 1);
INSERT INTO user_todo (linked_user, todo_item, todo_item_order) values ('b4f1bff6-c72a-48bd-9956-298c3c8aa9ce','study for finals.', 2);
INSERT INTO user_todo (linked_user, todo_item, todo_item_order) values ('b4f1bff6-c72a-48bd-9956-298c3c8aa9ce','grind valorant battle pass.', 3);
INSERT INTO user_todo (linked_user, todo_item, todo_item_order) values ('b4f1bff6-c72a-48bd-9956-298c3c8aa9ce','pay my bills.', 4);
INSERT INTO user_todo (linked_user, todo_item, todo_item_order) values ('b4f1bff6-c72a-48bd-9956-298c3c8aa9ce','gym.', 5);



                                                 
  







