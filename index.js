require("dotenv").config();
require("module-alias/register");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const router = require("@/router/index");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use("/api", router);

const PORT = process.env.PORT || 5555;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}/api`);
});
