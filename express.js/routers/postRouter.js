const express = require("express");
const router = express.Router();
const {
  getPosts,
  createPosts,
  getPostsById,
  updatePosts,
  deletePosts,
  getPostsByUser,
  getPostsByTag,
} = require("../comp/postController.js");

router
  .get("/", getPosts)
  .get("/:id", getPostsById)
  .post("/create", createPosts)
  .put("/:id", updatePosts)
  .delete("/:id", deletePosts)
  .get("/:id/posts", getPostsByUser)
  .get("/tag/:tag/posts", getPostsByTag);

module.exports = router;
