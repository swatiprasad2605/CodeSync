const express = require("express");

const {
  addComment,
  getComments
} = require("../controllers/commentController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, addComment);

router.get(
  "/repository/:repositoryId",
  authMiddleware,
  getComments
);

module.exports = router;