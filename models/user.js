const mongoose = require("mongoose");
// shortcut variable
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
    required: true,
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
    enum:["owner","applicant","both"]
  }
}, {
  // Mongoose will maintain a createdAt & updatedAt property
  timestamps: true
});

module.exports = mongoose.model("User", userSchema);
