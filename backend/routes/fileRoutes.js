const express = require("express");

const {
  uploadFile,
  getFiles
} = require("../controllers/fileController");

const authMiddleware = require("../middleware/authMiddleware");
const uploadMiddleware = require("../middleware/uploadMiddleware");

const router = express.Router();

router.post(
  "/upload",
  authMiddleware,
  uploadMiddleware.single("file"),
  uploadFile
);

router.get(
  "/repository/:repositoryId",
  authMiddleware,
  getFiles
);

module.exports = router;