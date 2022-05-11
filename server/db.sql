CREATE DATABASE gitlub;

\connect gitlub;

CREATE TABLE users(
   user_id INT GENERATED ALWAYS AS IDENTITY,
   username VARCHAR(255) NOT NULL,
   password VARCHAR(255) NOT NULL,
   ssh_key  VARCHAR(2048) NOT NULL,
   status INT,
   PRIMARY KEY(user_id)
);

/*
create user username with encrypted password 'password';
-- grant all privileges on database gitlub to username;
grant all privileges on table users to username;
*/
