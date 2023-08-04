const express = require('express');
const router  = express.Router();
const { saveRecipe, deleteRecipe } = require('../db/queries/users');

router.post('/', async (req, res) => {
  try {
    const { recipeId, recipeName, recipeLink } = req.body;
    const userId = req.session.userId;

    if (!userId) {
      throw new Error("userId not found")
    }
    
    // Save recipe to DB
    await saveRecipe(recipeId, recipeName, recipeLink, userId);

    res.status(200).json({ message: "Recipe saved" });
    console.log("Recipe saved");

  } catch (error) {
    console.error(error);
    res.status(500).send("Error during saving recipe");
  }
});

router.delete('/', async (req, res) => {
  try {
    const { recipeId } = req.body;
    const userId = req.session.userId;

    if (!userId) {
      throw new Error("userId not found")
    }
    
    // Delete recipe from DB
    await deleteRecipe(recipeId, userId);

    res.status(200).json({ message: "Recipe deleted" });
    console.log("Recipe deleted");

  } catch (error) {
    console.error(error);
    res.status(500).send("Error during delete recipe");
  }
});


module.exports = router;