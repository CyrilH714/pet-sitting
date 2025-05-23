const express = require('express');
const router = express.Router();
const Pet = require("../models/pet");
const Application = require("../models/application");
const ensureLoggedIn = require('../middleware/ensure-logged-in');

router.use(ensureLoggedIn);

// get new
// Show the application form for a pet
router.get("/:id", async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id).populate("owner");
    if (!pet) return res.redirect("/pets");

    res.render("applications/index.ejs", {
      pet,
      userId: req.session.userId,
      pageTitle: `Apply to care for ${pet.name}`,
    });
  } catch (err) {
    console.log(err);
    res.redirect("/pets");
  }
});


// POST application
router.post("/:id", async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    const applicant = req.session.userId;

    await Application.create({
      pet: pet._id,
      owner: pet.owner,
      applicant,
      status: "pending",
      hasExperience: req.body.hasExperience === "on",
      message: req.body.message,
      distance: req.body.distance
    });

    res.redirect(`/pets/${pet._id}`);
  } catch (err) {
    console.log(err);
    res.redirect("/pets");
  }
});

// update status
router.put("/:id", async(req,res)=>{
    try{const application=await Application.findById(req.params.id);
    if (application.owner.toString()!==req.session.userId){
        return res.redirect('/pets');
    }
    application.status=req.body.status;
    await application.save();
    res.redirect(`/applications/${application._id}`);
} catch(err){
    console.log(err);
    res.redirect("/pets")
}
})
module.exports = router;
