const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  name: {
    type: String
  },
  password: {
    type: String,
    required: true,
  },
  location:{
    type:String,
    required: false,
  },
  about:{
    type:String,
    required: false,
  },
  profileImg:{
    type:String,
    required:false
  },
  role:{
    type:String,
    enum:["owner","applicant","both"]
  }
}, {
 
  timestamps: true
});

module.exports = mongoose.model("User", userSchema);
