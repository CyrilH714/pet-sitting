const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Pet= require("../models/pet")
const Application= require("../models/application")
// Middleware used to protect routes that need a logged in user
const ensureLoggedIn = require('../middleware/ensure-logged-in');


// ALL paths start with '/pets'

// index action
// GET /pets
// Example of a non-protected route
router.get('/', (req, res) => {
  res.send('List of all pets - not protected');
});

// GET /pets/new
// Example of a protected route
router.get('/new', ensureLoggedIn, (req, res) => {
  res.send('Create a pet!');
});

module.exports = router;