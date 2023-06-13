const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Comment_schema = new Schema({
  comment: {
    type: String,
    required: [true, "please write anything in order to make a comment"],
  },
  postID: { type: String, required: [true, "postID is required"] },
  ownerID: { type: String, required: [true, "ownerID is required"] },
});
const Comment = mongoose.model("comments", Comment_schema);

module.exports = Comment;
