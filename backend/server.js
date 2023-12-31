// load .env data into process.env
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieSession = require('cookie-session');

const PORT = process.env.PORT || 8080;
const app = express();
const CORS_PORT = process.env.CORS_PORT

// allow the client to use cookies 
app.use(cors({
  origin: [`http://localhost:${CORS_PORT}`],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieSession({
  name: "session",
  keys: ["some-long-secret-key1", "some-long-secret-key2"],
}));



// Separated Routes for each Resource
const indexRoutes = require('./routes/index');
const loginRoutes = require('./routes/login');
const logoutRoutes = require('./routes/logout');
const registerRoutes = require('./routes/register');
const userRecipesRoutes = require('./routes/user_recipes');
const userPreferencesRoutes = require('./routes/user_preferences');

// Mount all resource routes
app.use('/', indexRoutes);
app.use('/login', loginRoutes);
app.use('/logout', logoutRoutes);
app.use('/register', registerRoutes);
app.use('/user_recipes', userRecipesRoutes)
app.use('/user_preferences', userPreferencesRoutes)

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});