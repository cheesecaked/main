const { Router } = require("express");
const { authMiddleware } = require("../stuff/middleware/authMiddle");
const {roleMiddleware} = require("../stuff/middleware/roleMiddle");

const {
  getCategories,
  createCategory,
} = require("../controllers/categoryControl");

exports.categoryRouter = Router()
  .all("/categories", authMiddleware)
  .get("/categories", getCategories)
  .post("/categories", roleMiddleware, createCategory);