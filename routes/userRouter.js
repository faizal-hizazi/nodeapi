const express = require("express");
const router = express.Router();
const User = require("../model/userModel");
const bcrypt = require("bcrypt");

router.post("/", (req, res, next) => {
  // const postData = JSON.parse(req.body);

  console.log(req.body);
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      res.status(500).json({
        error: err,
      });
    } else {
      const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hash,
      });
      console.log(hash);
      user
        .save()
        .then((result) => {
          res.status(200).json({ new_user: result });
        })
        .catch((err) => {
          res.status(500).json({ error: err });
        });
    }
  });
  // const user = new User({
  //   username: req.body.username,
  //   email: req.body.email,
  //   password: req.body.password,
  // });
  // user
  //   .save()
  //   .then((result) => {
  //     res.status(200).json({ new_user: result });
  //   })
  //   .catch((err) => {
  // res.status(500).json({ error: err });
  //   console.log(err);
  // });
});
module.exports = router;
