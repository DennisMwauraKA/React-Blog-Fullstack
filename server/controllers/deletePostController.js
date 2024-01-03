const Post = require("../models/postModel");
const deletePostById = async (req, res) => {
  try {
    const { id } = req.params;

    const deletePost = await Post.findByIdAndDelete(id);

    if (!deletePost) {
     return res.status(400).json({ message: "Post Already deleted" });
    }
    res.status(200).json(deletePost);
    console.log("Post deleted successfuly");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = deletePostById;
