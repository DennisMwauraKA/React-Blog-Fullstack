require("dotenv").config();
const express =require("express")
const multer = require("multer");
const fs = require("fs");
const striptags = require("striptags");
const Post = require("../models/postModel");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY;
const app = express();
const cors = require("cors")
app.use(cors())
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = "./uploads"; // Relative path to the project root
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const uploadMiddleware = multer({ storage: storage }).single("file");

const createPost = async (req, res) => {
  try {
    const { token } = req.cookies;
    res.header('Access-Control-Allow-Origin', 'https://react-blog-client-omega.vercel.app');

    if (!token) {
      console.log("No token found in cookies");
      return res.status(401).json({ message: "Unauthorized Access" });
    }
    if (!req.file) {
      return res
        .status(400)
        .json({ error: "No file received in the request." });
    }
    
    const { originalname, path } = req.file;
    console.log("Received file:", originalname);
    const { title, summary, content } = req.body;
    const strippedContent = striptags(content); // this will remove the html tags from the body content
    jwt.verify(token, secret, {}, async (err, info) => {
      if (err) throw err;
      const createDoc = new Post({
        title,
        summary,
        content: strippedContent,
        file: path,
        author:info.id,
      });
      await createDoc.save();
          res.status(200).json(createDoc);
    });


  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { uploadMiddleware, createPost };
