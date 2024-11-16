const express = require("express");

// ! import router
const gmailOtpRouter = require("@/router/components/gmail-otp-router");
const telegramOtpRouter = require("@/router/components/telegram-otp-router");
const phoneOtpRouter = require("@/router/components/phone-otp-router");
const authRouter = require("@/router/components/auth-router");
const userRouter = require("@/router/components/user-router");

const router = express.Router();

//  ! router
router.use("/", gmailOtpRouter);
router.use("/", telegramOtpRouter);
router.use("/", phoneOtpRouter);
router.use("/", authRouter);
router.use("/user", userRouter);

module.exports = router;
