const express = require("express");
const router = express.Router();

const { send, verify } = require("@/services/gmail-otp-service");

router.post("/send", send);
router.post("/verify", verify);

module.exports = router;
