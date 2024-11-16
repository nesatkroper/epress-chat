const express = require("express");
const router = express.Router();

const { send, verify } = require("@/services/telegram-otp-service");
router.post("/send", send);
router.post("/verify", verify);

module.exports = router;
