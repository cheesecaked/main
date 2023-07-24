const {
  getMessages,
  createMessages,
} = require("../controller/chat.controller");
const express = require("express");
const chatRouter = express.Router();

chatRouter.get("/", getMessages).post("/create", createMessages)

module.exports = chatRouter;
