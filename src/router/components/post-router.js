const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const authenticateJWT = require("@/middleware/auth-middleware");

// ! Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // ! Ensure the uploads directory exists
    const uploadDir = path.join(__dirname, "../../../public/uploads/test");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, "./public/uploads/test");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });
const router = express.Router();

const {
  select,
  create,
  update,
  destroy,
} = require("@/controllers/post-controller");

router.get("/", authenticateJWT, select);
router.post("/", authenticateJWT, upload.single("image"), create);
router.put("/:id", authenticateJWT, upload.single("image"), update);
router.delete("/:id", authenticateJWT, destroy);

module.exports = router;
