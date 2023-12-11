const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const secret = "uhuhewhuhwuheuwhwu";
const User = require("./models/userModel");
const port = 3000;

app.use(express.json());
app.use(cors());
mongoose
  .connect(
    "mongodb+srv://dennismwaura074:Dennis@cluster0.bqjkwle.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(3000, () => {
      console.log(`Server Running on Port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

app.get("/", (req, res) => {
  res.send("Welcome to BLOG Server API");
});

app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = new User({ email, password: hashedPassword });
    await user.save();
    res.status(200).json({ message: "user saved successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const passOk = bcrypt.compareSync(password, user.password);
    if (passOk) {
      jwt.sign({ email, id: user._id }, secret, {}, (err, token) => {
        if (err) throw err;
        res.json(token);
      });
    } else {
      console.log(error);
      res.status(400).json("Wrong Credentials");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});
