const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const ARTISTS_FILE = path.join(__dirname, "../data/artists.json");
const UPLOADS_DIR = path.join(__dirname, "../uploads");

if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  }
});
const upload = multer({ storage });

router.get("/", (req, res) => {
  let artists = [];
  if (fs.existsSync(ARTISTS_FILE)) {
    artists = JSON.parse(fs.readFileSync(ARTISTS_FILE));
  }
  res.json(artists);
});

router.post("/", upload.single("image"), (req, res) => {
  const { name, bio, mixcloud, soundcloud, twitter, instagram, facebook, linkedin } = req.body;
  if (!name || !bio) {
    return res.status(400).json({ error: "Name and bio required" });
  }
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : "";
  let artists = [];
  if (fs.existsSync(ARTISTS_FILE)) {
    artists = JSON.parse(fs.readFileSync(ARTISTS_FILE));
  }
  const newArtist = {
    name,
    bio,
    image: imageUrl,
    mixcloud,
    soundcloud,
    twitter,
    instagram,
    facebook,
    linkedin
  };
  artists.push(newArtist);
  fs.writeFileSync(ARTISTS_FILE, JSON.stringify(artists, null, 2));
  res.json({ success: true, artist: newArtist });
});

module.exports = router;
