const express = require("express");
const router = express.Router();
const postikController = require("../controllers/postik");
const uploadMiddleware = require("../middlewares/uploadFile");

router.get("/", postikController.getAllPostiks);
router.post("/", postikController.createPostik);
router.post(
  "/uploadimages",
  uploadMiddleware,
  postikController.uploadPostikImages
);
router.get("/:id", postikController.getPostikById);
router.put("/:id", postikController.updatePostik);
router.delete("/:id", postikController.deletePostik);

module.exports = router;
