const express = require("express");

const {
  searchRepositories
} = require("../controllers/searchController");

const router = express.Router();

router.get("/", searchRepositories);

module.exports = router;