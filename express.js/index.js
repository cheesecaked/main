const express = require("express");
const mongoose = require("mongoose");
const router = require("./routers/router.js");
const postRouter = require("./routers/postRouter");
const commentRouter = require("./routers/commentRouter");
const cors = require("cors")
const port = 8000;
const app = express();
const connection = mongoose.connection;

mongoose.connect(
  "mongodb+srv://sanchirbilegt:bruhmoment1@cluster0.gqofwcd.mongodb.net/Blog"
);
connection.once("once", () => {
  console.log("mongoDB is success");
}); 
app.use(cors())
app.use(express.json());
app.use("/users", router);
app.use("/post", postRouter);
app.use("/comment", commentRouter);
app.listen(port, () => {
  console.log(`server http://localhost:${port}`);
});
