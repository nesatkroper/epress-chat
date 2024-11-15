const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

//
require("dotenv").config();
require("module-alias/register");

// ! import router
const authRouter = require("@/routes/auth.router");
const userRouter = require("@/routes/user.router");

const app = express();
app.use(cors());
app.use(bodyParser.json());

//  ! router
app.use("/api", authRouter);
app.use("/api/user", userRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}/api`);
});
