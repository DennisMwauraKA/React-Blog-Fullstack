require("dotenv").config();
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const secret = "jsonsecret";

// login controller

const createLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const passwordOk = bcrypt.compareSync(password, user.password);
    if (passwordOk) {
      jwt.sign({ email, id: user._id }, secret, {}, (err, token) => {
        if (err) throw err;
        res
          .cookie("token", token, { sameSite: "none", secure: true })
          .json({ email, id: user._id });
      });
    } else {
      res.status(400).json("Wrong Credentials");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

//register user
const createRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // check for existing user
    const existinguser = await User.findOne({ email });
    if (existinguser) {
      return res
        .status(404)
        .json({ message: "user already saved in the database" });
    }
    // hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    // creae a  new user
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.status(200).json({ message: "user saved successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

// logout
const Logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logout successful" });
};

// get user profile
const getProfile = async (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    console.log("No token found in cookies");
    return res.status(401).json({ message: "Unauthorized Access" });
  }

  jwt.verify(token, secret, {}, (err, info) => {
    if (err) {
      console.log("Error during token verification:", err);
      return res.status(401).json({ message: "Unauthorized" });
    }
    res.json(info);
  });
};

module.exports = {
  createLogin,
  createRegister,
  Logout,
  getProfile,
};
