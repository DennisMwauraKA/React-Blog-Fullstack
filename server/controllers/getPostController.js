const Post = require("../models/postModel");
const getPosts = async (req, res) => {
  try {
    const getPost = await Post.find({})
      .populate("author", ["username", "email"])
      .sort({ createdAt: -1 })
      .limit(50);

    res.status(200).json(getPost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const getPostsById = async (req, res) => {
  try {
    const { id } = req.params;
    const getPost = await Post.findById(id).populate("author", ["username"]);
    res.status(200).json(getPost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
module.exports = { getPosts, getPostsById };
