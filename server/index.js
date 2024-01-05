require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const path= require('path')
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))) // serve static files to the react app

app.use(
  cors({
    credentials: true,
    origin: [
      "https://react-blog-client-omega.vercel.app",
      "http://localhost:5173" ,
    ],
    allowedHeaders: ["Authorization", "Content-Type"],
    methods: ['GET,HEAD,PUT,PATCH,POST,DELETE'],
  })
);
//Database Configs
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;

// routes
const userRoute = require("./routes/userRoute");
const postRoute = require("./routes/createPostRoute");
const getPostRoute = require("./routes/getPostsRoute");
const deletePostRoute =require("./routes/deletePostRoute");
// Middle wares



// api routes
app.use("/api", userRoute);
app.use("/api", postRoute);
app.use("/api", getPostRoute);
app.use("/api",deletePostRoute);
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

// main route
app.get("/", (req, res) => {
  res.send("Welcome to BLOG Server API");
});


