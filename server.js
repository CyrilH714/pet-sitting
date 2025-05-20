require("dotenv").config();

const express = require("express");
const app = express();

const mongoose = require("mongoose");
const methodOverride = require("method-override");
// logging middleware
const morgan = require("morgan");
const session = require('express-session');


// Set the port from environment variable or default to 3000
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI);

// Listen for the 'connected' event. 
// .on is similar to addEventListener in the DOM
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// Middleware to "serve"/return static assets, e.g., stylesheets,
// when requested by the browser.
// 'public' is the folder name that all static assets will be saved in.
app.use(express.static('public'));
// Middleware to parse URL-encoded data from forms
app.use(express.urlencoded({ extended: false }));
// Middleware for using HTTP verbs such as PUT or DELETE
app.use(methodOverride("_method"));
// Morgan for logging HTTP requests
app.use(morgan('dev'));

// Sessions are how the server "remembers" which
// user the curren request is from
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

// middleware
const ensureLoggedIn=require("./middleware/ensure-logged-in.js");
const passUserToView=require('./middleware/add-user-to-req-and-locals.js');


// Routes below

// GET / (root/default) -> Home Page
app.get('/', (req, res) => {
  try{
    res.redirect("/pets");
  }catch(err){
    console.log(err);
  res.render('home.ejs', {
    user: req.session.user, pageTitle: "Home"
  });}
});

// The '/auth' is the "starts with" path.  The
// paths defined in the router/controller will be
// appended to the "starts with" path
app.use(passUserToView);
app.use('/auth', require('./controllers/auth'));
// Update the pets data resource with your "main" resource
app.use('/pets', require('./controllers/pets'));
app.use(ensureLoggedIn);
app.use('/applications', require('./controllers/applications'));
app.use('/users', require('./controllers/users'));




app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});

