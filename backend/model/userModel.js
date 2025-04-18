const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  f_name: {
    type: String,
    required: true,
  },
  l_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ["Student"],
    required: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});
const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
