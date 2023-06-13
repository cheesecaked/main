const { Router } = require("express");
const { signup, login } = require("../controllers/authControl");

exports.authRouter = Router().post("/signup", signup).post("/login", login);