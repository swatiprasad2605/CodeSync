const express = require("express");

const {
  createVersion,
  getVersions
} = require("../controllers/versionController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createVersion);

router.get(
  "/repository/:repositoryId",
  authMiddleware,
  getVersions
);

module.exports = router;