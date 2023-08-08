const express = require('express');
const router  = express.Router();
const { getUserByEmail, createUser } = require('../db/queries/users');

router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    
    // Check if user already exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists." });
    }
    
    const createdUser = await createUser(firstName, lastName, email, password);

    // Set "userId" cookie after user registered
    req.session.userId = createdUser.id;
    res.status(200).json( { firstName: createdUser.first_name, message: "User registered successfully." });

  } catch (error) {
    console.error(error);
    res.status(500).send("Error occurred during registration.");
  }
})



module.exports = router;