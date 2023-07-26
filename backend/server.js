// load .env data into process.env
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const PORT = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Separated Routes for each Resource
const indexRoutes = require('./routes/index');
const loginRoutes = require('./routes/login');
const logoutRoutes = require('./routes/logout');
const registerRoutes = require('./routes/register');

// Mount all resource routes
app.use('/', indexRoutes);
app.use('/login', loginRoutes);
app.use('/logout', logoutRoutes);
app.use('/register', registerRoutes);



app.get('/', (req, res) => res.send('Server running'));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});