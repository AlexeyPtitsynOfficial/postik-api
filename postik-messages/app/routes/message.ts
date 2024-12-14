import express from "express";

const messageController = require('../controllers/message');

const router = express.Router();

router.post("/send", messageController.send);
router.get(
  "/get/:receiverId",
  // @ts-ignore
  messageController.getConversation
);

export default router;
