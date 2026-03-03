const express = require("express");
const router = express.Router();

const { activateAccount, login, verifyOtp } = require("../controllers/auth.controller");

router.post("/activate", activateAccount);
router.post("/login", login);
router.post("/verify-otp", verifyOtp);

module.exports = router;