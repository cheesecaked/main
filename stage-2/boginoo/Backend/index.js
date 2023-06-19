const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// set up express

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
app.use("/users", require("./router/auth"));
app.use("/links", require("./router/router"));

app.listen(PORT, () => console.log(`The server has started on port: ${PORT}`));

// set up mongoose

mongoose.connect(
  process.env.URI,
  (err) => {
    if (err) throw err;
    console.log("MongoDB connection established");
  }
);

// set up routes
