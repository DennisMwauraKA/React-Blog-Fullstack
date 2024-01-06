const express = require("express");
const cors = require("cors");
router.use(
  cors({
    origin: [
      "https://react-blog-client-omega.vercel.app",
      "http://localhost:5173",
    ],
    methods: "POST",
  })
);
const createPostController = require("../controllers/createPostController.js");

const router = express.Router();

router.post(
  "/create-post",
  createPostController.uploadMiddleware,
  createPostController.createPost
);

module.exports = router;
