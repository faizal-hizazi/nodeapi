const express = require("express");
const router = express.Router();
const sign = require("./routes/signin");
const mongoose = require("mongoose");
const user = require("./routes/userRouter");
const app = express();
const cors = require("cors");
const forgetpassword = require("./routes/forgetpassword");
const resetpassword = require("./routes/resetpasswordLink");
const sendsms = require("./routes/sendsms");
// const bodyparser = require("body-parser");
// app.use(express.json());
// app.use(bodyparser.json());
const swaggerUi = require("swagger-ui-express");
// swaggerDocument = require("./swagger.json");
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Hello World",
      version: "1.0.0",
      // servers: [{ api: "http://localhost:8000" }],
    },
  },
  apis: ["index.js"], // files containing annotations as above
};
const openapiSpecification = swaggerJsdoc(options);
mongoose
  .connect("mongodb://localhost:27017/user")
  .then(() => console.log("database connected"))
  .catch((err) => console.log(err));
// app.use(bodyparser.urlencoded({ extended: false }));
// app.use(bodyparser.json());
// app.use(express.bodyParser());
// const bodyjson = bodyparser.json();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));
/**
 * @swagger
 * componants:
 *  schemas:
 *   user:
 *    type: object
 *    properties:
 *     username:
 *      type: string
 *      description: username of the user
 *      example: "faizal"
 *     email:
 *      type: string
 *      description: email of the user
 *      example: "faizal@gmail.com"
 *     password:
 *      type: string
 *      description: password of the user
 *      example: "1234321"
 *     resetLink:
 *      type: string
 *      description: resetLink of the user
 *      example: "token"
 *   data:
 *    type: object
 *    properties:
 *     message:
 *      type: string
 *      example: "hii"
 *
 */
/**
 * @swagger
 * /:
 *  get:
 *   description: Get api
 *   responses:
 *    200:
 *     description: Success
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        items:
 *         $ref:"#/componants/schemas/data"
 */
app.get("/", (req, res) => {
  res.send({ message: "get resonse" });
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
// /**
//  * @swagger
//  * api/users:
//  *    get:
//  *     description: Get api
//  *     responses:
//  *       200:
//  *         description: Success
//  *         content:
//  *          application/json:
//  *            schema:
//  *              type:object
//  *                items:
//  *                  $ref:`#/componants/schemas/user`
//  */
/**
 * @swagger
 * /api/users:
 *   post:
 *     description: create user api
 *     parameters:
 *      - in: body
 *        name: body
 *        required: true
 *        description: body of the user
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             item:
 *              $ref:'#componants/schemas/user'
 *     responses:
 *       200:
 *         description: Success
 *
 */
app.use("/api/users", user);
/**
 * @swagger
 * /api/login:
 *   post:
 *     description: login user api
 *     parameters:
 *      - in: body
 *        name: body
 *        required: true
 *        description: body of the user
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             item:
 *              $ref:'#componants/schemas/user'
 *     responses:
 *       200:
 *         description: login Success
 *
 */
app.use("/api", sign);
/**
 * @swagger
 * /api/resetpassword:
 *   post:
 *     description: forgetpassword user api
 *     parameters:
 *      - in: body
 *        name: body
 *        required: true
 *        description: body of the user
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             item:
 *              $ref:'#componants/schemas/user'
 *     responses:
 *       200:
 *         description: Success
 *
 */
app.use("/api", resetpassword);
/**
 * @swagger
 * /api/forgetpassword:
 *   post:
 *     description: forgetpassword user api
 *     parameters:
 *      - in: body
 *        name: body
 *        required: true
 *        description: body of the user
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             item:
 *              $ref:'#componants/schemas/user'
 *     responses:
 *       200:
 *         description: Success
 *
 */
app.use("/api", forgetpassword);
app.use("/api/sendsms", sendsms);
app.listen(8000);
