const express = require("express");
const Comment = require("../models/Comment");

exports.getComment = async (req, res) => {
  const comment = await Comment.find();
  res.send(comment);
};
exports.getCommentCreate = async (req, res) => {
  const comment = await Comment.create(req.body);
  res.send(comment);
};
exports.getCommentDelete = async (req, res) => {
  const _id = req.params.id;
  const comment = await Comment.findByIdAndDelete(_id);
  res.send(comment);
};
exports.getPostByID = async (req, res) => {
  const _id = req.params.id;
  const user = await Comment.find();
  const neww = user.filter((el) => {
    return el.postID === _id;
  });
  res.send(neww);
};
exports.getPostByUser = async (req, res) => {
  const _id = req.params.id;
  const user = await Comment.find();
  const neww = user.filter((el) => {
    return el.ownerID === _id;
  });
  res.send(neww);
};
