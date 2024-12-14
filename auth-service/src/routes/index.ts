const express = require("express");
const router = express.Router();
import { Request, Response } from "express";

/* GET home page. */
router.get("/", function (req: Request, res: Response, next: Response) {
  res.render("index", { title: "Express" });
});

export default router;
