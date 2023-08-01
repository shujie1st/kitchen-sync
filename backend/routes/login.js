const express = require('express');
const router  = express.Router();
const { getUserByEmail } = require('../db/queries/users');
const cookieSession = require('cookie-session');

router.use(cookieSession({
  name: "session",
  keys: ["some-long-secret-key1", "some-long-secret-key2"],
}));

router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Retrieve the user from the database
    const user = await getUserByEmail(email);

    // Check if the user exists and if the password is valid
    if (!user) {
      return res.status(401).json({ message: "Email does not exist." });
    }

    if (password !== user.password) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // If both checks pass, set "userId" cookie
    req.session.userId = user.id;
    res.status(200).json( { firstName: user.first_name, message: "Login successful." });

  } catch (error) {
    console.error(error);
    res.status(500).send("Error occurred during login.");
  }
});

module.exports = router;