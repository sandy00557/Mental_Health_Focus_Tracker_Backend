// import express from "express";
// import multer from "multer";
// import { detectEmotion } from "../controller/emotionController.js";

// const router = express.Router();
// const upload = multer({ storage: multer.memoryStorage() });

// router.post("/", upload.single("file"), detectEmotion);

// export default router;



import express from "express";
import multer from "multer";
import { detectEmotion } from "../controller/emotionController.js";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024, files: 1 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("audio/")) cb(null, true);
    else cb(new Error("Only audio files are allowed"), false);
  },
});

const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE")
      return res.status(400).json({ status: "error", error: "File too large." });
    if (err.code === "LIMIT_FILE_COUNT")
      return res
        .status(400)
        .json({ status: "error", error: "Only one file allowed." });
  }
  if (err.message === "Only audio files are allowed")
    return res
      .status(400)
      .json({ status: "error", error: "Invalid file type." });
  next(err);
};

router.post(["/", ""], upload.single("file"), handleMulterError, detectEmotion);

export default router;
