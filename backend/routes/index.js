const express = require('express');
const router  = express.Router();
const pool = require('../db/connection')


// Create a promise
// render res.json
router.get('/ingredients', async(req, res) => {
  try {
    const allIngredients = await pool.query(`SELECT * FROM ingredients`)
   return res.json(allIngredients.rows)
  } catch (error) {
    console.error(error.message);
  }
});


router.get('/preferences', (req, res) => {
})



module.exports = router;