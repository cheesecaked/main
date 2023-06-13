const express = require("express");
const {
  register,
  login,
  getUsers,
  getHistory,
  addLinkToUser,
  tokenValidate,
  historyPagination,
} = require("../controller/auth");
const { auth } = require("../middlewear/authorization")
const authRouter = express.Router();

authRouter
  .post("/register", register)
  .post("/login", login)
  .get("/", getUsers)
  .get("/auth", auth)
  .get("/:id", getHistory)
  .put("/:id", addLinkToUser)
  .get("/tokenIsValid", tokenValidate)
  .get("/posts/:id", historyPagination)
module.exports = authRouter;
