const express = require("express");
const router = express.Router();

const { send, verify } = require("@/controllers/telegram-otp-controller");
router.post("/telegram-send", send);
router.post("/telegram-verify", verify);

module.exports = router;
