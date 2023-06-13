const Post = require("../models/Posts.js");

exports.getPosts = async (_req, res) => {
  try {
    const posts = await Post.find();
    res.send(posts);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
exports.getPostsById = async (req, res) => {
  const _id = req.params.id;
  try {
    const posts = await Post.findById({ _id });
    res.send(posts);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
exports.createPosts = async (req, res) => {
  const post = req.body;
  try {
    const postData = await Post.create(post);
    res.send(postData);
  } catch (error) {
    res.status(500).send({ message: "failed to add" + error.messsage });
  }
};
exports.updatePosts = async (req, res) => {
  const _id = req.params.id;
  const post = req.body;
  try {
    const updatedData = await Post.findByIdAndUpdate({ _id }, post);
    res.send(updatedData);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
exports.deletePosts = async (req, res) => {
  const _id = req.params.id;
  try {
    const deletedData = await Post.findByIdAndDelete({ _id });
    res.send(deletedData);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
exports.getPostsByUser = async (req, res) => {
  const _id = req.params.id;
  const posts = await Post.find();
  const neww = posts.filter((el) => {
    return el.ownerID === _id;
  });
  res.send(neww);
};

exports.getPostsByTag = async (req, res) => {
  const tag = req.params.tag;
  const posts = await Post.find({
    tags: [tag],
  });

  res.send(posts);
};
