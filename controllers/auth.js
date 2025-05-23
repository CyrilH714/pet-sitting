const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 6;


// Sign Up Form
// GET /auth/sign-up
router.get('/sign-up', (req, res) => {
  res.render('auth/sign-up.ejs', { error: '' , pageTitle: "Sign up"});
});

// POST /auth/sign-up
router.post('/sign-up', async (req, res) => {
  try {
    if (req.body.password !== req.body.confirmPassword) throw new Error('Passwords Do Not Match');
    req.body.password = bcrypt.hashSync(req.body.password, SALT_ROUNDS);

    if (!req.body.profileImg || req.body.profileImg.trim() === '') {
      const seed = req.body.name || 'default';
      req.body.profileImg = `https://api.dicebear.com/8.x/thumbs/svg?seed=${encodeURIComponent(seed)}`;
    }

    const user = await User.create(req.body);
    req.session.userId = user._id;
    res.redirect('/pets/index')
  } catch (err) {
    if (err.message.includes('duplicate key')) err.message = 'User Already Exists';
    res.render('auth/sign-up.ejs',{ error: err.message ,pageTitle: "Sign up"});
  }
});

// Return Sign In Form
// GET /auth/sign-in 
router.get('/sign-in', (req, res) => {
  res.render('auth/sign-in.ejs', { error: '',pageTitle: "Sign in" });
});

// POST /auth/sign-in
router.post('/sign-in', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error();
    const isValidPassword = bcrypt.compareSync(req.body.password, user.password);
    if (!isValidPassword) throw new Error();
    req.session.userId = user._id;
    res.redirect('/pets');
  } catch {
    res.render('auth/sign-in.ejs',{ error: 'Invalid Credentials',pageTitle: "Sign in" });
  }
});

// GET /auth/sign-out
router.get('/sign-out', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});



module.exports = router;