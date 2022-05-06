const mongoose = require("mongoose");
const Post = require("../models/Post");
const User = require("../models/User");

const createPost = async (req, res) => {
  try {
    const { title, content, userId } = req.body;

    if (!(title && content && userId)) {
      return res.status(400).send("No post id provided");
    }

    const post = await Post.create({
      title,
      content,
      poster: mongoose.Types.ObjectId(userId),
    });

    res.json(post);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

const getPost = async (req, res) => {
  try {
    const postId = req.params.id;

    if (!postId) {
      return res.status(400).send("No post id provided");
    }

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(400).send("Post with provided id not found");
    }

    return res.json(post);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

const updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const { title, content } = req.body;

    if (!(postId && title && content)) {
      return res.status(400).send("No post id provided");
    }

    const post = await Post.findByIdAndUpdate(
      postId,
      { title, content },
      { new: true }
    );

    if (!post) {
      return res.status(400).send("No post found");
    }

    return res.json(post);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;

    if (!postId) {
      return res.status(400).send("No post id provided");
    }

    const post = await Post.findByIdAndDelete(postId);

    if (!post) {
      return res.status(400).send("No post found");
    }

    return res.json(post);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort("-createdAt");

    return res.json(posts);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

module.exports = {
  getPost,
  getPosts,
  createPost,
  updatePost,
  deletePost,
};
