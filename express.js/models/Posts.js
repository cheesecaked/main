const mongoose = require("mongoose");
const model = mongoose.model;
const Schema = mongoose.Schema;

const postSchema = new Schema({
  ownerID: { type: String, required: [true, "ownerID is required"] },
  text: {
    type: String,
    maxlength: [10000, "the max length of the text must be under or 10000"],
  },
  likes: { type: Number, default: 0 },
  link: { type: String },
  tags: { type: Array },
  publishDate: { type: Date, default: new Date() },
  owner: { type: String },
});

const Post = model("posts", postSchema);
module.exports = Post;
