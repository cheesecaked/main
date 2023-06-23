const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    text: { type: String }
})

const Post = mongoose.model("posts", postSchema)
module.exports =  Post