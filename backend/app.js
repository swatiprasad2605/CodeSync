require("dotenv").config();
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const repositoryRoutes = require("./routes/repositoryRoutes");
const fileRoutes = require("./routes/fileRoutes");
const versionRoutes = require("./routes/versionRoutes");
const commentRoutes = require("./routes/commentRoutes");
const searchRoutes = require("./routes/searchRoutes");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "CodeSync Backend is running!"
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/repositories", repositoryRoutes);
app.use("/api/files", fileRoutes);
app.use("/api/versions", versionRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/search", searchRoutes);
module.exports = app;