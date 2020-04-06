const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
// Middlware
const auth = require("../middleware/auth");
// Add JSON validation for DB
const { check, validationResult } = require("express-validator");
// ADD JWT
const jwt = require("jsonwebtoken");
// Add Config containing secret
const config = require("config");

// @route GET api/auth
//  @desc Get Logged in user
// @access Private

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
});

// @route POST api/auth
//  @desc auth user & get token
// @access Public

router.post(
  "/",
  [
    check("email", "Please include a valid email.").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await /*Use Await because User.findOne returns a promise */ User.findOne(
        { email }
      );
      if (!user) {
        return res.status(400).json({ msg: "Invalid credentials" });
      }

      const isMatch = await /*Bcrypt.compare returns a promise */ bcrypt.compare(
        password,
        user.password
      );

      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid password" });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 360000,
        },
        (error, token) => {
          if (error) throw error;
          res.json({ token });
        }
      );
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
