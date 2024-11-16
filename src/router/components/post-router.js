const express = require("express");
const multer = require("multer");

// ! Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
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

router.get("/", select);
router.post("/", upload.single("image"), create);
router.put("/:id", upload.single("image"), update);
router.delete("/:id", destroy);

module.exports = router;
