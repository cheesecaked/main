const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const connect = require("./database/db.js")
const chatRouter = require('./routes/chat.router')
require("dotenv").config()

const app = express()
const PORT = process.env.PORT || 4000

app.use(express.json())
app.use(cors())
app.use('/', chatRouter)

app.listen(PORT, () => {
    console.log(`server started on localhost:${PORT}`)
})

connect()