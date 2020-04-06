const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
// Add JSON validation for DB
const { check, validationResult } = require("express-validator");
// ADD JWT
const jwt = require("jsonwebtoken");
// Add Config containing secret
const config = require("config");

// @route POST api/users
//  @desc Register a user
// @access Public

router.post(
  "/",
  [
    check("name", "Please add a name").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      const { name, email, password } = req.body;

      try {
        let user = await User.findOne({ email });

        if (user) {
          return res.status(400).json({ msg: "User already exists" });
        }

        user = new User({
          name,
          email,
          password,
        });

        // Hashing Password
        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();

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
  }
);

module.exports = router;
