// references pet (including owner) and user applying.
// petId, userId

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const applicationSchema = new Schema({
  
  pet: {
    type:mongoose.Schema.Types.ObjectId,
    ref:"Pet",
    required:true,
  },
  owner: {
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required: true,
  },
  applicant: {
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required: true,
  },
  status:{
    enum:["pending","accepted","declined"],
    required: true,
  },
  hasExperience:{
    type:Boolean,
    required: false,
  },
  message:{
    type:String,
    required:false,
  },
  distance:{
    type:Number,
    required: true,
  },
}, {
  // Mongoose will maintain a createdAt & updatedAt property
  timestamps: true
});

module.exports = mongoose.model("Application", applicationSchema);
