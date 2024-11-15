const express = require("express");
const router = express.Router();
const authenticateJWT = require("@/middleware/auth.middleware");
const authorizeRoles = require("@/middleware/role.middleware");

const {
  register,
  login,
  getAllAuth,
  getAuth,
} = require("@/controllers/auth.controller");

router.post("/register", register);
router.post("/login", login);
router.get("/getuser", authenticateJWT, authorizeRoles(["Admin"]), getAllAuth);
router.get("/me", authenticateJWT, getAuth);

module.exports = router;
