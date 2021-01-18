const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// authentication middlware
const auth = require("../middleware/auth");

const jwtSecret = process.env.JWT_SECRET;

// User Model
const User = require("../models/user");

/**
 * @route   POST api/auth
 * @desc    Authenticate user/Login
 * @access  Public
 */

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  // Simple validation
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  try {
    // Check for existing user
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist" });

    //validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ msg: "Invalid credentials" });

    //generate a token
    const token = jwt.sign({ id: user._id, email: user.email }, jwtSecret, {
      expiresIn: 3600,
    });
    if (!token) res.status(400).json({ error: "Counld not sign the token" });

    // response: token + new user details (id, name, email)
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

/**
 * @route   GET api/auth/user
 * @desc    Get user data
 * @access  Private
 */

// Gets user without the password if the token is valid
router.get("/user", auth, async (req, res) => {
  try {
    //select('-password') excludes the password
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(400).json({ msg: "Invalid user" });
    res.json(user);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

module.exports = router;
