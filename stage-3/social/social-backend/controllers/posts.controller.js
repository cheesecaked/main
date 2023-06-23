const Post = require("../models/posts.model");
const { mongoose } = require("mongoose");

exports.getPosts = async (req, res) => {
  const result = await Post.find({});
  res.status(200).json(result);
};
exports.createPosts = async (req, res) => {
  try {
    const result = await Post.create({
      text: req.body.text
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(405).json(error)
  }
};
exports.deletePosts = async (req, res) => {
    try {
        const result = await Post.findByIdAndRemove({
            _id: req.params.id
        })
        res.status(200).json(result)
    } catch (error) {
        res.status(401).json(error)
    }
}
exports.updatePosts = async (req, res) => {
    try {
        const result = await Post.findByIdAndUpdate({
            _id: req.params.id
        }, {
            text: 'bruh'
        })
        res.send(result)
    } catch (error) {
        res.status(400).json(error)
    }
}