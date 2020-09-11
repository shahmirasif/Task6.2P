const express = require("express");
const router = express.Router();
const {
  registerationValidator: rValidator,
  loginValidator: lValidator,
} = require("../validations/user.js");
const User = require("../models/User.js");
const mailer = require("../emails/welcome.js");

router.post("/register", async (req, res) => {
  const {error} = rValidator(req.body);

  if (error) {
    var msg;
    error.details ? (msg = error.details[0].message) : (msg = error.message);
    return res.status(400).json({
      status: 400,
      message: msg,
    });
  }

  let user = await User.checkUser(req.body);

  if (user)
    return res.status(400).json({
      status: 400,
      message: "User with the given email already exists",
    });

  user = await User.createUser(req.body);

  if (!user || user._message)
    return res.status(404).json({
      status: 404,
      message: "Unable to create user",
    });

  res.status(200).json({
    status: 200,
    message: "Sign up successfull",
  });

  await mailer(user);
});

router.post("/login", async (req, res) => {
  const {error} = lValidator(req.body);

  if (error) {
    var msg;
    error.details ? (msg = error.details[0].message) : (msg = error.message);
    return res.status(400).json({
      status: 400,
      message: msg,
    });
  }

  let user = await User.checkUser(req.body);

  if (!user)
    return res.status(400).json({
      status: 400,
      message: "Invalid email or password",
    });

  try {
    await User.login(req.body, user);
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: "Invalid email or password",
    });
  }

  res.status(200).json({
    status: 200,
    message: "Login successfull",
  });
});

module.exports = router;
