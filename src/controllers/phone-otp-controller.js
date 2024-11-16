const crypto = require("crypto");
const twilio = require("twilio");

//! Twilio credentials (Replace with your credentials)
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);
const otps = {};

// ! Endpoint to send OTP
const send = async (req, res) => {
  const { phone } = req.body;

  if (!phone) {
    return res.status(400).send("Phone number is required.");
  }

  // ! Generate OTP and expiry time
  const otp = crypto.randomInt(100000, 999999);
  const expiresAt = Date.now() + 5 * 60 * 1000;

  // ! Save OTP in memory (replace with DB logic in production)
  otps[phone] = { otp, expiresAt };

  // ! Send OTP via Twilio
  const message = `Your OTP is: ${otp}. It is valid for 5 minutes.`;

  try {
    await client.messages.create({
      body: message,
      from: twilioPhoneNumber,
      to: phone,
    });
    res.status(200).send("OTP sent successfully!");
  } catch (error) {
    console.error("Error sending OTP:", error.message);
    res.status(500).send("Failed to send OTP.");
  }
};

// ! Endpoint to verify OTP
const verify = (req, res) => {
  const { phone, otp } = req.body;

  if (!phone || !otp) {
    return res.status(400).send("Phone and OTP are required.");
  }

  const data = otps[phone];
  if (!data) {
    return res.status(400).send("OTP not found or expired.");
  }

  if (data.expiresAt < Date.now()) {
    delete otps[phone];
    return res.status(400).send("OTP has expired.");
  }

  if (data.otp.toString() !== otp) {
    return res.status(400).send("Invalid OTP.");
  }

  // ! OTP verified successfully
  delete otps[phone];
  res.status(200).send("OTP verified successfully!");
};

module.exports = { send, verify };
