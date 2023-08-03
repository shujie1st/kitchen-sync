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

// Save recipe to DB for logged in user
const saveRecipe = (recipeId, recipeName, recipeLink, userId) => {
  return db.query(
    `INSERT INTO user_recipes (recipe_id, name, recipe_link, user_id) VALUES ($1, $2, $3, $4)`,
  [recipeId, recipeName, recipeLink, userId])    
};


module.exports = { getUserByEmail, saveRecipe };