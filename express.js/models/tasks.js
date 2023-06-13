const mongoose = require("mongoose");
const validator = require("validator");
const model = mongoose.model;
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "firstName is required"],
    unique: [true, "your name can't be the same as another users name"],
    minlength: [
      6,
      "minimum length of your name should be more or the same as 6 characters",
    ],
    maxlength: [50, "you cannot go above 50 characters for your name"],
  },
  age: { type: Number },
});

const User = model("users", UserSchema);
module.exports = User;
