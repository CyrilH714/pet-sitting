// embed comments in pets, store owner info. userId is objctId of user
// reference owner user and application
// owner-objectId of user

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const petSchema = new Schema({
  
  name: {
    type: String
  },
  type: {
    type: String,
    required: true,
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
    ref:"User",
    required:true,
  },

    comments:{
        type:[commentsSchema],
    },
  
}, {
  // Mongoose will maintain a createdAt & updatedAt property
  timestamps: true
});

module.exports = mongoose.model("Pet", petSchema);
