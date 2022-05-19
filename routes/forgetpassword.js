const express = require("express");
const router = express.Router();
const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const { findOne } = require("../model/userModel");
const mailgun = require("mailgun-js");
const DOMAIN = "sandbox5d01b829be7047a396ccc5aebc3c5afe.mailgun.org";
const mg = mailgun({
  apiKey: "752b9d340ebd14ea6cc2e3dab2a80823-fe066263-f29dbb6a",
  domain: DOMAIN,
});
router.put("/forgetpassword", (req, res) => {
  const email = req.body.email;
  console.log(email);
  User.findOne({ email: email }, (err, user) => {
    if (err || !user) {
      res.status(401).json({
        error: "user does not exist with this email address",
      });
    }
    const token = jwt.sign(
      { email: user.email, exp: Math.floor(Date.now() / 1000) + 15 * 60 },
      "verySecretValue"
    );
    const data = {
      from: "faizalhizazi@gmail.com",
      to: email,
      subject: "forgot password Link",
      html: `
          <h2>please click on the link to reset your password</h2>
          <p>${token}</p>
          `,
    };

    return user.updateOne({ resetLink: token }, (err, success) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      } else {
        mg.messages().send(data, function (error, body) {
          if (error) {
            res.status(400).json({ error: error });
          }
          return res
            .status(200)
            .json({ message: "message has sent", body: body });
        });
      }
    });
  });
});
module.exports = router;
