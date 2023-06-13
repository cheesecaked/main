const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const Task = new Schema({
  orignalLink: { type: String },
  shortLink: { type: String },
});

const Data = mongoose.model("links", Task);
module.exports = Data;
