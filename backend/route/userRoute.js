const express = require("express");
const userControl = require("../controller/userControl");

const router = express.Router();

router.post("/register", userControl.register);
router.get("/verify/:token", userControl.verifyEmail);
router.post("/login", userControl.Login);
router.post("/forget-password", userControl.forgetPassword);
router.post("/reset-password/:token", userControl.resetPassword);

module.exports = router;
