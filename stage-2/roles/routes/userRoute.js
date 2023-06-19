const { Router } = require("express");
const { authMiddleware } = require("../stuff/middleware/authMiddle");
const { roleMiddleware } = require("../stuff/middleware/roleMiddle");
const { getUsers, createUser, getUser } = require("../controllers/userControl");

exports.userRouter = Router().all("/users", authMiddleware ).get("/users", roleMiddleware(401) , getUsers).get("/user/:id", getUser).post("/users", createUser);
