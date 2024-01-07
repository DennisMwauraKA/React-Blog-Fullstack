const mongoose = require("mongoose");
const { ObjectId } = mongoose;
const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      
    },
    summary: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },

    file: {
      type: String,
      
    },
    author: {
      type: ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
