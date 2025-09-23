import path from 'path'
import multer from "multer"

// ✅ Configure disk storage (stores files in /uploads)
const storage = multer.diskStorage({
  destination: "uploads/", // folder to save files
  filename: (_req, file, cb) => {
    // Use original filename (or you can generate custom names here)
    cb(null, file.originalname);
  },
});

const upload = multer({
  dist:'uploads/',
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB max
  filename: (_req, file, cb) => {
    let ext = path.extname(file.originalname).toLowerCase();

    if (
      ext !== ".jpg" &&
      ext !== ".jpeg" &&
      ext !== ".png" &&
      ext !== ".webp" &&
      ext !== ".mp4"
    ) {
       cb(new Error("Only images and mp4 files are allowed!"), false);
    }
    cb(null, true);
  },
});

export default upload;
