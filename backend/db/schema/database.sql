DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS ingredients CASCADE;
DROP TABLE IF EXISTS preferences CASCADE;
DROP TABLE IF EXISTS user_recipes CASCADE;
DROP TABLE IF EXISTS user_preferences CASCADE;



CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE categories (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE ingredients (
  id SERIAL PRIMARY KEY NOT NULL,
  category_id INTEGER REFERENCES categories(id),
  name VARCHAR(255) NOT NULL
);

CREATE TABLE preferences (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE user_recipes (
  id SERIAL PRIMARY KEY,
  recipe_id VARCHAR(2083),
  name VARCHAR(255) NOT NULL,
  recipe_link VARCHAR(2083),
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);


CREATE TABLE user_preferences (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  preference_id INTEGER REFERENCES preferences(id) ON DELETE CASCADE
)