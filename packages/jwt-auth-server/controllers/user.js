const passport = require("../config/passport");
const { User } = require("../db/schema");
const { errorHandler } = require("../db/errors");
const rasha = require("rasha");
const jwtConfig = require("../config/jwt");
const {  validationResult } = require('express-validator');

exports.getHello = async (req, res, next) => {
  const json = {
    msg: "it works",
  };

  res.setHeader("Content-Type", "application/json");
  return res.send(JSON.stringify(json, null, 2) + "\n");
};
/**
 * Sends the JWT key set
 */
exports.getJwks = async (req, res, next) => {
  const jwk = {
    ...rasha.importSync({ pem: jwtConfig.publicKey }),
    alg: "RS256",
    use: "sig",
    kid: jwtConfig.publicKey,
  };
  const jwks = {
    keys: [jwk],
  };
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(jwks, null, 2) + "\n");
  handleResponse(res, 200, jwks);
};

/**
 * Sign in using username and password and returns JWT
 */
exports.postLogin = async (req, res, next) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return handleResponse(res, 400, { error: err });
    }
    if (user) {
      handleResponse(res, 200, user.getUser());
    }
  })(req, res, next);
};

/***
 * POST /signup
 * Create a new local account
 */
exports.postRegister = async (req, res, next) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.query()
      .allowInsert("[username, password,email]")
      .insert({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
      });
  } catch (err) {
    errorHandler(err, res);
    return;
  }
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return handleResponse(res, 400, { error: err });
    }
    if (user) {
      handleResponse(res, 200, user.getUser());
    }
  })(req, res, next);
};

exports.getWebhook = async (req, res, next) => {
  passport.authenticate("bearer", (err, user, info) => {
    if (err) {
      return handleResponse(res, 401, { error: err });
    }
    if (user) {
      handleResponse(res, 200, user.getHasuraClaims());
    } else {
      handleResponse(res, 200, { "X-Hasura-Role": "anonymous" });
    }
  })(req, res, next);
};

function handleResponse(res, code, statusMsg) {
  res.status(code).json(statusMsg);
}
