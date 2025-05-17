const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Pet= require("../models/pet")
const Application= require("../models/application")

router.use(ensureLoggedIn);



module.exports = router;