import express from "express";

const authController = require("../controllers/auth");

const router = express.Router();
import verifySignUp from "../middlewares/verifySignUp";
//const multer = require("multer");
//const upload = multer();

router.post("/login", authController.login);
router.post(
  "/signup",
  //upload.none(),
  [verifySignUp.checkDuplicateUsernameOrEmail],
  authController.signUp
);

export default router;
