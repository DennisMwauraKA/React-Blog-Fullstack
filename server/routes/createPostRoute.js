const express = require("express");
const createPostController = require("../controllers/createPostController.js");

const router = express.Router();

router.post("/create-post", createPostController.uploadMiddleware, createPostController.createPost);

module.exports = router;
