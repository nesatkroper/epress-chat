const nodemailer = require("nodemailer");
const crypto = require("crypto");

// ! OTP
const otps = {};

// ! nodemailer configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

// ! Generate and Send OTP
const send = async (req, res) => {
  const { email } = req.body;
  const otp = crypto.randomInt(100000, 999999);

  otps[email] = { otp, expiresAt: Date.now() + 300000 };

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP is: ${otp}. It is valid for 5 minutes.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send("OTP sent successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to send OTP.");
  }
};

// ! Verify OTP
const verify = (req, res) => {
  try {
    const { email, otp } = req.body;
    const record = otps[email];

    if (!record) {
      return res.status(400).send("Invalid or expired OTP.");
    }

    if (record.otp === parseInt(otp) && record.expiresAt > Date.now()) {
      delete otps[email];
      return res.status(200).send("OTP verified!");
    }

    res.status(400).send("Invalid or expired OTP.");
  } catch (error) {
    console.error(error);
  }
};

module.exports = { send, verify };
