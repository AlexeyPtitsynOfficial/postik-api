var express = require("express");
var router = express.Router();
const userController = require("../controllers/user");

/* GET users listing. */
router.get("/", userController.getAllUsers);
router.post("/", userController.createUser);
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

export default router;
