CREATE TABLE todos (
  id SERIAL PRIMARY KEY,
  name varchar(255) DEFAULT NULL,
  description varchar(255) DEFAULT NULL,
  completed BOOLEAN DEFAULT FALSE
);