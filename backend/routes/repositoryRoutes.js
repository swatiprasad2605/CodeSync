const express = require("express");

const {
  createRepository,
  getRepositories
} = require("../controllers/repositoryController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createRepository);
router.get("/", authMiddleware, getRepositories);

module.exports = router;