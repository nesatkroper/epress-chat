const express = require("express");
const expressListEndpoints = require("express-list-endpoints");

// ! import router
const gmailOtpRouter = require("@/router/components/gmail-otp-router");
const telegramOtpRouter = require("@/router/components/telegram-otp-router");
const phoneOtpRouter = require("@/router/components/phone-otp-router");
const authRouter = require("@/router/components/auth-router");
const userRouter = require("@/router/components/user-router");
const postRouter = require("@/router/components/post-router");

const router = express.Router();

//  ! router
router.use("/uploads", express.static("uploads"));
router.use("/gmail", gmailOtpRouter);
router.use("/telegram", telegramOtpRouter);
router.use("/phone", phoneOtpRouter);
router.use("/", authRouter);
router.use("/user", userRouter);
router.use("/post", postRouter);
router.get("/rl", (req, res) => {
  res.json(expressListEndpoints(router));
});

module.exports = router;
