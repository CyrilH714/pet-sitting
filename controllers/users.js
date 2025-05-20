const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Pet= require("../models/pet")
const Application= require("../models/application")
const ensureLoggedIn = require('../middleware/ensure-logged-in');
router.use(ensureLoggedIn);


router.get('/:id', async (req, res) => {
  try {
    let comments = [];
    const user=await User.findById(req.params.id);
    const pets = await Pet.find({owner:user._id});
    const applicationsSent=await Application.find({applicant:user._id}).populate("pet");
    const petIds = await Pet.find({ owner: user._id }).select("_id");
    const applicationsReceived= await Application.find({pet:{$in:petIds}}).populate("applicant");
    pets.forEach((pet) =>{
        pet.comments.forEach((comment)=>{
            if(comment.author.toString() === user._id.toString()){
                comments.push({...comment.toObject(), pet: {_id: pet._id,name: pet.name}
      })}})})


    res.render("users/index.ejs",{user, loggedInId:req.session.userId, pets,applicationsSent,applicationsReceived, comments, pageTitle:`${user.name}'s profile`});
     } catch (err){
        console.log(err);
        res.redirect("/")
    }
  });

  router.put('/:id', async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    application.status=req.body.status;
    await application.save();
    res.redirect(`/users/${req.params.id}`)
     } catch (err){
        console.log(err);
        res.redirect(`/users/${req.params.id}`)
    }
  });
module.exports = router;