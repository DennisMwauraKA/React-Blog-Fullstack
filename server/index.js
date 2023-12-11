const express = require("express");
const cors = require('cors')
const app = express();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';
const User = require("./models/userModel");
const port = 3000;

app.use(express.json());
app.use(cors())
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


app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = new User({ email, password:bcrypt.hash(myPlaintextPassword, saltRounds).then(function(hash) {
     password,hash
  }) });
    await user.save();

    res.status(200).json({ message: "user saved successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.post('/login',(req,res)=>{
try {
  
} catch (error) {
  console.log(error);
  res.status(500).json({message: error.message});
  
}
})
