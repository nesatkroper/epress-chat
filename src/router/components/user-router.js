const express = require("express");
const router = express.Router();
const authenticateJWT = require("@/middleware/auth-middleware");

const {
  select,
  selectById,
  create,
  update,
  destroy,
} = require("@/controllers/users-controller");

router.get("/", authenticateJWT, select);
router.get("/:id", authenticateJWT, selectById);
router.post("/", authenticateJWT, create);
router.put("/:id", authenticateJWT, update);
router.delete("/:id", authenticateJWT, destroy);

module.exports = router;
