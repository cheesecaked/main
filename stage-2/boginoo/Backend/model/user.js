const mongoose = require("mongoose")
const {isEmail} = require("validator")
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [isEmail, "invalid"]
    },
    password: {
        type: String,
        required: true
    },
    history: [{ type: mongoose.Schema.Types.ObjectId, ref: "links" }]
})

const User = mongoose.model("users", userSchema)

module.exports = User