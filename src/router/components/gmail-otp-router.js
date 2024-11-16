const express = require("express");
const router = express.Router();

const { send, verify } = require("@/controllers/gmail-otp-controller");

router.post("/gmail-send", send);
router.post("/gmail-verify", verify);

module.exports = router;
