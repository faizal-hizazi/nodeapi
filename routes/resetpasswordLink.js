const express = require("express");
const router = express.Router();
var User = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const { findOne } = require("../model/userModel");

router.post("/resetpassword", (req, res) => {
  const { resetLink, newpassword } = req.body;
  bcrypt.hash(newpassword, 10, (err, hash) => {
    if (err) {
      res.status(500).json({
        error: "bcrypt have error",
      });
    }

    if (resetLink) {
      jwt.verify(resetLink, "verySecretValue", (err, decodeValue) => {
        if (err) {
          res.status(400).json({ message: "incorrect token or expire token" });
        }

        User.findOne({ resetLink: resetLink }, (err, user) => {
          if (err || !user) {
            res.status(400).json({
              message: "user does not exist with this token",
            });
          } else {
            const obj = {
              password: hash,
              resetLink: "",
            };
            user = _.extend(user, obj);
            user.save((err, result) => {
              if (err) {
                res.status(400).json({ error: "reset password  error" });
              } else {
                res.status(200).json({
                  message: "your password has been update",
                  data: result,
                });
              }
            });
          }
        });
      });
    } else {
      res.status(401).json({ message: "authentication error" });
    }
  });
});

module.exports = router;
