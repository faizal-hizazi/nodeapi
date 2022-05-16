const express = require("express");
const router = express.Router();
const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/login", (req, res, next) => {
  const { username, password } = req.body;
  User.findOne({ username: username }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          res.json({ error: err });
        }
        if (result) {
          let token = jwt.sign(
            { name: user.name, exp: Math.floor(Date.now() / 1000) + 60 * 60 },
            "verySecretValue"
          );
          res.json({
            message: "login successfully",
            token,
            user,
          });
        } else {
          res.json({
            message: "password does not match",
          });
        }
      });
    } else {
      res.json({
        message: "user not found!!!",
      });
    }
  });
});
module.exports = router;
