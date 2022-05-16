const express = require("express");
const { append } = require("express/lib/response");
const router = express.Router();
const sid = "AC755baacf6210e58b13597e078bc69ba6";

const authToken = "ee509eef044312a77dda1360205eefb9";
const client = require("twilio")(sid, authToken);

router.get("/", (req, res, next) => {
  client.messages
    .create({
      body: "hey this is message from node js program by twilio",
      to: "+91 8963802872",
      from: "+1 970 627 6905",
    })
    .then((message) => console.log(message))
    .done();
});
module.exports = router;
