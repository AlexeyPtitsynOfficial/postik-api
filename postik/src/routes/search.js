const express = require("express");
const router = express.Router();
const searchController = require("../controllers/search");

router.get("/:SearchText/:TabIndex", searchController.search);

module.exports = router;
