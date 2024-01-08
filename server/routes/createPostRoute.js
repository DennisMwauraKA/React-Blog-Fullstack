const express = require("express");
const createPostController = require("../controllers/createPostController.js");
const router = express.Router();

// Preflight OPTIONS request handling
router.options("/create-post", (req, res) => {
  res.header("Access-Control-Allow-Methods", "POST");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.status(204).send();
});

// Actual POST route
router.post(
  "/create-post",
  createPostController.uploadMiddleware,
  createPostController.createPost
);

module.exports = router;
