

const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const commentSchema= new Schema ({
  message:{
    type:String,
    required:true,
  },
  author:{type:mongoose.Schema.Types.ObjectId, 
    ref:"User",
    required:true,
  },
  datePosted:{
    type:Date,
    default:Date.now,
  },
  edited:{
    type:Boolean,
    default:false,
  },
})

const petSchema = new Schema({

  name: {
    type: String,
    required: true,
  },
  category: {
    type:String,
    enum: ["Dog","Cat","Other small mammal","Other large mammal","Lizard","Snake","Other reptile","Fish","Bird","Insect/Arachnid","Other"],
    required: true,
  },
  breed: {
    type:String,
    required: false,
  },
  age: {
    type: Number,
    required: true,
  },
  specialCareNeeded:{
    type:Boolean,
    required: true,
  },
  about:{
    type:String,
    required: false,
  },
  profileImg:{
    type:String,
    required:true,
  },
  location:{
    type:String,
    required: true,
  },
  owner:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },

  date:{
    type:Date,
    required:true,
  },

    comments:{
        type:[commentSchema],
    },

    application:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Application",
      required:false
    }
  
}, {
  
  timestamps: true
});

module.exports = mongoose.model("Pet", petSchema);
