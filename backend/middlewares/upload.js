/**
 * Middleware for file uploads
 */
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Upload directory
const UPLOADS_DIR = path.join(__dirname, '../uploads');

// Create uploads directory if it doesn't exist
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR);

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  }
});

// Create the multer instance
const upload = multer({ storage });

module.exports = upload;
