const crypto = require("crypto");
const telegrambot = require("node-telegram-bot-api");

// ! OTP
const otps = {};

// ! Telegram Bot setup
const bot = new telegrambot(process.env.TELEGRAM_BOT_TOKEN, { polling: false });

// ! Generate and send OTP via Telegram
const send = async (req, res) => {
  const { chatId } = req.body;
  const otp = crypto.randomInt(100000, 999999);

  otps[chatId] = { otp, expiresAt: Date.now() + 300000 };

  const message = `Your OTP is: ${otp}. It is valid for 5 minutes.`;

  bot.on("message", (msg) => {
    console.log("Chat ID:", msg.chat.id);
  });

  try {
    await bot.sendMessage(chatId, message);
    res.status(200).send("OTP sent successfully via Telegram!");
  } catch (error) {
    console.error("Error sending OTP via Telegram:", error);
    res.status(500).send("Failed to send OTP.");
  }
};

// ! Endpoint to verify OTP
const verify = (req, res) => {
  const { chatId, otp } = req.body;

  if (!otps[chatId]) {
    return res.status(400).send("No OTP sent to this chat ID.");
  }

  const { otp: storedOtp, expiresAt } = otps[chatId];

  if (Date.now() > expiresAt) {
    delete otps[chatId];
    return res.status(400).send("OTP has expired.");
  }

  if (parseInt(otp) !== storedOtp) {
    return res.status(400).send("Invalid OTP.");
  }

  delete otps[chatId];
  res.status(200).send("OTP verified successfully!");
};

module.exports = { send, verify };
