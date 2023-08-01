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


module.exports = { getUserByEmail };