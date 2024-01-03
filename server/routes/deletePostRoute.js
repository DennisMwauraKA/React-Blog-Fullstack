const express = require("express");
const deletePostById = require("../controllers/deletePostController");
const router = express.Router();
router.post("/delete-posts/:id", deletePostById);
module.exports = router;
