const express = require("express");
const router = express.Router();
const subscriptionController = require("../controllers/subscription");

router.get("/subscriptions/:id", subscriptionController.getUserSubscriptions);
router.get("/subscribers/:id", subscriptionController.getUserSubscribers);

module.exports = router;
