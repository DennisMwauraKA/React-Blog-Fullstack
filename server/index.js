const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User = require("./models/userModel");
const port = 3000;

app.use(express.json());
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
  res.send("HEllo Server is ready");
});


app.post("/user", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = new User({ email, password });
    await user.save();

    res.status(200).json({ message: "user saved successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});
