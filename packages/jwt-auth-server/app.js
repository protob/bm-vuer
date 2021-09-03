/**
 * Module dependencies.
 */

const express = require("express");
const bodyParser = require("body-parser");
const chalk = require("chalk");
// const dotenv = require('dotenv');
const passport = require("passport");
const cors = require("cors");
// const expressValidator = require("express-validator");


/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
// dotenv.load({ path: '.env.example' });

/**
 * Controllers (route handlers).
 */
const userController = require("./controllers/user");

const app = express();
const { body,check } = require('express-validator');
/**
 * Express configuration.
 */

const registerValidatorsArr=[

    check('username',  "Username is empty").not().isEmpty(),
    check('password', 'Password is not valid').not().isEmpty().isLength({ min: 5 }),
  
    body('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation does not match password');
      }
      // Indicates the success of this synchronous custom validator
      return true;
    }),

]
const loginValidatorsArr=[

  check('username',  "Username is empty").not().isEmpty(),
  check('password', 'Password is empty')
]


app.set("host", "0.0.0.0");
//app.set("port", process.env.PORT || 3333);
app.set("port", 3335);
app.set("json spaces", 2); // number of spaces for indentation
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.get("/", userController.getHello);
app.post("/login",loginValidatorsArr, userController.postLogin);
app.post("/register",registerValidatorsArr, userController.postRegister);
app.get("/webhook",  userController.getWebhook);
app.get("/jwks", userController.getJwks);
/**
 * Start Express server.
 */
app.listen(app.get("port"), () => {
  console.log(
    "%s App is running at http://localhost:%d in %s mode",
    chalk.green("✓"),
    app.get("port"),
    app.get("env")
  );
});

module.exports = app;
