const express = require("express");
const userControl = require("../controller/userControl");
const authMiddleware = require("../middleware");

const router = express.Router();

router.post("/register", userControl.register);
router.get("/verify/:token", userControl.verifyEmail);
router.post("/login", userControl.Login);
router.post("/forget-password", userControl.forgetPassword);
router.post("/reset-password/:token", userControl.resetPassword);
router.get("/get-user", authMiddleware, userControl.getUser);
router.put("/update-user", authMiddleware, userControl.updateUser);
router.delete("/delete-user", authMiddleware, userControl.deleteUser);

module.exports = router;
