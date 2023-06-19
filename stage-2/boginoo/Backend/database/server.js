const mongoose = require("mongoose")
require("dotenv").config()

const uri = process.env.URI || ""

const connect = async () => {
    try {
        await mongoose.connect(uri)
        console.log("connected");
    } catch (error) {
        console.error(error);
    }
}
module.exports = connect