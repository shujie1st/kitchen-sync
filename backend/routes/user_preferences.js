const express = require('express');
const router = express.Router();
const pool = require('../db/connection')

// GET all user_preferences
router.get('/', async(req, res) => {
  try {
    const result = await pool.query(
      `SELECT user_preferences.user_id, preferences.name, preferences.id
      FROM user_preferences
      JOIN preferences ON user_preferences.preference_id = preferences.id`)
    return res.status(200).json(result)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Internal server error');
  }
})

// GET user_preferences by user_id
router.get('/:userID', async(req, res) => {
  // const userID = req.params.userID;
  const userID = req.session.userId;
  try {
    const result = await pool.query(
      `SELECT user_preferences.user_id, preferences.name
      FROM user_preferences
      JOIN preferences ON user_preferences.preference_id = preferences.id
      WHERE user_preferences.user_id = $1`, [userID])
    const preferences = result.rows.map(row => row.name);
    return res.status(200).json(preferences)
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal server error');
  }
})

// POST/add a preference
router.post('/add', async(req, res) => {
  const { userID, preferenceID } = req.body;

  try {
    // insert a new record into a user_preferences table
    await pool.query(`INSERT INTO user_preferences (user_id, preference_id) VALUES ($1, $2)`, [userID, preferenceID]);
    res.status(201).send('Preference added successfully');
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal server error');
  }
});

// POST/remove a preference
router.post('/remove', async(req, res) => {
  const { userID, preferenceID } = req.body;

  try {
    // delete the record from the user_preference table
    await pool.query(`DELETE FROM user_preferences WHERE user_id = $1 AND preference_id = $2`, [userID, preferenceID]);
    res.status(200).send('Preference removed successfully');
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal server error');
  }
})

module.exports = router;