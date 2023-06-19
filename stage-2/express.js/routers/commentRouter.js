const express = require("express");
const {
  getComment,
  getCommentCreate,
  getCommentDelete,
  getPostByID,
  getPostByUser,
} = require("../comp/commentController");
const CommentRouter = express.Router();

CommentRouter.get("/", getComment);
CommentRouter.post("/create", getCommentCreate);
CommentRouter.delete("/delete/:id", getCommentDelete);
CommentRouter.get("/:id", getPostByID);
CommentRouter.get("/:id", getPostByUser);

module.exports = CommentRouter;
