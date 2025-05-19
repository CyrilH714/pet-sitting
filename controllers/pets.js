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
router.get('/', async (req, res) => {
  const pets = await Pet.find();
  try {res.render("pets/index.ejs", {pets, pageTitle:"View pets"})
     } catch (err){
        console.log(err);
        res.redirect("/")
    }
  });

// GET /pets/new
// Example of a protected route
router.get('/new', ensureLoggedIn, (req, res) => {
  if (!req.session.userId){
        return res.redirect("/auth/sign-in");
      } else {
  res.render('pets/new.ejs', { pet:{}, pageTitle:"Submit a pet"});
}});

// Create route: POST add item
router.post("/", async(req,res)=>{
    try{
      req.body.specialCareNeeded= req.body.specialCareNeeded==="on";
        const newPet= new Pet({...req.body, owner:req.session.userId});
    await newPet.save()
    res.redirect("/pets")
    } catch (err){
        console.log(err);
        res.redirect("/pets/new")
    }
})

// delete
router.delete("/:id", async (req,res)=>{
    try{
if (!req.session.userId){
        return res.redirect("/auth/sign-in");
      } else {
        await Pet.findByIdAndDelete(req.params.id);
        res.redirect("/pets");
    }
  } catch (err){
        console.log(err);
        res.redirect("/pets");
    }
})
// edit
router.get("/:id/edit", async (req,res)=>{
    try{
            if (!req.session.userId){
        return res.redirect("/auth/sign-in");
      } else {
        const pet= await Pet.findById(req.params.id).populate("owner");
        pet.owner=req.session.userId;
 const user= await User.findById(req.session.userId);
        res.render("pets/edit.ejs",{pet, user, pageTitle:`Edit ${pet.name} `})
    }
  } catch(err) {
        console.log(err);
        res.redirect("/pets");
    }
})

router.put("/:id", async (req,res)=>{
    try{
      console.log(req.body.date)
        const pet= await Pet.findById(req.params.id).populate("owner");
 const user= await User.findById(req.session.userId);
    Object.assign(pet, req.body);
    pet.specialCareNeeded=req.body.specialCareNeeded==="on";
 await pet.save();
    res.redirect(`/pets/${pet._id}`)
    } catch (err){
        console.log(err);
        res.redirect('/pets');

    }
})


// show
router.get("/:id", async (req,res)=>{
    try{
 const pet= await Pet.findById(req.params.id);
 const user= await User.findById(req.session.userId);
 res.render("pets/show.ejs", {pet, user, pageTitle: `${pet.name}`})
  }catch(err){
        console.log(err);
        res.redirect("/pets")
    }
})

router.put("/:id", async (req,res)=>{
    try{
        const pet= await Pet.findById(req.session.user._id);
    await pet.save();
    res.redirect("/pets")
    } catch (err){
        console.log(err);
        res.redirect('/pets');

    }
})


module.exports = router;