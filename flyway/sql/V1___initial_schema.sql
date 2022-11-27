/* Create your schema here */

CREATE TABLE grades(
    id SERIAL PRIMARY KEY NOT NULL, 
    userId VARCHAR ( 50 ) NOT NULL,
    exerciseId VARCHAR ( 2 ) NOT NULL,
    grade VARCHAR ( 5 ) NOT NULL
);
