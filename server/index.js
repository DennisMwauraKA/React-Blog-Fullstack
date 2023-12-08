const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 3000;

mongoose
  .connect(
    "mongodb+srv://dennismwaura074:Dennis@cluster0.bqjkwle.mongodb.net/?retryWrites=true&w=majority"
  )
 .then(()=>{
    console.log("Connected to MongoDB")
    app.listen(3000, ()=>{
        console.log(`Server Running on Port ${port}`)
    })
 }).catch((error)=>{
    console.log(error)
 })
app.use("/", (req, res) => {
  res.send("HEllo Server is ready");
});
