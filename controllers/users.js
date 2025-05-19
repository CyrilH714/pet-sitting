const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Pet= require("../models/pet")
const Application= require("../models/application")
const ensureLoggedIn = require('../middleware/ensure-logged-in');


router.use(ensureLoggedIn);
module.exports = router;