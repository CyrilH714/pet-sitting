// embed comments in pets, store owner info. userId is objctId of user
// reference owner user and application
// owner-objectId of user

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema= new Schema ({})
const petSchema = new Schema({
  
  about:{
    type:String,
    required:true
  },

  name: {
    type: String,
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
    required:false,
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
  // Mongoose will maintain a createdAt & updatedAt property
  timestamps: true
});

module.exports = mongoose.model("Pet", petSchema);
