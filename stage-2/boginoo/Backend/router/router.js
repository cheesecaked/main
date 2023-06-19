const express = require("express");
const Router = express.Router();
const { getUser, deleteShort, createShort, historyPagination } = require("../controller/user.js");

Router.get("/", getUser);
Router.post("/", createShort);
Router.delete("/:id", deleteShort);

// Router.patch("/update", getUpdate);
// Router.delete("/delete", getDelete);

module.exports = Router;
