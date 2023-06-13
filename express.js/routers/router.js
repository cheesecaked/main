const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUsersById,
  createUser,
  updateUser,
  deleteUser,
} = require("../comp/controller.js");

router
  .get("/", getUsers)
  .get("/:id", getUsersById)
  .post("/create", createUser)
  .put("/:id", updateUser)
  .delete("/:id", deleteUser);

module.exports = router;
