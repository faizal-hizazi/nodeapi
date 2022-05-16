const mongoose = require("mongoose");
var userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  resetLink: {
    data: String,
    default: "",
  },
});

// var userModel = mongoose.model("users", userSchema);

module.exports = mongoose.model("User", userSchema);
