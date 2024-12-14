const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comment");
const authJwt = require("../middlewares/authJWT");

router.get("/comment/:id", commentController.getComments);
router.put("/comment", [authJwt.verifyToken], commentController.createComment);

module.exports = router;
