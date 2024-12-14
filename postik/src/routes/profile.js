const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profile");
const uploadMiddleware = require("../middlewares/uploadFile");

router.get("/:id", profileController.getProfileById);
router.get("/postiks/:id", profileController.getPostiks);
router.post("/check_subscription/", profileController.checkSubscription);
router.post("/subscribe", profileController.subscribe);
router.delete("/unsubscribe", profileController.unsubscribe);
router.post("/upload_avatar", uploadMiddleware, profileController.uploadAvatar);

module.exports = router;
