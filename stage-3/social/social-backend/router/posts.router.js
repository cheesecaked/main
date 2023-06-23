const {
  getPosts,
  createPosts,
  deletePosts,
  updatePosts,
} = require("../controllers/posts.controller");
const express = require("express");
const postRouter = express.Router();

postRouter
  .get("/", getPosts)
  .post("/create", createPosts)
  .delete("/delete/:id", deletePosts)
  .put("/update/:id", updatePosts);

module.exports = postRouter;
