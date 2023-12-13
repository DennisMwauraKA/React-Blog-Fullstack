require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const secret = "uhuhewhuhwuheuwhwu";
const User = require("./models/userModel");


app.use(express.json());
app.use(cors({credentials:true,origin:['https://react-blog-client-omega.vercel.app','http://localhost:5173']}));
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server Started at Port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
    process.exit(1); 
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
    const passOk = bcrypt.compareSync(password, user.password); // comparison of the password saved in the database and the one keyed in
    // get the id of the user and the email of the user and get the token in return
    if (passOk) {
      jwt.sign({ email, id: user._id }, secret, {}, (err, token) => {
        if (err) throw err;
        res.cookie('token',token).json('ok');
      });
    } else {
      console.log(error);
      res.status(400).json("Wrong Credentials");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
})