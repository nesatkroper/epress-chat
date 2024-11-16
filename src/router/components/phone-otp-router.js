const express = require("express");
const router = express.Router();

const { send, verify } = require("@/controllers/phone-otp-controller");
router.post("/phone-send", send);
router.post("/phone-verify", verify);

module.exports = router;
