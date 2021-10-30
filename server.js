// dotenv for DB details
require('dotenv').config();

//  express and mongoose
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

// app
const PORT = process.env.PORT || 3000
const app = express();

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// db connect
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// api routes
app.use(require("./routes/api.js"));

// public routes
app.get("/stats", function(req, res) {
  res.sendFile(path.join(__dirname, '/public/stats.html'));
});

app.get("/exercise", function(req, res) {
  res.sendFile(path.join(__dirname, '/public/exercise.html'));
});

// start server
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});