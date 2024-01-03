const express = require("express");
const { getPosts, getPostsById } = require("../controllers/getPostController");
const router = express.Router();
router.get("/get-posts", getPosts);
router.get("/get-posts/:id",getPostsById);

module.exports = router;
