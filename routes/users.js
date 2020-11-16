const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

// User Model
const User = require("../models/user");

/**
 * @route   Post /users
 * @desc    Register new user
 * @access  Public
 */

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  // Simple validation
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  try {
    // Check for existing user
    const user = await User.findOne({ email: email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    // create salt and hash
    const salt = await bcrypt.genSalt(10);
    if (!salt) throw Error("Something went wrong with bcrypt");

    const hash = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hash,
    });

    const savedUser = await newUser.save();
    if (!savedUser)
      res.status(400).json({ msg: "Could not register the user" });

    // create salt and hash
    // bcrypt.genSalt(10, (err, salt) => {
    //   bcrypt.hash(newUser.password, salt, (err, hash) => {
    //     {
    //       if (err) throw err;
    //       newUser.password = hash;

    //       newUser.save();
    //     }
    //   });
    // });

    //generate a token
    const token = jwt.sign(
      { id: savedUser._id, email: savedUser.email },
      jwtSecret,
      { expiresIn: 3600 }
    );
    if (!token) res.status(400).json({ msg: "Could not sign the token" });

    // response: token + new user details (id, name, email)
    res.json({
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

module.exports = router;
