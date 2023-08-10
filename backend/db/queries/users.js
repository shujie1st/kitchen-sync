const db = require('../connection');

// Retrieve a user by email
const getUserByEmail = (email) => {
  return db.query('SELECT * FROM users WHERE email = $1;', [email])
    .then(data => {
      if (data.rowCount === 0) {
        return null;
      } else {
        return data.rows[0];
      }
    });
};

// Create a new user
const createUser = (firstName, lastName, email, password) => {
  const query = `
    INSERT INTO users (first_name, last_name, email, password)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  return db.query(query, [firstName, lastName, email, password])
    .then((res) => res.rows[0]);
};

// Retrieve saved recipes by userId
const getRecipesByUserId = (userId) => {
  return db.query('SELECT * FROM user_recipes WHERE user_id = $1;', [userId])
    .then(data => {
      if (data.rowCount === 0) {
        return [];
      } else {
        return data.rows;
      }
    }

  );
};

// Save recipe to DB for logged in user
const saveRecipe = (recipeId, recipeName, recipeLink, userId) => {
  return db.query(
    `INSERT INTO user_recipes (recipe_id, name, recipe_link, user_id) VALUES ($1, $2, $3, $4)`,
  [recipeId, recipeName, recipeLink, userId])    
};

// Delete recipe from DB for logged in user
const deleteRecipe = (recipeId, userId) => {
  return db.query(
    `DELETE FROM user_recipes WHERE recipe_id = $1 AND user_id = $2`,
  [recipeId, userId])    
};

module.exports = { getUserByEmail, createUser, getRecipesByUserId, saveRecipe, deleteRecipe };