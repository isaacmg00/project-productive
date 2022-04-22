CREATE DATABASE comp484_final;

/* holds user account info */
CREATE TABLE users (id BIGSERIAL PRIMARY KEY NOT NULL,
name VARCHAR(35) NOT NULL,
email VARCHAR(100) NOT NULL,
password VARCHAR(100) NOT NULL,
UNIQUE (email));







